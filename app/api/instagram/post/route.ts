import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getInstagramToken } from '@/lib/instagram-token';
import Redis from 'ioredis';
import { randomUUID } from 'crypto';

/**
 * Instagram can't fetch images from our dynamic API endpoints.
 * This function fetches the image ourselves, stores it in Redis,
 * and returns a simple serve-image URL that Instagram CAN fetch.
 */
async function cacheImageForInstagram(imageUrl: string): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devadercoach.nl';
  const fullUrl = imageUrl.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

  // Fetch the image from our image endpoint
  const res = await fetch(fullUrl);
  if (!res.ok) throw new Error(`Kon afbeelding niet ophalen (${res.status})`);

  const buffer = Buffer.from(await res.arrayBuffer());
  const base64 = buffer.toString('base64');
  const id = randomUUID();

  // Store in Redis with 1-hour TTL
  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) throw new Error('Redis niet geconfigureerd');

  const redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 });
  try {
    await redis.set(`ig-image:${id}`, base64, 'EX', 3600);
  } finally {
    redis.disconnect();
  }

  // Return a clean URL that looks like a static image file
  return `${baseUrl}/ig/${id}.png`;
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { imageUrl, imageUrls, caption } = await request.json();

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
    if (imageUrls && imageUrls.length > 1) {
      const cachedUrls = await Promise.all(
        imageUrls.map((url: string) => cacheImageForInstagram(url)),
      );
      return await postCarousel(accountId, accessToken, cachedUrls, caption);
    }

    const cachedUrl = await cacheImageForInstagram(imageUrl);
    return await postSingle(accountId, accessToken, cachedUrl, caption);
  } catch (e) {
    return NextResponse.json(
      { error: `Post mislukt: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 },
    );
  }
}

async function postSingle(accountId: string, accessToken: string, imageUrl: string, caption: string) {
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
    return NextResponse.json({ error: containerData.error.message }, { status: 400 });
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
    return NextResponse.json({ error: publishData.error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, postId: publishData.id });
}

async function postCarousel(accountId: string, accessToken: string, imageUrls: string[], caption: string) {
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
      return NextResponse.json({ error: `Slide fout: ${data.error.message}` }, { status: 400 });
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
    return NextResponse.json({ error: `Carousel fout: ${carouselData.error.message}` }, { status: 400 });
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
    return NextResponse.json({ error: `Publicatie fout: ${publishData.error.message}` }, { status: 400 });
  }

  return NextResponse.json({ success: true, postId: publishData.id });
}
