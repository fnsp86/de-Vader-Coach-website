import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id || !/^[a-f0-9-]+$/.test(id)) {
    return NextResponse.json({ error: 'invalid id', id }, { status: 400 });
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    return NextResponse.json({ error: 'no redis url' }, { status: 500 });
  }

  let redis: Redis | null = null;
  try {
    redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
    const base64 = await redis.get(`ig-image:${id}`);

    if (!base64) {
      return NextResponse.json({ error: 'not in redis', key: `ig-image:${id}` }, { status: 404 });
    }

    const buffer = Buffer.from(base64, 'base64');
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (e) {
    return NextResponse.json({ error: 'redis error', message: e instanceof Error ? e.message : String(e) }, { status: 500 });
  } finally {
    redis?.disconnect();
  }
}
