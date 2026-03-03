import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { markDiscountUsed } from '@/lib/discount';
import { checkRateLimit } from '@/lib/rate-limit';
import {
  getInvoiceByPayment,
  generateInvoiceNumber,
  buildInvoiceData,
  generateInvoicePdf,
  saveInvoice,
} from '@/lib/invoice';
import { sendInvoiceEmail } from '@/lib/invoice-email';

export async function POST(request: NextRequest) {
  // Rate limit: max 30 webhook calls per minute per IP
  const rateLimited = checkRateLimit(request, { maxRequests: 30, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const body = await request.formData();
  const paymentId = body.get('id') as string;

  // Validate payment ID format (Mollie IDs start with 'tr_')
  if (!paymentId || !/^tr_[a-zA-Z0-9]+$/.test(paymentId)) {
    return NextResponse.json({ error: 'Invalid payment ID' }, { status: 400 });
  }

  try {
    // Always verify with Mollie API (this is Mollie's security model -
    // the webhook only tells us to check, we verify the actual status ourselves)
    const mollieClient = createMollieClient({ apiKey });
    const payment = await mollieClient.payments.get(paymentId);

    const metadata = payment.metadata as {
      slug?: string;
      courseTitle?: string;
      discountCode?: string;
      originalPrice?: string;
      buyerEmail?: string;
    } | undefined;

    console.log(
      `[Mollie Webhook] Payment ${paymentId}: status=${payment.status}, ` +
      `course=${metadata?.slug}`
    );

    if (payment.status === 'paid') {
      // Mark discount code as used
      if (metadata?.discountCode) {
        try {
          await markDiscountUsed(metadata.discountCode);
          console.log(`[Mollie Webhook] Discount ${metadata.discountCode} marked as used`);
        } catch (e) {
          console.error(`[Mollie Webhook] Failed to mark discount as used:`, e);
        }
      }

      // Generate invoice (with idempotency check)
      try {
        const existingInvoice = await getInvoiceByPayment(paymentId);
        if (existingInvoice) {
          console.log(`[Mollie Webhook] Invoice ${existingInvoice} already exists for ${paymentId}, skipping`);
        } else {
          const buyerEmail = metadata?.buyerEmail || '';
          if (buyerEmail) {
            const details = payment.details as Record<string, string> | undefined;
            const buyerName = details?.consumerName || 'Klant';

            const invoiceNumber = await generateInvoiceNumber();
            const invoiceData = buildInvoiceData({
              invoiceNumber,
              paymentId,
              buyerEmail,
              buyerName,
              courseTitle: metadata?.courseTitle || 'Cursus',
              courseSlug: metadata?.slug || '',
              amount: payment.amount.value,
              originalAmount: metadata?.originalPrice,
              discountCode: metadata?.discountCode || undefined,
            });

            const pdfBytes = await generateInvoicePdf(invoiceData);
            await saveInvoice(invoiceData, pdfBytes);

            console.log(`[Mollie Webhook] Invoice ${invoiceNumber} generated for ${paymentId}`);

            // Send invoice email
            try {
              await sendInvoiceEmail(invoiceData, pdfBytes);
              console.log(`[Mollie Webhook] Invoice email sent to ${buyerEmail}`);
            } catch (emailErr) {
              console.error(`[Mollie Webhook] Failed to send invoice email:`, emailErr);
            }
          } else {
            console.log(`[Mollie Webhook] No buyer email for ${paymentId}, skipping invoice`);
          }
        }
      } catch (invoiceErr) {
        console.error(`[Mollie Webhook] Invoice generation failed:`, invoiceErr);
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error(`[Mollie Webhook] Error processing payment ${paymentId}:`, e);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
