import { NextRequest, NextResponse } from 'next/server';
import { getVideoFromCache } from '@/lib/instagram-video-cache';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  if (!id || !/^[a-f0-9-]+$/.test(id)) {
    return NextResponse.json({ error: 'invalid id' }, { status: 400 });
  }

  try {
    const result = await getVideoFromCache(id);
    if (!result) {
      return NextResponse.json({ error: 'video niet gevonden' }, { status: 404 });
    }

    return new NextResponse(new Uint8Array(result.buffer), {
      headers: {
        'Content-Type': result.contentType,
        'Content-Length': result.buffer.length.toString(),
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: 'serve error', message: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}
