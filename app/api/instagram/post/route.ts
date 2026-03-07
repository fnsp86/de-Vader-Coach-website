import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getInstagramToken } from '@/lib/instagram-token';
import { cacheImageForInstagram, type CachedImage } from '@/lib/instagram-image-cache';

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { imageUrl, imageUrls, caption, postToFacebook, postAsStory, isReel, videoUrl } = await request.json();

  const accessToken = await getInstagramToken();
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    return NextResponse.json(
      { error: 'Instagram niet geconfigureerd. Voeg INSTAGRAM_ACCESS_TOKEN en INSTAGRAM_BUSINESS_ACCOUNT_ID toe aan je .env.local.' },
      { status: 500 },
    );
  }

  try {
    let igResult: { success: boolean; postId?: string; error?: string };
    let cachedImages: CachedImage[] = [];

    if (isReel && videoUrl) {
      // Reel publishing (video)
      igResult = await postReel(accountId, accessToken, videoUrl, caption);
    } else {
      // Image publishing (single or carousel)
      if (imageUrls && imageUrls.length > 1) {
        cachedImages = await Promise.all(
          imageUrls.map((url: string) => cacheImageForInstagram(url)),
        );
      } else {
        cachedImages = [await cacheImageForInstagram(imageUrl)];
      }

      const cachedUrls = cachedImages.map((c) => c.url);

      if (cachedUrls.length > 1) {
        igResult = await postCarousel(accountId, accessToken, cachedUrls, caption);
      } else {
        igResult = await postSingle(accountId, accessToken, cachedUrls[0], caption);
      }
    }

    if (!igResult.success) {
      return NextResponse.json({ error: igResult.error }, { status: 400 });
    }

    const extras: Record<string, unknown> = {};

    // Instagram Story (optional, not for Reels)
    if (postAsStory && !isReel && cachedImages.length > 0) {
      try {
        extras.story = await postStory(accountId, accessToken, cachedImages[0].url);
      } catch (e) {
        extras.storyError = e instanceof Error ? e.message : String(e);
      }
    }

    // Facebook cross-post (optional)
    if (postToFacebook && cachedImages.length > 0) {
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
    `https://graph.facebook.com/v21.0/${accountId}/media`,
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
    `https://graph.facebook.com/v21.0/${accountId}/media_publish`,
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
      `https://graph.facebook.com/v21.0/${accountId}/media`,
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
    `https://graph.facebook.com/v21.0/${accountId}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        media_type: 'CAROUSEL',
        children: containerIds,
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
    `https://graph.facebook.com/v21.0/${accountId}/media_publish`,
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

/* ── Instagram Reels ── */

async function postReel(
  accountId: string,
  accessToken: string,
  videoUrl: string,
  caption: string,
): Promise<{ success: boolean; postId?: string; error?: string }> {
  // Create Reel media container
  const containerRes = await fetch(
    `https://graph.facebook.com/v21.0/${accountId}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        media_type: 'REELS',
        video_url: videoUrl,
        caption,
        access_token: accessToken,
      }),
    },
  );
  const containerData = await containerRes.json();
  if (containerData.error) {
    return { success: false, error: `Reel container fout: ${containerData.error.message}` };
  }

  // Poll for video processing status (Instagram processes async)
  const containerId = containerData.id;
  const maxWait = 60000; // 60 seconds
  const pollInterval = 3000; // 3 seconds
  const start = Date.now();

  while (Date.now() - start < maxWait) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval));

    const statusRes = await fetch(
      `https://graph.facebook.com/v21.0/${containerId}?fields=status_code&access_token=${accessToken}`,
    );
    const statusData = await statusRes.json();

    if (statusData.status_code === 'FINISHED') break;
    if (statusData.status_code === 'ERROR') {
      return { success: false, error: 'Instagram kon de video niet verwerken' };
    }
    // IN_PROGRESS - keep polling
  }

  // Publish the Reel
  const publishRes = await fetch(
    `https://graph.facebook.com/v21.0/${accountId}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ creation_id: containerId, access_token: accessToken }),
    },
  );
  const publishData = await publishRes.json();
  if (publishData.error) {
    return { success: false, error: `Reel publicatie fout: ${publishData.error.message}` };
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
    `https://graph.facebook.com/v21.0/${accountId}/media`,
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
    `https://graph.facebook.com/v21.0/${accountId}/media_publish`,
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
