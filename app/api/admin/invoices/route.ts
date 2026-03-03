import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getAllInvoices, getInvoicePdf } from '@/lib/invoice';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const invoiceNumber = request.nextUrl.searchParams.get('download');

  // Download a specific invoice PDF
  if (invoiceNumber) {
    if (!/^VC-\d{4}-\d{4,}$/.test(invoiceNumber)) {
      return NextResponse.json({ error: 'Invalid invoice number' }, { status: 400 });
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

  // List all invoices
  const invoices = await getAllInvoices();
  return NextResponse.json({ invoices });
}
