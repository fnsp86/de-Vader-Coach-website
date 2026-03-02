import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

/**
 * Serves cached Instagram images from Redis at a clean URL path.
 * Instagram requires image URLs that look like static files.
 * URL format: /ig/{uuid}.png
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: rawId } = await params;
  // Strip .png extension if present
  const id = rawId.replace(/\.png$/, '');

  if (!id || !/^[a-f0-9-]+$/.test(id)) {
    return new NextResponse('Not found', { status: 404 });
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    return new NextResponse('Not found', { status: 404 });
  }

  let redis: Redis | null = null;
  try {
    redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
    const base64 = await redis.get(`ig-image:${id}`);
    if (!base64) {
      return new NextResponse('Not found', { status: 404 });
    }

    const buffer = Buffer.from(base64, 'base64');
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length.toString(),
        'Content-Disposition': `inline; filename="${id}.png"`,
        'Cache-Control': 'public, max-age=3600',
        'Accept-Ranges': 'bytes',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  } finally {
    redis?.disconnect();
  }
}
