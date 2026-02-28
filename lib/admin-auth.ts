import { NextRequest, NextResponse } from 'next/server';
import { verifyTOTP } from './totp';
import Redis from 'ioredis';

let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
  return redis;
}

/**
 * Get the active admin password (Redis overrides env var).
 */
async function getAdminPassword(): Promise<string | null> {
  const r = getRedis();
  if (r) {
    const redisPassword = await r.get('admin:password');
    if (redisPassword) return redisPassword;
  }
  return process.env.ADMIN_PASSWORD || null;
}

/**
 * Verify admin password (used for all admin API calls).
 */
export async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  const password = request.headers.get('x-admin-password');
  if (!password) return false;
  const adminPassword = await getAdminPassword();
  if (!adminPassword) return false;
  return password === adminPassword;
}

/**
 * Verify admin login: password + TOTP (used only at /api/admin/verify).
 * If ADMIN_TOTP_SECRET is not set, falls back to password-only.
 */
export async function verifyAdminLogin(request: NextRequest): Promise<boolean> {
  if (!(await verifyAdminAuth(request))) return false;

  const totpSecret = process.env.ADMIN_TOTP_SECRET;
  if (totpSecret) {
    const totpCode = request.headers.get('x-admin-totp');
    if (!totpCode) return false;
    return verifyTOTP(totpSecret, totpCode);
  }

  return true;
}

/**
 * Check if 2FA is enabled (ADMIN_TOTP_SECRET is set).
 */
export function is2FAEnabled(): boolean {
  return !!process.env.ADMIN_TOTP_SECRET;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
