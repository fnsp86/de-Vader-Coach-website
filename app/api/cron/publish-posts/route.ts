import { NextRequest, NextResponse } from 'next/server';
import { getDuePosts, updatePostStatus } from '@/lib/instagram-schedule';
import { getInstagramToken } from '@/lib/instagram-token';
import { cacheImageForInstagram, type CachedImage } from '@/lib/instagram-image-cache';

export const maxDuration = 60;

/**
 * Lightweight cron endpoint that ONLY publishes scheduled posts.
 * Designed to be called every 15 minutes by an external cron service (e.g. cron-job.org)
 * since Vercel Hobby only supports daily crons.
 *
 * Setup:
 * - URL: https://devadercoach.nl/api/cron/publish-posts
 * - Header: Authorization: Bearer {CRON_SECRET}
 * - Interval: every 15 minutes
 */
export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const duePosts = await getDuePosts();
  if (duePosts.length === 0) {
    return NextResponse.json({ ok: true, published: 0, message: 'Geen posts gepland' });
  }

  const accessToken = await getInstagramToken();
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    return NextResponse.json({ error: 'Instagram niet geconfigureerd' }, { status: 500 });
  }

  let published = 0;
  let failed = 0;

  for (const post of duePosts) {
    await updatePostStatus(post.id, 'posting');
    try {
      // Cache images (returns both URL for Instagram and buffer for Facebook)
      const cachedImages: CachedImage[] = [];
      for (const url of post.imageUrls) {
        cachedImages.push(await cacheImageForInstagram(url));
      }
      const cachedUrls = cachedImages.map((c) => c.url);

      // Publish to Instagram feed
      let postId: string;
      if (cachedUrls.length > 1) {
        postId = await publishCarousel(accountId, accessToken, cachedUrls, post.caption);
      } else {
        postId = await publishSingle(accountId, accessToken, cachedUrls[0], post.caption);
      }

      // Instagram Story (optional, 9:16 format)
      if (post.postAsStory) {
        try {
          const storyUrl = post.imageUrls[0] + (post.imageUrls[0].includes('?') ? '&' : '?') + 'format=story';
          const storyImage = await cacheImageForInstagram(storyUrl);
          await publishStory(accountId, accessToken, storyImage.url);
        } catch {
          // Story failure should not fail the whole post
        }
      }

      // Facebook cross-post (optional)
      if (post.postToFacebook) {
        try {
          await crossPostToFacebook(cachedImages.map((c) => c.buffer), post.caption);
        } catch (fbErr) {
          console.error('[cron] Facebook cross-post failed:', fbErr instanceof Error ? fbErr.message : String(fbErr));
        }
      }

      await updatePostStatus(post.id, 'posted', { postId });
      published++;
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      await updatePostStatus(post.id, 'failed', { error: errorMsg });
      failed++;
    }
  }

  return NextResponse.json({ ok: true, published, failed });
}

// ── Instagram helpers ────

async function publishSingle(accountId: string, accessToken: string, imageUrl: string, caption: string): Promise<string> {
  const containerRes = await fetch(`https://graph.instagram.com/v21.0/${accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: imageUrl, caption, access_token: accessToken }),
  });
  const containerData = await containerRes.json();
  if (containerData.error) throw new Error(containerData.error.message);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const publishRes = await fetch(`https://graph.instagram.com/v21.0/${accountId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: containerData.id, access_token: accessToken }),
  });
  const publishData = await publishRes.json();
  if (publishData.error) throw new Error(publishData.error.message);
  return publishData.id;
}

async function publishCarousel(accountId: string, accessToken: string, imageUrls: string[], caption: string): Promise<string> {
  const containerIds: string[] = [];
  for (const url of imageUrls) {
    const res = await fetch(`https://graph.instagram.com/v21.0/${accountId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: url, is_carousel_item: true, access_token: accessToken }),
    });
    const data = await res.json();
    if (data.error) throw new Error(`Slide: ${data.error.message}`);
    containerIds.push(data.id);
  }

  const carouselRes = await fetch(`https://graph.instagram.com/v21.0/${accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_type: 'CAROUSEL', children: containerIds.join(','), caption, access_token: accessToken }),
  });
  const carouselData = await carouselRes.json();
  if (carouselData.error) throw new Error(`Carousel: ${carouselData.error.message}`);

  await new Promise((resolve) => setTimeout(resolve, 8000));

  const publishRes = await fetch(`https://graph.instagram.com/v21.0/${accountId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: carouselData.id, access_token: accessToken }),
  });
  const publishData = await publishRes.json();
  if (publishData.error) throw new Error(`Publish: ${publishData.error.message}`);
  return publishData.id;
}

async function publishStory(accountId: string, accessToken: string, imageUrl: string): Promise<string> {
  const containerRes = await fetch(`https://graph.instagram.com/v21.0/${accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_type: 'STORIES', image_url: imageUrl, access_token: accessToken }),
  });
  const containerData = await containerRes.json();
  if (containerData.error) throw new Error(containerData.error.message);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const publishRes = await fetch(`https://graph.instagram.com/v21.0/${accountId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: containerData.id, access_token: accessToken }),
  });
  const publishData = await publishRes.json();
  if (publishData.error) throw new Error(publishData.error.message);
  return publishData.id;
}

async function crossPostToFacebook(buffers: Buffer[], caption: string): Promise<void> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const pageToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !pageToken) return;

  if (buffers.length === 1) {
    const formData = new FormData();
    formData.append('source', new Blob([new Uint8Array(buffers[0])], { type: 'image/png' }), 'post.png');
    formData.append('message', caption);
    formData.append('access_token', pageToken);

    const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/photos`, { method: 'POST', body: formData });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return;
  }

  // Multi-image: upload each unpublished, then create album post
  const photoIds: string[] = [];
  for (const buffer of buffers) {
    const formData = new FormData();
    formData.append('source', new Blob([new Uint8Array(buffer)], { type: 'image/png' }), 'post.png');
    formData.append('published', 'false');
    formData.append('access_token', pageToken);

    const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/photos`, { method: 'POST', body: formData });
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    photoIds.push(data.id);
  }

  const params = new URLSearchParams();
  params.set('message', caption);
  params.set('access_token', pageToken);
  photoIds.forEach((id, i) => { params.set(`attached_media[${i}]`, JSON.stringify({ media_fbid: id })); });

  const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
}
