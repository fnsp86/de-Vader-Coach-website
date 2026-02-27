import Redis from 'ioredis';
import type { DynamicBlogPost } from './blog-templates';

export type { DynamicBlogPost };

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
  return redis;
}

export async function saveBlogPost(post: DynamicBlogPost): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error('Redis niet beschikbaar');

  post.updatedAt = new Date().toISOString();
  const pipeline = r.pipeline();
  pipeline.hset('blog:posts', post.slug, JSON.stringify(post));
  const dateScore = new Date(post.date).getTime();
  pipeline.zadd('blog:list', dateScore, post.slug);
  await pipeline.exec();
}

export async function getDynamicBlogPost(slug: string): Promise<DynamicBlogPost | null> {
  const r = getRedis();
  if (!r) return null;

  const data = await r.hget('blog:posts', slug);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export async function getAllDynamicBlogPosts(): Promise<DynamicBlogPost[]> {
  const r = getRedis();
  if (!r) return [];

  const allData = await r.hgetall('blog:posts');
  if (!allData) return [];

  return Object.values(allData)
    .map((raw) => {
      try {
        return JSON.parse(raw) as DynamicBlogPost;
      } catch {
        return null;
      }
    })
    .filter((p): p is DynamicBlogPost => !!p)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function deleteDynamicBlogPost(slug: string): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error('Redis niet beschikbaar');

  const pipeline = r.pipeline();
  pipeline.hdel('blog:posts', slug);
  pipeline.zrem('blog:list', slug);
  await pipeline.exec();
}
