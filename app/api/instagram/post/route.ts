import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  const { imageUrl, caption } = await request.json();

  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    return NextResponse.json(
      { error: 'Instagram niet geconfigureerd. Voeg INSTAGRAM_ACCESS_TOKEN en INSTAGRAM_BUSINESS_ACCOUNT_ID toe aan je .env.local.' },
      { status: 500 },
    );
  }

  // Step 1: Create media container
  const containerRes = await fetch(
    `https://graph.facebook.com/v21.0/${accountId}/media`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: imageUrl,
        caption,
        access_token: accessToken,
      }),
    },
  );
  const containerData = await containerRes.json();

  if (containerData.error) {
    return NextResponse.json({ error: containerData.error.message }, { status: 400 });
  }

  const containerId = containerData.id;

  // Step 2: Wait for container processing
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // Step 3: Publish
  const publishRes = await fetch(
    `https://graph.facebook.com/v21.0/${accountId}/media_publish`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: containerId,
        access_token: accessToken,
      }),
    },
  );
  const publishData = await publishRes.json();

  if (publishData.error) {
    return NextResponse.json({ error: publishData.error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, postId: publishData.id });
}
