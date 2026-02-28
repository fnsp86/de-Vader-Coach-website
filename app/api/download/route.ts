import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { getCourse } from '@/lib/courses';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Add a subtle watermark to the bottom of every page with the buyer's info.
 * The text is placed in the footer area — never overlapping content.
 */
async function addWatermark(pdfBytes: Buffer, buyerName: string, buyerEmail: string): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  const text = buyerEmail
    ? `Licentie: ${buyerName} · ${buyerEmail}`
    : `Licentie: ${buyerName} · ${new Date().toLocaleDateString('nl-NL')}`;
  const fontSize = 7;

  for (const page of pages) {
    const { width } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    page.drawText(text, {
      x: (width - textWidth) / 2,
      y: 12,
      size: fontSize,
      font,
      color: rgb(0.7, 0.7, 0.7),
    });
  }

  return pdfDoc.save();
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const paymentId = request.nextUrl.searchParams.get('paymentId');
  const slug = request.nextUrl.searchParams.get('slug');

  if (!paymentId || !slug) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const course = getCourse(slug);
  if (!course || !course.pdfPath) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  // Verify payment with Mollie
  const mollieClient = createMollieClient({ apiKey });
  const payment = await mollieClient.payments.get(paymentId);

  if (payment.status !== 'paid') {
    return NextResponse.json({ error: 'Payment not completed' }, { status: 403 });
  }

  // Verify the payment is for this course
  const metadata = payment.metadata as { slug?: string };
  if (metadata?.slug !== slug) {
    return NextResponse.json({ error: 'Payment mismatch' }, { status: 403 });
  }

  // Read the original PDF
  const pdfPath = join(process.cwd(), 'public', course.pdfPath);
  const pdfBuffer = await readFile(pdfPath);
  const filename = course.pdfPath.split('/').pop() || 'cursus.pdf';

  // Get buyer info from payment — Mollie provides consumerName for iDEAL/bank payments
  const details = payment.details as Record<string, string> | undefined;
  const buyerName = details?.consumerName || 'Koper';
  const buyerEmail = (payment.metadata as Record<string, string>)?.buyerEmail || '';

  // Add watermark with buyer info
  let outputPdf: Uint8Array | Buffer;
  try {
    outputPdf = await addWatermark(pdfBuffer, buyerName, buyerEmail);
  } catch (e) {
    console.warn('[download] Watermark failed, serving original:', e);
    outputPdf = pdfBuffer;
  }

  return new NextResponse(Buffer.from(outputPdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
