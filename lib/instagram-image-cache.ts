import Redis from 'ioredis';
import { randomUUID } from 'crypto';

export interface CachedImage {
  url: string;
  buffer: Buffer;
}

/**
 * Fetch image, store in Redis, return both the public URL and raw buffer.
 * Instagram needs the URL; Facebook gets the buffer uploaded directly.
 */
export async function cacheImageForInstagram(imageUrl: string): Promise<CachedImage> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devadercoach.nl';
  const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

  const res = await fetch(fullUrl);
  if (!res.ok) throw new Error(`Kon afbeelding niet ophalen (${res.status})`);

  const buffer = Buffer.from(await res.arrayBuffer());
  const base64 = buffer.toString('base64');
  const id = randomUUID();

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) throw new Error('Redis niet geconfigureerd');

  const redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
  try {
    await redis.set(`ig-image:${id}`, base64, 'EX', 3600);
  } finally {
    redis.disconnect();
  }

  return { url: `${baseUrl}/ig/${id}.png`, buffer };
}
