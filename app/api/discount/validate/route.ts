import { NextRequest, NextResponse } from 'next/server';
import { validateDiscount } from '@/lib/discount';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, { maxRequests: 10, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const { code, slug } = await request.json();

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ valid: false, error: 'Ongeldige code' });
  }

  const result = await validateDiscount(code.trim().toUpperCase());

  if (!result.valid || !result.discount) {
    return NextResponse.json({ valid: false, error: result.error || 'Ongeldige kortingscode' });
  }

  // Badge reward codes are only valid for individual courses
  const isBadgeReward = result.discount.source?.startsWith('badge:');
  const isBundle = slug === 'compleet-vaderpakket' || slug === 'experience';
  if (isBadgeReward && isBundle) {
    return NextResponse.json({
      valid: false,
      error: 'Deze kortingscode is alleen geldig op losse cursussen.',
    });
  }

  return NextResponse.json({
    valid: true,
    code: result.discount.code,
    percentOff: result.discount.percentOff,
  });
}
