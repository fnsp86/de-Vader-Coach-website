import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiter (per serverless instance)
// For production at scale, use Redis-based rate limiting
const hits = new Map<string, { count: number; resetAt: number }>();

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of hits) {
    if (val.resetAt < now) hits.delete(key);
  }
}, 5 * 60 * 1000);

interface RateLimitOptions {
  maxRequests: number; // max requests per window
  windowMs: number;    // window duration in milliseconds
}

/**
 * Check rate limit for a request. Returns null if allowed, or a 429 Response if blocked.
 */
export function checkRateLimit(
  request: NextRequest,
  options: RateLimitOptions = { maxRequests: 10, windowMs: 60_000 },
): NextResponse | null {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  const key = `${ip}:${request.nextUrl.pathname}`;
  const now = Date.now();

  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + options.windowMs });
    return null;
  }

  entry.count++;
  if (entry.count > options.maxRequests) {
    return NextResponse.json(
      { error: 'Te veel verzoeken. Probeer het later opnieuw.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
        },
      },
    );
  }

  return null;
}
