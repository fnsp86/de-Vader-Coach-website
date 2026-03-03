import { NextRequest, NextResponse } from 'next/server';
import { getInvoice, getInvoicePdf } from '@/lib/invoice';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const rateLimited = checkRateLimit(request, { maxRequests: 20, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const invoiceNumber = request.nextUrl.searchParams.get('invoiceNumber');
  const paymentId = request.nextUrl.searchParams.get('paymentId');

  if (!invoiceNumber || !paymentId) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  // Validate invoice number format
  if (!/^VC-\d{4}-\d{4,}$/.test(invoiceNumber)) {
    return NextResponse.json({ error: 'Invalid invoice number' }, { status: 400 });
  }

  const invoice = await getInvoice(invoiceNumber);
  if (!invoice) {
    return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
  }

  // Verify the payment ID matches (access control)
  if (invoice.paymentId !== paymentId) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  const pdfBytes = await getInvoicePdf(invoiceNumber);
  if (!pdfBytes) {
    return NextResponse.json({ error: 'Invoice PDF not found' }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="factuur-${invoiceNumber}.pdf"`,
    },
  });
}
