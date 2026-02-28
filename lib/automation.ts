import { getRedis, getSubscriber, sendEmail, wrapInEmailTemplate, getUnsubscribeUrl, logAutomation } from './newsletter';
import { DRIP_SEQUENCE } from './drip-emails';

export interface DripStatus {
  email: string;
  step: number;
  startedAt: string;
  lastSentAt: string;
  status: 'active' | 'completed' | 'paused';
}

const DRIP_DELAYS_MS = [
  3 * 24 * 60 * 60 * 1000,   // Step 1: day 3
  7 * 24 * 60 * 60 * 1000,   // Step 2: day 7
  14 * 24 * 60 * 60 * 1000,  // Step 3: day 14
  21 * 24 * 60 * 60 * 1000,  // Step 4: day 21
];

export async function scheduleDrip(email: string): Promise<void> {
  const r = getRedis();
  if (!r) return;

  const normalized = email.toLowerCase().trim();
  const now = Date.now();

  const pipeline = r.pipeline();
  pipeline.hset(`nl:drip:${normalized}`, {
    step: '0',
    startedAt: new Date().toISOString(),
    lastSentAt: new Date().toISOString(),
    status: 'active',
  });
  // Schedule step 1 for day 3
  pipeline.zadd('nl:drip:queue', now + DRIP_DELAYS_MS[0], normalized);
  await pipeline.exec();
}

export async function getDripStatus(email: string): Promise<DripStatus | null> {
  const r = getRedis();
  if (!r) return null;

  const data = await r.hgetall(`nl:drip:${email.toLowerCase().trim()}`);
  if (!data || !data.step) return null;

  return {
    email: email.toLowerCase().trim(),
    step: Number(data.step),
    startedAt: data.startedAt || '',
    lastSentAt: data.lastSentAt || '',
    status: (data.status as DripStatus['status']) || 'active',
  };
}

export async function getAllDripStatuses(): Promise<DripStatus[]> {
  const r = getRedis();
  if (!r) return [];

  // Get all emails in the drip queue + completed ones
  const queueEmails = await r.zrange('nl:drip:queue', 0, -1);

  // Also scan for nl:drip:* keys for completed drips
  const allKeys: string[] = [];
  let cursor = '0';
  do {
    const [nextCursor, keys] = await r.scan(cursor, 'MATCH', 'nl:drip:*', 'COUNT', 100);
    cursor = nextCursor;
    allKeys.push(...keys.filter((k) => k !== 'nl:drip:queue'));
  } while (cursor !== '0');

  const emails = [...new Set([
    ...queueEmails,
    ...allKeys.map((k) => k.replace('nl:drip:', '')),
  ])];

  const statuses: DripStatus[] = [];
  for (const email of emails) {
    const status = await getDripStatus(email);
    if (status) statuses.push(status);
  }

  return statuses.sort((a, b) => b.startedAt.localeCompare(a.startedAt));
}

export async function processDripQueue(): Promise<{ sent: number; failed: number }> {
  const r = getRedis();
  if (!r) return { sent: 0, failed: 0 };

  const now = Date.now();
  const dueEmails = await r.zrangebyscore('nl:drip:queue', 0, now);

  let sent = 0;
  let failed = 0;

  for (const email of dueEmails) {
    try {
      // Get drip state
      const dripData = await r.hgetall(`nl:drip:${email}`);
      if (!dripData || dripData.status !== 'active') {
        await r.zrem('nl:drip:queue', email);
        continue;
      }

      // Check subscriber still exists
      const sub = await getSubscriber(email);
      if (!sub) {
        await r.zrem('nl:drip:queue', email);
        await r.del(`nl:drip:${email}`);
        continue;
      }

      const currentStep = Number(dripData.step);
      const nextStep = currentStep + 1;

      if (nextStep > DRIP_SEQUENCE.length) {
        // All steps completed
        await r.zrem('nl:drip:queue', email);
        await r.hset(`nl:drip:${email}`, 'status', 'completed');
        continue;
      }

      const dripEmail = DRIP_SEQUENCE[nextStep - 1];
      const unsubUrl = sub.unsubToken ? getUnsubscribeUrl(sub.unsubToken) : '';

      const bodyHtml = dripEmail.generateHtml({
        discountCode: sub.discountCode || '',
        expiresAt: '', // Will be filled from discount data
        unsubscribeUrl: unsubUrl,
      });

      const fullHtml = wrapInEmailTemplate(bodyHtml, undefined, unsubUrl);
      await sendEmail(email, dripEmail.subject, fullHtml, unsubUrl);

      // Update state
      const pipeline = r.pipeline();
      pipeline.hset(`nl:drip:${email}`, {
        step: String(nextStep),
        lastSentAt: new Date().toISOString(),
      });

      if (nextStep < DRIP_SEQUENCE.length) {
        // Schedule next step
        const startedAt = new Date(dripData.startedAt).getTime();
        const nextDue = startedAt + DRIP_DELAYS_MS[nextStep];
        pipeline.zadd('nl:drip:queue', nextDue, email);
      } else {
        // All done
        pipeline.zrem('nl:drip:queue', email);
        pipeline.hset(`nl:drip:${email}`, 'status', 'completed');
      }

      // Remove current due entry
      pipeline.zrem('nl:drip:queue', email);
      if (nextStep < DRIP_SEQUENCE.length) {
        const startedAt = new Date(dripData.startedAt).getTime();
        const nextDue = startedAt + DRIP_DELAYS_MS[nextStep];
        pipeline.zadd('nl:drip:queue', nextDue, email);
      }

      await pipeline.exec();

      await logAutomation({
        type: 'drip',
        email,
        step: nextStep,
        subject: dripEmail.subject,
        sentAt: new Date().toISOString(),
        success: true,
      });

      sent++;
    } catch (e) {
      failed++;
      await logAutomation({
        type: 'drip',
        email,
        subject: `Drip stap mislukt`,
        sentAt: new Date().toISOString(),
        success: false,
        error: e instanceof Error ? e.message : String(e),
      });
      // Remove from queue to prevent infinite retries, re-add with 1 hour delay
      await r.zrem('nl:drip:queue', email);
      await r.zadd('nl:drip:queue', now + 60 * 60 * 1000, email);
    }
  }

  return { sent, failed };
}
