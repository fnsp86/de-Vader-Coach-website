import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import {
  checkTokenStatus,
  exchangeForLongLivedToken,
  storeInstagramToken,
  storeFacebookPageToken,
  getInstagramToken,
  getFacebookPageToken,
} from '@/lib/instagram-token';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const igToken = await getInstagramToken();
  const fbToken = await getFacebookPageToken();

  // Check IG token status
  let igStatus: { valid: boolean; username?: string; accountId?: string; error?: string } = {
    valid: false,
    error: 'Geen token',
  };
  if (igToken) {
    igStatus = await checkTokenStatus();
  }

  // Check FB page token
  let fbStatus: { valid: boolean; pageName?: string; error?: string } = {
    valid: false,
    error: 'Geen token',
  };
  if (fbToken) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v21.0/me?fields=id,name&access_token=${encodeURIComponent(fbToken)}`,
      );
      const data = await res.json();
      if (data.error) {
        fbStatus = { valid: false, error: data.error.message };
      } else {
        fbStatus = { valid: true, pageName: data.name };
      }
    } catch (e) {
      fbStatus = { valid: false, error: e instanceof Error ? e.message : 'Onbekende fout' };
    }
  }

  return NextResponse.json({
    instagram: {
      hasToken: !!igToken,
      ...igStatus,
    },
    facebook: {
      hasToken: !!fbToken,
      ...fbStatus,
    },
  });
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { action, token } = await request.json();

  if (action === 'exchange' && token) {
    // Exchange short-lived token for long-lived
    const result = await exchangeForLongLivedToken(token);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Now get Page token from the long-lived user token
    const pageId = process.env.FACEBOOK_PAGE_ID;
    if (pageId && result.accessToken) {
      try {
        const pageRes = await fetch(
          `https://graph.facebook.com/v21.0/${pageId}?fields=access_token&access_token=${encodeURIComponent(result.accessToken)}`,
        );
        const pageData = await pageRes.json();
        if (pageData.access_token) {
          await storeFacebookPageToken(pageData.access_token);
          // Page token also works for Instagram API
          await storeInstagramToken(pageData.access_token);
          return NextResponse.json({
            success: true,
            message: 'Tokens vernieuwd. Page token opgeslagen (verloopt niet).',
            expiresIn: null, // Page tokens don't expire
          });
        }
      } catch {
        // Fall through - store user token instead
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Long-lived token opgeslagen (60 dagen geldig).',
      expiresIn: result.expiresIn,
    });
  }

  if (action === 'save-direct' && token) {
    // Save a token directly (e.g. a Page token that doesn't expire)
    await storeInstagramToken(token);
    await storeFacebookPageToken(token);
    return NextResponse.json({
      success: true,
      message: 'Token direct opgeslagen.',
    });
  }

  return NextResponse.json({ error: 'Ongeldige actie' }, { status: 400 });
}
