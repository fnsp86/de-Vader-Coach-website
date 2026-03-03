import Redis from 'ioredis';

let redis: Redis | null = null;

function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
  return redis;
}

export interface ScheduledPost {
  id: string;
  type: 'single' | 'carousel';
  title: string;
  caption: string;
  imageUrls: string[];
  scheduledAt: string; // ISO timestamp
  status: 'scheduled' | 'posting' | 'posted' | 'failed';
  postToFacebook?: boolean;
  postAsStory?: boolean;
  postId?: string;
  error?: string;
  createdAt: string;
  mediaType?: 'image' | 'reel'; // default 'image' for backward compat
  videoUrl?: string; // serve-URL for Reel video
}

function generateId(): string {
  return `ig_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function schedulePost(post: Omit<ScheduledPost, 'id' | 'status' | 'createdAt'>): Promise<ScheduledPost | null> {
  const r = getRedis();
  if (!r) return null;

  const scheduled: ScheduledPost = {
    ...post,
    id: generateId(),
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  };

  const pipeline = r.pipeline();
  pipeline.set(`ig:post:${scheduled.id}`, JSON.stringify(scheduled));
  pipeline.zadd('ig:scheduled', new Date(scheduled.scheduledAt).getTime(), scheduled.id);
  pipeline.expire(`ig:post:${scheduled.id}`, 90 * 24 * 60 * 60);
  await pipeline.exec();

  return scheduled;
}

export async function getScheduledPosts(): Promise<ScheduledPost[]> {
  const r = getRedis();
  if (!r) return [];

  // Get all scheduled post IDs (sorted by time)
  const ids = await r.zrange('ig:scheduled', 0, -1);
  if (!ids.length) return [];

  const pipeline = r.pipeline();
  for (const id of ids) {
    pipeline.get(`ig:post:${id}`);
  }
  const results = await pipeline.exec();
  if (!results) return [];

  const posts: ScheduledPost[] = [];
  for (const [err, val] of results) {
    if (!err && val && typeof val === 'string') {
      try {
        posts.push(JSON.parse(val));
      } catch {
        // skip invalid
      }
    }
  }

  return posts.sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());
}

export async function updatePostStatus(id: string, status: ScheduledPost['status'], extra?: { postId?: string; error?: string }): Promise<void> {
  const r = getRedis();
  if (!r) return;

  const raw = await r.get(`ig:post:${id}`);
  if (!raw) return;

  const post: ScheduledPost = JSON.parse(raw);
  post.status = status;
  if (extra?.postId) post.postId = extra.postId;
  if (extra?.error) post.error = extra.error;

  await r.set(`ig:post:${id}`, JSON.stringify(post));

  // Remove from scheduled set if no longer scheduled
  if (status === 'posted' || status === 'failed') {
    await r.zrem('ig:scheduled', id);
  }
}

export async function deleteScheduledPost(id: string): Promise<boolean> {
  const r = getRedis();
  if (!r) return false;

  const pipeline = r.pipeline();
  pipeline.del(`ig:post:${id}`);
  pipeline.zrem('ig:scheduled', id);
  await pipeline.exec();
  return true;
}

export async function getDuePosts(): Promise<ScheduledPost[]> {
  const r = getRedis();
  if (!r) return [];

  const now = Date.now();
  const ids = await r.zrangebyscore('ig:scheduled', 0, now);
  if (!ids.length) return [];

  const posts: ScheduledPost[] = [];
  for (const id of ids) {
    const raw = await r.get(`ig:post:${id}`);
    if (raw) {
      try {
        const post: ScheduledPost = JSON.parse(raw);
        if (post.status === 'scheduled') {
          posts.push(post);
        }
      } catch {
        // skip
      }
    }
  }

  return posts;
}
