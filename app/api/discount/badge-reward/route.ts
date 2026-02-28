import { NextRequest, NextResponse } from 'next/server';
import { getRedis } from '@/lib/newsletter';
import { generateDiscountCode } from '@/lib/discount';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * Badge-to-discount mapping.
 * When a user earns one of these badges in the app, they can claim a discount code.
 */
const BADGE_REWARDS: Record<string, { percentOff: number; label: string }> = {
  streak_7:      { percentOff: 5,  label: '7 dagen streak' },
  combo_triple:  { percentOff: 5,  label: 'Triple Threat' },
  streak_30:     { percentOff: 10, label: '30 dagen streak' },
  tasks_100:     { percentOff: 10, label: '100 taken voltooid' },
  arena_perfect: { percentOff: 15, label: 'Perfecte quiz score' },
  streak_100:    { percentOff: 15, label: '100 dagen streak' },
  learn_all:     { percentOff: 20, label: 'Alle 40 modules voltooid' },
  streak_365:    { percentOff: 25, label: '365 dagen streak' },
};

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, { maxRequests: 5, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const secret = process.env.BADGE_REWARD_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const body = await request.json();
  const { badgeId, email, appSecret } = body;

  if (!badgeId || !email || !appSecret) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  if (appSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const reward = BADGE_REWARDS[badgeId];
  if (!reward) {
    return NextResponse.json({ error: 'Badge not eligible for reward' }, { status: 400 });
  }

  const r = getRedis();
  if (!r) {
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 500 });
  }

  const normalizedEmail = email.toLowerCase().trim();
  const rewardKey = `nl:badge-reward:${normalizedEmail}:${badgeId}`;

  // Check if already claimed
  const existing = await r.get(rewardKey);
  if (existing) {
    // Return the existing code instead of creating a new one
    const discountData = await r.hgetall(`nl:discount:${existing}`);
    return NextResponse.json({
      code: existing,
      percentOff: reward.percentOff,
      badgeId,
      alreadyClaimed: true,
      expiresAt: discountData?.expiresAt || null,
    });
  }

  // Generate new discount code
  const code = generateDiscountCode();
  const now = new Date();
  const expires = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days for badge rewards

  const pipeline = r.pipeline();
  pipeline.hset(`nl:discount:${code}`, {
    code,
    email: normalizedEmail,
    percentOff: String(reward.percentOff),
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    used: '0',
    source: `badge:${badgeId}`,
  });
  // Track that this badge+email combo has been claimed
  pipeline.set(rewardKey, code);
  await pipeline.exec();

  return NextResponse.json({
    code,
    percentOff: reward.percentOff,
    badgeId,
    alreadyClaimed: false,
    expiresAt: expires.toISOString(),
  });
}
