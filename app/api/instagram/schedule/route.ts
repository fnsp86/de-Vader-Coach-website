import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { schedulePost, getScheduledPosts, deleteScheduledPost, updatePostStatus } from '@/lib/instagram-schedule';
import { getInstagramToken } from '@/lib/instagram-token';
import { cacheImageForInstagram } from '@/lib/instagram-image-cache';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const posts = await getScheduledPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const body = await request.json();
  const { caption, scheduledAt, title, imageUrls } = body;

  if (!scheduledAt || !imageUrls?.length) {
    return NextResponse.json({ error: 'scheduledAt en imageUrls zijn verplicht' }, { status: 400 });
  }

  const post = await schedulePost({
    type: imageUrls.length > 1 ? 'carousel' : 'single',
    title: title ?? 'Untitled',
    caption: caption ?? '',
    imageUrls,
    scheduledAt,
  });

  if (!post) {
    return NextResponse.json({ error: 'Kon post niet inplannen (Redis niet beschikbaar)' }, { status: 503 });
  }

  return NextResponse.json({ success: true, post });
}

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'Post ID is verplicht' }, { status: 400 });
  }

  const posts = await getScheduledPosts();
  const post = posts.find((p) => p.id === id);
  if (!post || post.status !== 'scheduled') {
    return NextResponse.json({ error: 'Post niet gevonden of al gepubliceerd' }, { status: 404 });
  }

  const accessToken = await getInstagramToken();
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!accessToken || !accountId) {
    return NextResponse.json({ error: 'Instagram niet geconfigureerd' }, { status: 500 });
  }

  await updatePostStatus(id, 'posting');
  try {
    const cachedUrls: string[] = [];
    for (const url of post.imageUrls) {
      const cached = await cacheImageForInstagram(url);
      cachedUrls.push(cached.url);
    }

    let postId: string;
    if (cachedUrls.length > 1) {
      postId = await publishCarousel(accountId, accessToken, cachedUrls, post.caption);
    } else {
      postId = await publishSingle(accountId, accessToken, cachedUrls[0], post.caption);
    }
    await updatePostStatus(id, 'posted', { postId });
    return NextResponse.json({ success: true, postId });
  } catch (e) {
    const errorMsg = e instanceof Error ? e.message : String(e);
    await updatePostStatus(id, 'failed', { error: errorMsg });
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

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

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: 'Post ID is verplicht' }, { status: 400 });
  }

  await deleteScheduledPost(id);
  return NextResponse.json({ success: true });
}
