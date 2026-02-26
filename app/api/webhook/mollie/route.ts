import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';

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

  // Log payment status for now. In production, store this in a database
  // and use it to verify downloads.
  console.log(
    `[Mollie Webhook] Payment ${paymentId}: status=${payment.status}, ` +
    `course=${(payment.metadata as { slug?: string })?.slug}`
  );

  return NextResponse.json({ received: true });
}
