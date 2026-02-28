import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { markDiscountUsed } from '@/lib/discount';
import { checkRateLimit } from '@/lib/rate-limit';

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
    // Always verify with Mollie API (this is Mollie's security model —
    // the webhook only tells us to check, we verify the actual status ourselves)
    const mollieClient = createMollieClient({ apiKey });
    const payment = await mollieClient.payments.get(paymentId);

    const metadata = payment.metadata as { slug?: string; discountCode?: string } | undefined;

    console.log(
      `[Mollie Webhook] Payment ${paymentId}: status=${payment.status}, ` +
      `course=${metadata?.slug}`
    );

    // Mark discount code as used after successful payment
    if (payment.status === 'paid' && metadata?.discountCode) {
      try {
        await markDiscountUsed(metadata.discountCode);
        console.log(`[Mollie Webhook] Discount ${metadata.discountCode} marked as used`);
      } catch (e) {
        console.error(`[Mollie Webhook] Failed to mark discount as used:`, e);
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error(`[Mollie Webhook] Error processing payment ${paymentId}:`, e);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
