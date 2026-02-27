import Redis from 'ioredis';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
  return redis;
}

export interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

export interface SentNewsletter {
  id: string;
  subject: string;
  content: string;
  sentAt: string;
  recipientCount: number;
}

export async function addSubscriber(email: string, source: string = 'snelgids'): Promise<void> {
  const r = getRedis();
  if (!r) return;

  const normalized = email.toLowerCase().trim();
  const pipeline = r.pipeline();
  pipeline.sadd('nl:emails', normalized);
  pipeline.hset(`nl:sub:${normalized}`, {
    email: normalized,
    subscribedAt: new Date().toISOString(),
    source,
  });
  await pipeline.exec();
}

export async function removeSubscriber(email: string): Promise<void> {
  const r = getRedis();
  if (!r) return;

  const normalized = email.toLowerCase().trim();
  const pipeline = r.pipeline();
  pipeline.srem('nl:emails', normalized);
  pipeline.del(`nl:sub:${normalized}`);
  await pipeline.exec();
}

export async function getSubscribers(): Promise<Subscriber[]> {
  const r = getRedis();
  if (!r) return [];

  const emails = await r.smembers('nl:emails');
  if (emails.length === 0) return [];

  const pipeline = r.pipeline();
  for (const email of emails) {
    pipeline.hgetall(`nl:sub:${email}`);
  }
  const results = await pipeline.exec();
  if (!results) return [];

  return results
    .map(([err, data]) => {
      if (err || !data) return null;
      const d = data as Record<string, string>;
      return {
        email: d.email || '',
        subscribedAt: d.subscribedAt || '',
        source: d.source || 'onbekend',
      };
    })
    .filter((s): s is Subscriber => !!s && !!s.email)
    .sort((a, b) => b.subscribedAt.localeCompare(a.subscribedAt));
}

export async function getSubscriberCount(): Promise<number> {
  const r = getRedis();
  if (!r) return 0;
  return r.scard('nl:emails');
}

export async function sendNewsletter(
  subject: string,
  htmlContent: string,
): Promise<{ success: boolean; count: number; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { success: false, count: 0, error: 'RESEND_API_KEY niet geconfigureerd' };

  const subscribers = await getSubscribers();
  if (subscribers.length === 0) return { success: false, count: 0, error: 'Geen abonnees' };

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  let sent = 0;
  const errors: string[] = [];

  for (let i = 0; i < subscribers.length; i += 10) {
    const batch = subscribers.slice(i, i + 10);
    const promises = batch.map(async (sub) => {
      try {
        await resend.emails.send({
          from: 'De Vadercoach <noreply@devadercoach.nl>',
          to: sub.email,
          subject,
          html: htmlContent,
        });
        sent++;
      } catch (e) {
        errors.push(`${sub.email}: ${e instanceof Error ? e.message : String(e)}`);
      }
    });
    await Promise.all(promises);
  }

  const r = getRedis();
  if (r) {
    const id = Date.now().toString(36);
    const newsletter: SentNewsletter = {
      id,
      subject,
      content: htmlContent,
      sentAt: new Date().toISOString(),
      recipientCount: sent,
    };
    await r.lpush('nl:sent', JSON.stringify(newsletter));
    await r.ltrim('nl:sent', 0, 49);
  }

  return {
    success: errors.length === 0,
    count: sent,
    error: errors.length > 0 ? `${errors.length} fouten: ${errors.slice(0, 3).join(', ')}` : undefined,
  };
}

export async function getSentNewsletters(): Promise<SentNewsletter[]> {
  const r = getRedis();
  if (!r) return [];

  const raw = await r.lrange('nl:sent', 0, 49);
  return raw
    .map((item) => {
      try {
        return JSON.parse(item) as SentNewsletter;
      } catch {
        return null;
      }
    })
    .filter((n): n is SentNewsletter => !!n);
}

export function wrapInEmailTemplate(bodyHtml: string, preheader?: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0F0F0F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>` : ''}
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F0F0F;">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr><td style="padding-bottom:32px;text-align:center;">
          <span style="font-size:18px;font-weight:800;color:#F59E0B;">De Vadercoach</span>
        </td></tr>
        <tr><td style="background-color:#1A1A1A;border-radius:16px;padding:32px 24px;border:1px solid #2A2A2A;">
          ${bodyHtml}
        </td></tr>
        <tr><td style="padding-top:24px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#666;">
            Je ontvangt deze e-mail omdat je je hebt aangemeld bij De Vadercoach.<br>
            <a href="https://devadercoach.nl" style="color:#F59E0B;">devadercoach.nl</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
