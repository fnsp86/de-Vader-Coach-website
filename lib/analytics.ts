import Redis from 'ioredis';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
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

  // Skip bots
  const ua = (event.userAgent ?? '').toLowerCase();
  if (ua.includes('bot') || ua.includes('crawler') || ua.includes('spider') || ua.includes('vercel-screenshot')) {
    return;
  }

  const date = today();
  const pipeline = r.pipeline();

  pipeline.incr(`pv:${date}`);
  pipeline.hincrby(`pv:pages:${date}`, event.path, 1);
  pipeline.sadd(`pv:ips:${date}`, event.ip);

  if (event.referrer) {
    pipeline.hincrby(`pv:refs:${date}`, event.referrer, 1);
  }
  if (event.country) {
    pipeline.hincrby(`pv:countries:${date}`, event.country, 1);
  }

  pipeline.lpush('pv:recent', JSON.stringify(event));
  pipeline.ltrim('pv:recent', 0, 199);

  const ttl = 90 * 24 * 60 * 60;
  pipeline.expire(`pv:${date}`, ttl);
  pipeline.expire(`pv:pages:${date}`, ttl);
  pipeline.expire(`pv:ips:${date}`, ttl);
  pipeline.expire(`pv:refs:${date}`, ttl);
  pipeline.expire(`pv:countries:${date}`, ttl);

  await pipeline.exec();
}

export interface AnalyticsData {
  today: { pageviews: number; visitors: number };
  days: Array<{ date: string; pageviews: number; visitors: number }>;
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

  // ioredis pipeline results are [error, value] tuples
  const pipeline = r.pipeline();
  for (const date of dates) {
    pipeline.get(`pv:${date}`);
    pipeline.scard(`pv:ips:${date}`);
  }
  pipeline.hgetall(`pv:pages:${todayStr}`);
  pipeline.hgetall(`pv:refs:${todayStr}`);
  pipeline.hgetall(`pv:countries:${todayStr}`);
  pipeline.lrange('pv:recent', 0, 49);
  pipeline.smembers(`pv:ips:${todayStr}`);

  const raw = await pipeline.exec();
  if (!raw) return null;

  // Helper to safely get value from [error, result] tuple
  const val = (i: number) => (raw[i]?.[1] ?? null);

  const days: AnalyticsData['days'] = [];
  for (let i = 0; i < dates.length; i++) {
    const pageviews = Number(val(i * 2)) || 0;
    const visitors = Number(val(i * 2 + 1)) || 0;
    days.push({ date: dates[i], pageviews, visitors });
  }

  const offset = dates.length * 2;
  const pagesHash = (val(offset) as Record<string, string>) ?? {};
  const refsHash = (val(offset + 1) as Record<string, string>) ?? {};
  const countriesHash = (val(offset + 2) as Record<string, string>) ?? {};
  const recentRaw = (val(offset + 3) as string[]) ?? [];
  const todayIps = (val(offset + 4) as string[]) ?? [];

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
