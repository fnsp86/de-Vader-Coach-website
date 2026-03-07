import Redis from 'ioredis';

const REDIS_KEY = 'instagram_access_token';
const FB_TOKEN_KEY = 'facebook_page_access_token';

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
 * Get the current Facebook Page access token.
 */
export async function getFacebookPageToken(): Promise<string | null> {
  const r = getRedis();
  if (r) {
    try {
      const stored = await r.get(FB_TOKEN_KEY);
      if (stored) return stored;
    } catch { /* fall through */ }
  }
  return process.env.FACEBOOK_PAGE_ACCESS_TOKEN || null;
}

/**
 * Store a new Instagram token in Redis.
 */
export async function storeInstagramToken(token: string): Promise<void> {
  const r = getRedis();
  if (r) await r.set(REDIS_KEY, token);
}

/**
 * Store a new Facebook Page token in Redis.
 */
export async function storeFacebookPageToken(token: string): Promise<void> {
  const r = getRedis();
  if (r) await r.set(FB_TOKEN_KEY, token);
}

/**
 * Exchange a short-lived token for a long-lived token (60 days).
 */
export async function exchangeForLongLivedToken(shortLivedToken: string): Promise<{
  success: boolean;
  accessToken?: string;
  expiresIn?: number;
  error?: string;
}> {
  const appId = process.env.META_APP_ID;
  const appSecret = process.env.META_APP_SECRET;

  if (!appId || !appSecret) {
    return { success: false, error: 'META_APP_ID en META_APP_SECRET niet geconfigureerd' };
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${encodeURIComponent(shortLivedToken)}`,
    );
    const data = await res.json();

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    const longToken = data.access_token;
    const expiresIn = data.expires_in;

    // Store in Redis
    if (longToken) {
      await storeInstagramToken(longToken);
    }

    return { success: true, accessToken: longToken, expiresIn };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
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
      `https://graph.facebook.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(currentToken)}`,
    );
    const data = await res.json();

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    const newToken = data.access_token;
    const expiresIn = data.expires_in;

    // Store in Redis
    if (newToken) {
      await storeInstagramToken(newToken);
    }

    return { success: true, expiresIn };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Check if the current token is valid and get account info.
 */
export async function checkTokenStatus(): Promise<{
  valid: boolean;
  username?: string;
  accountId?: string;
  error?: string;
}> {
  const token = await getInstagramToken();
  if (!token) return { valid: false, error: 'Geen token geconfigureerd' };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/me?fields=id,username&access_token=${encodeURIComponent(token)}`,
    );
    const data = await res.json();

    if (data.error) {
      return { valid: false, error: data.error.message };
    }

    return { valid: true, username: data.username, accountId: data.id };
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : String(e) };
  }
}
