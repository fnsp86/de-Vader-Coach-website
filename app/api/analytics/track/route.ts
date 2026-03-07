import { NextRequest, NextResponse } from 'next/server';
import { trackPageview } from '@/lib/analytics';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, { maxRequests: 30, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  try {
    const { path, referrer } = await request.json();

    if (!path || typeof path !== 'string' || path.length > 2000) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Get IP from headers (Vercel sets these)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown';

    const userAgent = request.headers.get('user-agent') ?? '';
    const country = request.headers.get('x-vercel-ip-country') ?? '';

    await trackPageview({
      path,
      ip,
      referrer: referrer ?? '',
      userAgent,
      country,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
