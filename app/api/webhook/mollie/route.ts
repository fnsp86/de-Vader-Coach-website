import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { markDiscountUsed } from '@/lib/discount';

export async function POST(request: NextRequest) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const body = await request.formData();
  const paymentId = body.get('id') as string;

  if (!paymentId) {
    return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 });
  }

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
}
