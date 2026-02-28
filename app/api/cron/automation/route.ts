import { NextRequest, NextResponse } from 'next/server';
import { getDuePosts, updatePostStatus } from '@/lib/instagram-schedule';
import { processDripQueue } from '@/lib/automation';
import { processMonthlyNewsletter } from '@/lib/monthly-newsletter';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sets this automatically for cron jobs)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Record<string, unknown> = {};

  // ── 1. Instagram scheduled posts ───────────────────
  try {
    const duePosts = await getDuePosts();
    if (duePosts.length > 0) {
      const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
      const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

      if (accessToken && accountId) {
        let published = 0;
        let failed = 0;

        for (const post of duePosts) {
          await updatePostStatus(post.id, 'posting');
          try {
            let postId: string;
            if (post.imageUrls.length > 1) {
              postId = await publishCarousel(accountId, accessToken, post.imageUrls, post.caption);
            } else {
              postId = await publishSingle(accountId, accessToken, post.imageUrls[0], post.caption);
            }
            await updatePostStatus(post.id, 'posted', { postId });
            published++;
          } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            await updatePostStatus(post.id, 'failed', { error: errorMsg });
            failed++;
          }
        }
        results.instagram = { published, failed };
      } else {
        results.instagram = { skipped: 'niet geconfigureerd' };
      }
    } else {
      results.instagram = { skipped: 'geen posts gepland' };
    }
  } catch (e) {
    results.instagram = { error: e instanceof Error ? e.message : String(e) };
  }

  // ── 2. Drip email queue ────────────────────────────
  try {
    const drip = await processDripQueue();
    results.drip = drip;
  } catch (e) {
    results.drip = { error: e instanceof Error ? e.message : String(e) };
  }

  // ── 3. Monthly newsletter (1st of each month) ─────
  try {
    const monthly = await processMonthlyNewsletter();
    results.monthly = monthly;
  } catch (e) {
    results.monthly = { error: e instanceof Error ? e.message : String(e) };
  }

  return NextResponse.json({ ok: true, results });
}

// ── Instagram helpers (moved from instagram cron) ────

async function publishSingle(accountId: string, accessToken: string, imageUrl: string, caption: string): Promise<string> {
  const containerRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image_url: imageUrl, caption, access_token: accessToken }),
  });
  const containerData = await containerRes.json();
  if (containerData.error) throw new Error(containerData.error.message);

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const publishRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media_publish`, {
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
    const res = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_url: url, is_carousel_item: true, access_token: accessToken }),
    });
    const data = await res.json();
    if (data.error) throw new Error(`Slide: ${data.error.message}`);
    containerIds.push(data.id);
  }

  const carouselRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_type: 'CAROUSEL', children: containerIds.join(','), caption, access_token: accessToken }),
  });
  const carouselData = await carouselRes.json();
  if (carouselData.error) throw new Error(`Carousel: ${carouselData.error.message}`);

  await new Promise((resolve) => setTimeout(resolve, 8000));

  const publishRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: carouselData.id, access_token: accessToken }),
  });
  const publishData = await publishRes.json();
  if (publishData.error) throw new Error(`Publish: ${publishData.error.message}`);

  return publishData.id;
}
