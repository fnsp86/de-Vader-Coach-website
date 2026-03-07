import { NextRequest, NextResponse } from 'next/server';
import { getDuePosts, updatePostStatus } from '@/lib/instagram-schedule';
import { processDripQueue } from '@/lib/automation';
import { processMonthlyNewsletter } from '@/lib/monthly-newsletter';
import { executeAutoPublish } from '@/lib/instagram-auto-publish';
import { getInstagramToken, refreshInstagramToken } from '@/lib/instagram-token';
import { cacheImageForInstagram, type CachedImage } from '@/lib/instagram-image-cache';

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sets this automatically for cron jobs)
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get('authorization');
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results: Record<string, unknown> = {};

  // ── 0. Instagram token auto-refresh ───────────────
  try {
    const refresh = await refreshInstagramToken();
    results.tokenRefresh = refresh.success
      ? { refreshed: true, expiresIn: `${Math.round((refresh.expiresIn || 0) / 86400)}d` }
      : { refreshed: false, error: refresh.error };
  } catch (e) {
    results.tokenRefresh = { error: e instanceof Error ? e.message : String(e) };
  }

  // ── 1. Instagram scheduled posts ───────────────────
  try {
    const duePosts = await getDuePosts();
    if (duePosts.length > 0) {
      const accessToken = await getInstagramToken();
      const accountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

      if (accessToken && accountId) {
        let published = 0;
        let failed = 0;

        for (const post of duePosts) {
          await updatePostStatus(post.id, 'posting');
          try {
            let postId: string;

            if (post.mediaType === 'reel' && post.videoUrl) {
              // Publish as Reel
              postId = await publishReel(accountId, accessToken, post.videoUrl, post.caption);
            } else {
              // Cache images to fast static URLs before sending to Instagram
              const cachedImages: CachedImage[] = [];
              for (const url of post.imageUrls) {
                cachedImages.push(await cacheImageForInstagram(url));
              }
              const cachedUrls = cachedImages.map((c) => c.url);

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

  // ── 4. Automatisch Instagram posten (elke 3 dagen) ──
  try {
    const auto = await executeAutoPublish();
    results.autoPublish = auto;
  } catch (e) {
    results.autoPublish = { error: e instanceof Error ? e.message : String(e) };
  }

  return NextResponse.json({ ok: true, results });
}

// ── Instagram helpers ────

async function publishReel(accountId: string, accessToken: string, videoUrl: string, caption: string): Promise<string> {
  const containerRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_type: 'REELS', video_url: videoUrl, caption, access_token: accessToken }),
  });
  const containerData = await containerRes.json();
  if (containerData.error) throw new Error(`Reel container: ${containerData.error.message}`);

  const containerId = containerData.id;
  const maxWait = 60000;
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const statusRes = await fetch(
      `https://graph.facebook.com/v21.0/${containerId}?fields=status_code&access_token=${accessToken}`,
    );
    const statusData = await statusRes.json();
    if (statusData.status_code === 'FINISHED') break;
    if (statusData.status_code === 'ERROR') throw new Error('Instagram kon de video niet verwerken');
  }

  const publishRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media_publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creation_id: containerId, access_token: accessToken }),
  });
  const publishData = await publishRes.json();
  if (publishData.error) throw new Error(`Reel publish: ${publishData.error.message}`);
  return publishData.id;
}

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

async function publishStory(accountId: string, accessToken: string, imageUrl: string): Promise<string> {
  const containerRes = await fetch(`https://graph.facebook.com/v21.0/${accountId}/media`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ media_type: 'STORIES', image_url: imageUrl, access_token: accessToken }),
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
