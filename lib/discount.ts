import crypto from 'crypto';
import { getRedis } from './newsletter';

export interface DiscountCode {
  code: string;
  email: string;
  percentOff: number;
  createdAt: string;
  expiresAt: string;
  used: boolean;
  usedAt?: string;
  source?: string; // e.g. 'badge:streak_30', 'newsletter', etc.
}

export function generateDiscountCode(): string {
  return 'VADER-' + crypto.randomBytes(4).toString('hex').slice(0, 6).toUpperCase();
}

export async function createDiscount(email: string, percentOff: number = 15): Promise<DiscountCode | null> {
  const r = getRedis();
  if (!r) return null;

  const code = generateDiscountCode();
  const now = new Date();
  const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  const discount: DiscountCode = {
    code,
    email: email.toLowerCase().trim(),
    percentOff,
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    used: false,
  };

  const pipeline = r.pipeline();
  pipeline.hset(`nl:discount:${code}`, {
    code,
    email: discount.email,
    percentOff: String(percentOff),
    createdAt: discount.createdAt,
    expiresAt: discount.expiresAt,
    used: '0',
  });
  // Store discount code on subscriber
  pipeline.hset(`nl:sub:${discount.email}`, 'discountCode', code);
  await pipeline.exec();

  return discount;
}

export async function validateDiscount(code: string): Promise<{ valid: boolean; discount?: DiscountCode; error?: string }> {
  const r = getRedis();
  if (!r) return { valid: false, error: 'Redis niet beschikbaar' };

  const data = await r.hgetall(`nl:discount:${code}`);
  if (!data || !data.code) return { valid: false, error: 'Ongeldige kortingscode' };

  if (data.used === '1') return { valid: false, error: 'Deze code is al gebruikt' };
  if (new Date(data.expiresAt) < new Date()) return { valid: false, error: 'Deze code is verlopen' };

  return {
    valid: true,
    discount: {
      code: data.code,
      email: data.email,
      percentOff: Number(data.percentOff),
      createdAt: data.createdAt,
      expiresAt: data.expiresAt,
      used: false,
      source: data.source,
    },
  };
}

export async function markDiscountUsed(code: string): Promise<void> {
  const r = getRedis();
  if (!r) return;

  await r.hset(`nl:discount:${code}`, {
    used: '1',
    usedAt: new Date().toISOString(),
  });
}

export async function getDiscountForEmail(email: string): Promise<DiscountCode | null> {
  const r = getRedis();
  if (!r) return null;

  const code = await r.hget(`nl:sub:${email.toLowerCase().trim()}`, 'discountCode');
  if (!code) return null;

  const data = await r.hgetall(`nl:discount:${code}`);
  if (!data || !data.code) return null;

  return {
    code: data.code,
    email: data.email,
    percentOff: Number(data.percentOff),
    createdAt: data.createdAt,
    expiresAt: data.expiresAt,
    used: data.used === '1',
    usedAt: data.usedAt,
  };
}
