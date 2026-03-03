import { NextResponse } from 'next/server';

export async function GET() {
  // Temporary: no auth for diagnostics (read-only, no writes)

  const pageId = process.env.FACEBOOK_PAGE_ID;
  const pageToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (!pageId || !pageToken) {
    return NextResponse.json({
      ok: false,
      error: 'FACEBOOK_PAGE_ID of FACEBOOK_PAGE_ACCESS_TOKEN ontbreekt',
      hasPageId: !!pageId,
      hasPageToken: !!pageToken,
    });
  }

  try {
    // Test: haal pagina-info op (geen schrijfactie)
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}?fields=name,id,access_token&access_token=${pageToken}`,
    );
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({
        ok: false,
        error: data.error.message,
        errorType: data.error.type,
        errorCode: data.error.code,
      });
    }

    // Test permissies
    const permRes = await fetch(
      `https://graph.facebook.com/v21.0/${pageId}/permissions?access_token=${pageToken}`,
    );
    const permData = await permRes.json();

    return NextResponse.json({
      ok: true,
      pageName: data.name,
      pageId: data.id,
      permissions: permData.data ?? permData.error?.message ?? 'onbekend',
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    });
  }
}
