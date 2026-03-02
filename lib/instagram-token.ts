import Redis from 'ioredis';

const REDIS_KEY = 'instagram_access_token';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
  return redis;
}

/**
 * Get the current Instagram access token.
 * Checks Redis first (refreshed token), falls back to env var.
 */
export async function getInstagramToken(): Promise<string | null> {
  const r = getRedis();
  if (r) {
    try {
      const stored = await r.get(REDIS_KEY);
      if (stored) return stored;
    } catch { /* fall through to env */ }
  }
  return process.env.INSTAGRAM_ACCESS_TOKEN || null;
}

/**
 * Refresh the Instagram long-lived token.
 * Tokens can be refreshed after 24h and before they expire (60 days).
 * Stores the new token in Redis.
 */
export async function refreshInstagramToken(): Promise<{ success: boolean; expiresIn?: number; error?: string }> {
  const currentToken = await getInstagramToken();
  if (!currentToken) {
    return { success: false, error: 'Geen Instagram token geconfigureerd' };
  }

  try {
    const res = await fetch(
      `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(currentToken)}`,
    );
    const data = await res.json();

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    const newToken = data.access_token;
    const expiresIn = data.expires_in;

    // Store in Redis
    const r = getRedis();
    if (r && newToken) {
      await r.set(REDIS_KEY, newToken);
    }

    return { success: true, expiresIn };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}
