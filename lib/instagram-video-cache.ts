import Redis from 'ioredis';
import { randomUUID } from 'crypto';

const CHUNK_SIZE = 750 * 1024; // 750KB per chunk (~1MB base64)
const TTL_SECONDS = 7200; // 2 hours
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

/**
 * Store video in Redis using chunked base64 storage.
 * Returns a serve URL that Instagram can fetch.
 */
export async function cacheVideoForInstagram(buffer: Buffer): Promise<{ url: string }> {
  if (buffer.length > MAX_VIDEO_SIZE) {
    throw new Error(`Video te groot (${Math.round(buffer.length / 1024 / 1024)}MB). Maximum is 50MB.`);
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) throw new Error('Redis niet geconfigureerd');

  const id = randomUUID();
  const chunks = Math.ceil(buffer.length / CHUNK_SIZE);

  const redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
  try {
    const pipeline = redis.pipeline();

    // Store metadata
    pipeline.set(
      `ig-video:${id}:meta`,
      JSON.stringify({ chunks, size: buffer.length, contentType: 'video/mp4' }),
      'EX',
      TTL_SECONDS,
    );

    // Store each chunk
    for (let i = 0; i < chunks; i++) {
      const start = i * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, buffer.length);
      const chunk = buffer.subarray(start, end).toString('base64');
      pipeline.set(`ig-video:${id}:${i}`, chunk, 'EX', TTL_SECONDS);
    }

    await pipeline.exec();
  } finally {
    redis.disconnect();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devadercoach.nl';
  return { url: `${baseUrl}/api/instagram/serve-video?id=${id}` };
}

/**
 * Read chunked video from Redis and return as a single Buffer.
 */
export async function getVideoFromCache(id: string): Promise<{ buffer: Buffer; contentType: string } | null> {
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) return null;

  const redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
  try {
    const metaRaw = await redis.get(`ig-video:${id}:meta`);
    if (!metaRaw) return null;

    const meta = JSON.parse(metaRaw) as { chunks: number; size: number; contentType: string };

    const pipeline = redis.pipeline();
    for (let i = 0; i < meta.chunks; i++) {
      pipeline.get(`ig-video:${id}:${i}`);
    }
    const results = await pipeline.exec();
    if (!results) return null;

    const parts: Buffer[] = [];
    for (const [err, val] of results) {
      if (err || !val || typeof val !== 'string') return null;
      parts.push(Buffer.from(val, 'base64'));
    }

    return { buffer: Buffer.concat(parts), contentType: meta.contentType };
  } finally {
    redis.disconnect();
  }
}
