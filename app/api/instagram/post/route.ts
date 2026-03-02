import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getInstagramToken } from '@/lib/instagram-token';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';

interface CachedImage {
  url: string;
  buffer: Buffer;
}

/**
 * Fetch image, store in Redis, return both the public URL and raw buffer.
 * Instagram needs the URL; Facebook gets the buffer uploaded directly.
 */
async function cacheImageForInstagram(imageUrl: string): Promise<CachedImage> {
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

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { imageUrl, imageUrls, caption, postToFacebook, postAsStory } = await request.json();

  const accessToken = await getInstagramToken();
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    return NextResponse.json(
      { error: 'Instagram niet geconfigureerd. Voeg INSTAGRAM_ACCESS_TOKEN en INSTAGRAM_BUSINESS_ACCOUNT_ID toe aan je .env.local.' },
      { status: 500 },
    );
  }

  try {
    // Cache images to static URLs that Instagram can fetch
    let cachedImages: CachedImage[];
    if (imageUrls && imageUrls.length > 1) {
      cachedImages = await Promise.all(
        imageUrls.map((url: string) => cacheImageForInstagram(url)),
      );
    } else {
      cachedImages = [await cacheImageForInstagram(imageUrl)];
    }

    const cachedUrls = cachedImages.map((c) => c.url);

    // Instagram Feed post
    let igResult: { success: boolean; postId?: string; error?: string };
    if (cachedUrls.length > 1) {
      igResult = await postCarousel(accountId, accessToken, cachedUrls, caption);
    } else {
      igResult = await postSingle(accountId, accessToken, cachedUrls[0], caption);
    }

    if (!igResult.success) {
      return NextResponse.json({ error: igResult.error }, { status: 400 });
    }

    const extras: Record<string, unknown> = {};

    // Instagram Story (optional)
    if (postAsStory) {
      try {
        extras.story = await postStory(accountId, accessToken, cachedUrls[0]);
      } catch (e) {
        extras.storyError = e instanceof Error ? e.message : String(e);
      }
    }

    // Facebook cross-post (optional)
    if (postToFacebook) {
      try {
        extras.facebook = await crossPostToFacebook(
          cachedImages.map((c) => c.buffer),
          caption,
        );
      } catch (e) {
        extras.facebookError = e instanceof Error ? e.message : String(e);
      }
    }

    return NextResponse.json({ success: true, postId: igResult.postId, ...extras });
  } catch (e) {
    return NextResponse.json(
      { error: `Post mislukt: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 },
    );
  }
}

/* ── Instagram Feed ── */

async function postSingle(
  accountId: string,
  accessToken: string,
  imageUrl: string,
  caption: string,
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const containerRes = await fetch(
    `https://graph.instagram.com/v21.0/${accountId}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: imageUrl, caption, access_token: accessToken }),
    },
  );
  const containerData = await containerRes.json();
  if (containerData.error) {
    return { success: false, error: containerData.error.message };
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const publishRes = await fetch(
    `https://graph.instagram.com/v21.0/${accountId}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: containerData.id, access_token: accessToken }),
    },
  );
  const publishData = await publishRes.json();
  if (publishData.error) {
    return { success: false, error: publishData.error.message };
  }

  return { success: true, postId: publishData.id };
}

async function postCarousel(
  accountId: string,
  accessToken: string,
  imageUrls: string[],
  caption: string,
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const containerIds: string[] = [];
  for (const url of imageUrls) {
    const res = await fetch(
      `https://graph.instagram.com/v21.0/${accountId}/media`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_url: url, is_carousel_item: true, access_token: accessToken }),
      },
    );
    const data = await res.json();
    if (data.error) {
      return { success: false, error: `Slide fout: ${data.error.message}` };
    }
    containerIds.push(data.id);
  }

  const carouselRes = await fetch(
    `https://graph.instagram.com/v21.0/${accountId}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        media_type: 'CAROUSEL',
        children: containerIds.join(','),
        caption,
        access_token: accessToken,
      }),
    },
  );
  const carouselData = await carouselRes.json();
  if (carouselData.error) {
    return { success: false, error: `Carousel fout: ${carouselData.error.message}` };
  }

  await new Promise((resolve) => setTimeout(resolve, 8000));

  const publishRes = await fetch(
    `https://graph.instagram.com/v21.0/${accountId}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: carouselData.id, access_token: accessToken }),
    },
  );
  const publishData = await publishRes.json();
  if (publishData.error) {
    return { success: false, error: `Publicatie fout: ${publishData.error.message}` };
  }

  return { success: true, postId: publishData.id };
}

/* ── Instagram Stories ── */

async function postStory(
  accountId: string,
  accessToken: string,
  imageUrl: string,
): Promise<{ success: boolean; storyId?: string; error?: string }> {
  const containerRes = await fetch(
    `https://graph.instagram.com/v21.0/${accountId}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        media_type: 'STORIES',
        image_url: imageUrl,
        access_token: accessToken,
      }),
    },
  );
  const containerData = await containerRes.json();
  if (containerData.error) {
    return { success: false, error: `Story fout: ${containerData.error.message}` };
  }

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const publishRes = await fetch(
    `https://graph.instagram.com/v21.0/${accountId}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: containerData.id, access_token: accessToken }),
    },
  );
  const publishData = await publishRes.json();
  if (publishData.error) {
    return { success: false, error: `Story publicatie fout: ${publishData.error.message}` };
  }

  return { success: true, storyId: publishData.id };
}

/* ── Facebook Page ── */

async function crossPostToFacebook(
  buffers: Buffer[],
  caption: string,
): Promise<{ success: boolean; postId?: string; error?: string }> {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const pageToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !pageToken) {
    return { success: false, error: 'Facebook niet geconfigureerd. Voeg FACEBOOK_PAGE_ID en FACEBOOK_PAGE_ACCESS_TOKEN toe.' };
  }

  if (buffers.length === 1) {
    // Single photo post — upload directly
    const formData = new FormData();
    formData.append('source', new Blob([new Uint8Array(buffers[0])], { type: 'image/png' }), 'post.png');
    formData.append('message', caption);
    formData.append('access_token', pageToken);

    const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/photos`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.error) {
      return { success: false, error: `Facebook fout: ${data.error.message}` };
    }
    return { success: true, postId: data.post_id || data.id };
  }

  // Multi-image: upload each unpublished, then create album post
  const photoIds: string[] = [];
  for (const buffer of buffers) {
    const formData = new FormData();
    formData.append('source', new Blob([new Uint8Array(buffer)], { type: 'image/png' }), 'post.png');
    formData.append('published', 'false');
    formData.append('access_token', pageToken);

    const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/photos`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.error) {
      return { success: false, error: `Facebook foto upload fout: ${data.error.message}` };
    }
    photoIds.push(data.id);
  }

  const params = new URLSearchParams();
  params.set('message', caption);
  params.set('access_token', pageToken);
  photoIds.forEach((id, i) => {
    params.set(`attached_media[${i}]`, JSON.stringify({ media_fbid: id }));
  });

  const res = await fetch(`https://graph.facebook.com/v21.0/${pageId}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });
  const data = await res.json();
  if (data.error) {
    return { success: false, error: `Facebook album fout: ${data.error.message}` };
  }

  return { success: true, postId: data.id };
}
