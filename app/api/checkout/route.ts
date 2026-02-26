import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { getCourse } from '@/lib/courses';

export async function POST(request: NextRequest) {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Payment not configured' }, { status: 500 });
  }

  const { slug } = await request.json();
  const course = getCourse(slug);

  if (!course || course.status !== 'available' || !course.pdfPath) {
    return NextResponse.json({ error: 'Course not available' }, { status: 400 });
  }

  const mollieClient = createMollieClient({ apiKey });

  const baseUrl = request.nextUrl.origin;

  const payment = await mollieClient.payments.create({
    amount: {
      currency: 'EUR',
      value: course.price.toFixed(2),
    },
    description: course.title,
    redirectUrl: `${baseUrl}/cursussen/bedankt?slug=${slug}`,
    webhookUrl: `${baseUrl}/api/webhook/mollie`,
    metadata: {
      slug,
      courseTitle: course.title,
    },
  });

  return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
}
