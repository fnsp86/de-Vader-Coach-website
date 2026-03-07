import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const rateLimited = checkRateLimit(request, { maxRequests: 10, windowMs: 60_000 });
  if (rateLimited) return rateLimited;
  const pdfPath = join(process.cwd(), 'public', 'cursussen', 'snelgids-8-vadervaardigheden.pdf');

  try {
    const pdfBuffer = await readFile(pdfPath);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="De-8-Vadervaardigheden-Snelgids.pdf"',
      },
    });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
