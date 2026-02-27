import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;

  // Try direct REST API vars first
  let url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? process.env.STORAGE_URL;
  let token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.STORAGE_TOKEN;

  // Fallback: derive REST credentials from REDIS_URL (rediss://default:TOKEN@HOST:PORT)
  if (!url || !token) {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      try {
        const parsed = new URL(redisUrl);
        url = `https://${parsed.hostname}`;
        token = parsed.password;
      } catch { /* ignore parse errors */ }
    }
  }

  if (!url || !token) return null;
  redis = new Redis({ url, token });
  return redis;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface PageviewEvent {
  path: string;
  ip: string;
  referrer: string;
  userAgent: string;
  country: string;
  timestamp: string;
}

export async function trackPageview(event: PageviewEvent): Promise<void> {
  const r = getRedis();
  if (!r) return;

  const date = today();
  const pipeline = r.pipeline();

  // Daily pageview count
  pipeline.incr(`pv:${date}`);

  // Per-page counts
  pipeline.hincrby(`pv:pages:${date}`, event.path, 1);

  // Unique visitors (IPs)
  pipeline.sadd(`pv:ips:${date}`, event.ip);

  // Referrer counts
  if (event.referrer) {
    pipeline.hincrby(`pv:refs:${date}`, event.referrer, 1);
  }

  // Country counts
  if (event.country) {
    pipeline.hincrby(`pv:countries:${date}`, event.country, 1);
  }

  // Recent pageviews (keep last 200)
  pipeline.lpush('pv:recent', JSON.stringify(event));
  pipeline.ltrim('pv:recent', 0, 199);

  // Set TTL of 90 days on daily keys
  const ttl = 90 * 24 * 60 * 60;
  pipeline.expire(`pv:${date}`, ttl);
  pipeline.expire(`pv:pages:${date}`, ttl);
  pipeline.expire(`pv:ips:${date}`, ttl);
  pipeline.expire(`pv:refs:${date}`, ttl);
  pipeline.expire(`pv:countries:${date}`, ttl);

  await pipeline.exec();
}

export interface AnalyticsData {
  today: {
    pageviews: number;
    visitors: number;
  };
  days: Array<{
    date: string;
    pageviews: number;
    visitors: number;
  }>;
  topPages: Array<{ path: string; count: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  countries: Array<{ country: string; count: number }>;
  recent: PageviewEvent[];
}

export async function getAnalytics(daysBack: number = 30): Promise<AnalyticsData | null> {
  const r = getRedis();
  if (!r) return null;

  const dates: string[] = [];
  for (let i = 0; i < daysBack; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }

  const todayStr = dates[0];

  // Fetch daily counts + visitor counts
  const pipeline = r.pipeline();
  for (const date of dates) {
    pipeline.get(`pv:${date}`);
    pipeline.scard(`pv:ips:${date}`);
  }
  // Top pages today
  pipeline.hgetall(`pv:pages:${todayStr}`);
  // Top referrers today
  pipeline.hgetall(`pv:refs:${todayStr}`);
  // Countries today
  pipeline.hgetall(`pv:countries:${todayStr}`);
  // Recent pageviews
  pipeline.lrange('pv:recent', 0, 49);
  // Today's IPs
  pipeline.smembers(`pv:ips:${todayStr}`);

  const results = await pipeline.exec();

  // Parse daily data
  const days: AnalyticsData['days'] = [];
  for (let i = 0; i < dates.length; i++) {
    const pageviews = (results[i * 2] as number) ?? 0;
    const visitors = (results[i * 2 + 1] as number) ?? 0;
    days.push({ date: dates[i], pageviews, visitors });
  }

  const offset = dates.length * 2;
  const pagesHash = (results[offset] as Record<string, number>) ?? {};
  const refsHash = (results[offset + 1] as Record<string, number>) ?? {};
  const countriesHash = (results[offset + 2] as Record<string, number>) ?? {};
  const recentRaw = (results[offset + 3] as string[]) ?? [];
  const todayIps = (results[offset + 4] as string[]) ?? [];

  // Sort pages by count
  const topPages = Object.entries(pagesHash)
    .map(([path, count]) => ({ path, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20);

  const topReferrers = Object.entries(refsHash)
    .map(([referrer, count]) => ({ referrer, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const countries = Object.entries(countriesHash)
    .map(([country, count]) => ({ country, count: Number(count) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 15);

  // Parse recent events and add IPs
  const recent: PageviewEvent[] = recentRaw.map((raw) => {
    try {
      return typeof raw === 'string' ? JSON.parse(raw) : raw;
    } catch {
      return null;
    }
  }).filter(Boolean) as PageviewEvent[];

  return {
    today: {
      pageviews: days[0]?.pageviews ?? 0,
      visitors: todayIps.length,
    },
    days,
    topPages,
    topReferrers,
    countries,
    recent,
  };
}
