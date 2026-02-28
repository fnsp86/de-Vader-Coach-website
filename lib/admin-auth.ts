import { NextRequest, NextResponse } from 'next/server';
import { verifyTOTP } from './totp';
import crypto from 'crypto';
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
 * Hash a password with scrypt + random salt. Returns "salt:hash" in hex.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verify a password against a "salt:hash" string using constant-time comparison.
 */
export function verifyPasswordHash(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const inputHash = crypto.scryptSync(password, salt, 64);
  const storedHash = Buffer.from(hash, 'hex');
  if (inputHash.length !== storedHash.length) return false;
  return crypto.timingSafeEqual(inputHash, storedHash);
}

/**
 * Constant-time string comparison for plaintext passwords (env var fallback).
 */
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Compare against self to prevent timing leaks on length difference
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Verify admin password (used for all admin API calls).
 */
export async function verifyAdminAuth(request: NextRequest): Promise<boolean> {
  const password = request.headers.get('x-admin-password');
  if (!password) return false;

  const r = getRedis();
  if (r) {
    const stored = await r.get('admin:password_hash');
    if (stored) return verifyPasswordHash(password, stored);
    // Legacy: check unhashed password in Redis, migrate if found
    const legacyPassword = await r.get('admin:password');
    if (legacyPassword) {
      const result = safeCompare(password, legacyPassword);
      if (result) {
        // Auto-migrate to hashed storage
        await r.set('admin:password_hash', hashPassword(legacyPassword));
        await r.del('admin:password');
      }
      return result;
    }
  }

  const envPassword = process.env.ADMIN_PASSWORD;
  if (!envPassword) return false;
  return safeCompare(password, envPassword);
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
