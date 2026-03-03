import Redis from 'ioredis';
import { SOCIAL_CONTENT, type SocialContent } from './instagram-content';
import { getHashtags } from './instagram-captions';
import { schedulePost } from './instagram-schedule';
import { SKILL_COLORS } from './courses';

const AUTO_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
const MAX_POSTED_IDS = 100; // Track last 100 to avoid repeats

let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
  return redis;
}

export async function isAutoPublishEnabled(): Promise<boolean> {
  const r = getRedis();
  if (!r) return false;
  const val = await r.get('ig:auto-enabled');
  return val !== 'false'; // default: enabled
}

export async function setAutoPublishEnabled(enabled: boolean): Promise<void> {
  const r = getRedis();
  if (!r) return;
  await r.set('ig:auto-enabled', enabled ? 'true' : 'false');
}

export async function getAutoPublishStatus(): Promise<{
  enabled: boolean;
  lastPostAt: string | null;
  nextPostAt: string | null;
  postedCount: number;
}> {
  const r = getRedis();
  if (!r) return { enabled: false, lastPostAt: null, nextPostAt: null, postedCount: 0 };

  const [enabled, lastPostAt, postedCount] = await Promise.all([
    isAutoPublishEnabled(),
    r.get('ig:last-auto-post'),
    r.scard('ig:posted-ids'),
  ]);

  let nextPostAt: string | null = null;
  if (enabled && lastPostAt) {
    const next = new Date(Number(lastPostAt) + AUTO_INTERVAL_MS);
    nextPostAt = next.toISOString();
  } else if (enabled && !lastPostAt) {
    nextPostAt = new Date().toISOString(); // Will post on next cron run
  }

  return { enabled, lastPostAt: lastPostAt ? new Date(Number(lastPostAt)).toISOString() : null, nextPostAt, postedCount };
}

async function shouldAutoPublish(): Promise<boolean> {
  const r = getRedis();
  if (!r) return false;

  if (!(await isAutoPublishEnabled())) return false;

  const lastPost = await r.get('ig:last-auto-post');
  if (!lastPost) return true; // Never posted before

  const elapsed = Date.now() - Number(lastPost);
  return elapsed >= AUTO_INTERVAL_MS;
}

async function selectNextContent(): Promise<SocialContent | null> {
  const r = getRedis();
  if (!r) return null;

  // Get recently posted IDs
  const postedIds = await r.smembers('ig:posted-ids');
  const postedSet = new Set(postedIds);

  // Get last posted type to vary content
  const lastType = await r.get('ig:last-auto-type');

  // Filter out recently posted items
  let available = SOCIAL_CONTENT.filter((item) => !postedSet.has(item.id));

  // If all items have been posted, reset tracking
  if (available.length === 0) {
    await r.del('ig:posted-ids');
    available = SOCIAL_CONTENT;
  }

  // Prefer different type than last post
  if (lastType) {
    const differentType = available.filter((item) => item.type !== lastType);
    if (differentType.length > 0) {
      available = differentType;
    }
  }

  // Pick random item
  return available[Math.floor(Math.random() * available.length)] ?? null;
}

function generateAutoCaption(item: SocialContent): string {
  const lines: string[] = [];

  switch (item.type) {
    case 'tip':
      lines.push(`Vadertip: ${item.text}`);
      break;
    case 'stat':
      lines.push(item.text);
      if (item.subtitle) lines.push('', item.subtitle);
      break;
    case 'quote':
      lines.push(`"${item.text}"`);
      break;
    case 'didyouknow':
      lines.push(`Wist je dat? ${item.text}`);
      break;
    case 'challenge':
      lines.push(`Weekchallenge: ${item.text}`);
      if (item.subtitle) lines.push('', item.subtitle);
      break;
    case 'comparison':
      lines.push(item.text);
      break;
    default:
      lines.push(item.text);
  }

  lines.push('', getHashtags(item.skill));

  return lines.join('\n');
}

function buildImageUrl(item: SocialContent): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devadercoach.nl';
  const color = SKILL_COLORS[item.skill] ?? '#F59E0B';

  const params = new URLSearchParams({
    template: item.template,
    text: item.text,
    skill: item.skill,
    color,
  });

  if (item.subtitle) params.set('subtitle', item.subtitle);

  return `${baseUrl}/api/instagram/image?${params.toString()}`;
}

export async function executeAutoPublish(): Promise<{
  published: boolean;
  reason?: string;
  contentId?: string;
  contentType?: string;
  title?: string;
}> {
  if (!(await shouldAutoPublish())) {
    return { published: false, reason: 'Nog geen 3 dagen sinds laatste post' };
  }

  const item = await selectNextContent();
  if (!item) {
    return { published: false, reason: 'Geen content beschikbaar' };
  }

  const caption = generateAutoCaption(item);
  const imageUrl = buildImageUrl(item);
  const title = `Auto: ${item.type} - ${item.skill}`;

  // Schedule for immediate publishing (cron will pick it up)
  const post = await schedulePost({
    type: 'single',
    title,
    caption,
    imageUrls: [imageUrl],
    scheduledAt: new Date().toISOString(),
    postToFacebook: true,
    postAsStory: true,
  });

  if (!post) {
    return { published: false, reason: 'Kon post niet inplannen (Redis niet beschikbaar)' };
  }

  // Track posted content
  const r = getRedis();
  if (r) {
    const pipeline = r.pipeline();
    pipeline.sadd('ig:posted-ids', item.id);
    pipeline.set('ig:last-auto-post', String(Date.now()));
    pipeline.set('ig:last-auto-type', item.type);
    // Keep posted-ids set manageable
    const count = await r.scard('ig:posted-ids');
    if (count > MAX_POSTED_IDS) {
      // Remove random old entries to keep set at MAX_POSTED_IDS
      const all = await r.smembers('ig:posted-ids');
      const toRemove = all.slice(0, all.length - MAX_POSTED_IDS);
      if (toRemove.length > 0) {
        pipeline.srem('ig:posted-ids', ...toRemove);
      }
    }
    await pipeline.exec();
  }

  return {
    published: true,
    contentId: item.id,
    contentType: item.type,
    title,
  };
}
