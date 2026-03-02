import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

/**
 * Serves a cached Instagram image from Redis.
 * Images are stored temporarily by the post route before sending to Instagram.
 * Simple static-like PNG response that Instagram can reliably download.
 */
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id || !/^[a-f0-9-]+$/.test(id)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    return new NextResponse('Redis not configured', { status: 500 });
  }

  const redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
  try {
    const base64 = await redis.get(`ig-image:${id}`);
    if (!base64) {
      return new NextResponse('Not found', { status: 404 });
    }

    const buffer = Buffer.from(base64, 'base64');
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } finally {
    redis.disconnect();
  }
}
