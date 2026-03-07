import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id || !/^[a-f0-9-]+$/.test(id)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 500 });
  }

  let redis: Redis | null = null;
  try {
    redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
    const base64 = await redis.get(`ig-image:${id}`);

    if (!base64) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const buffer = Buffer.from(base64, 'base64');
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Image could not be loaded' }, { status: 500 });
  } finally {
    redis?.disconnect();
  }
}
