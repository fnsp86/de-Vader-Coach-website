import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getInstagramToken } from '@/lib/instagram-token';

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
    // Carousel post (multiple images)
    if (imageUrls && imageUrls.length > 1) {
      return await postCarousel(accountId, accessToken, imageUrls, caption);
    }

    // Single image post
    return await postSingle(accountId, accessToken, imageUrl, caption);
  } catch (e) {
    return NextResponse.json(
      { error: `Post mislukt: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 },
    );
  }
}

async function postSingle(accountId: string, accessToken: string, imageUrl: string, caption: string) {
  // Step 1: Create media container
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

  // Step 2: Wait for processing
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Step 3: Publish
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
  // Step 1: Create a container for each image
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

  // Step 2: Create carousel container
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

  // Step 3: Wait for processing
  await new Promise((resolve) => setTimeout(resolve, 8000));

  // Step 4: Publish
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
