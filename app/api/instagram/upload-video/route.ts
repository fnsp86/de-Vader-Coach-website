import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { cacheVideoForInstagram } from '@/lib/instagram-video-cache';

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  try {
    const formData = await request.formData();
    const file = formData.get('video') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'Geen videobestand gevonden' }, { status: 400 });
    }

    // Validate file type
    const name = file.name.toLowerCase();
    if (!name.endsWith('.mp4') && !name.endsWith('.mov') && !name.endsWith('.webm')) {
      return NextResponse.json({ error: 'Alleen .mp4, .mov en .webm bestanden zijn toegestaan' }, { status: 400 });
    }

    // Validate file size (50MB)
    if (file.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { error: `Video te groot (${Math.round(file.size / 1024 / 1024)}MB). Maximum is 50MB.` },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const { url } = await cacheVideoForInstagram(buffer);

    return NextResponse.json({ success: true, videoUrl: url });
  } catch (e) {
    return NextResponse.json(
      { error: `Upload mislukt: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 },
    );
  }
}
