import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { getCourse } from '@/lib/courses';
import { validateDiscount } from '@/lib/discount';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, { maxRequests: 10, windowMs: 60_000 });
  if (rateLimited) return rateLimited;
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Payment not configured' }, { status: 500 });
  }

  const { slug, discountCode } = await request.json();
  const course = getCourse(slug);

  if (!course || course.status !== 'available' || !course.pdfPath) {
    return NextResponse.json({ error: 'Course not available' }, { status: 400 });
  }

  let finalPrice = course.price;
  let appliedDiscount: string | undefined;

  // Validate discount code if provided
  if (discountCode && typeof discountCode === 'string') {
    const result = await validateDiscount(discountCode.trim().toUpperCase());
    if (result.valid && result.discount) {
      // Badge reward codes are only valid for individual courses, not bundles/experience
      const isBadgeReward = result.discount.source?.startsWith('badge:');
      const isBundle = slug === 'compleet-vaderpakket' || slug === 'experience';
      if (isBadgeReward && isBundle) {
        return NextResponse.json(
          { error: 'Deze kortingscode is alleen geldig op losse cursussen.' },
          { status: 400 },
        );
      }
      finalPrice = Math.round((course.price * (1 - result.discount.percentOff / 100)) * 100) / 100;
      appliedDiscount = result.discount.code;
    }
  }

  // Ensure minimum price of €0.01
  if (finalPrice < 0.01) finalPrice = 0.01;

  const mollieClient = createMollieClient({ apiKey });
  const baseUrl = request.nextUrl.origin;

  const payment = await mollieClient.payments.create({
    amount: {
      currency: 'EUR',
      value: finalPrice.toFixed(2),
    },
    description: appliedDiscount
      ? `${course.title} (korting: ${appliedDiscount})`
      : course.title,
    redirectUrl: `${baseUrl}/cursussen/bedankt?slug=${slug}`,
    webhookUrl: `${baseUrl}/api/webhook/mollie`,
    metadata: {
      slug,
      courseTitle: course.title,
      discountCode: appliedDiscount || '',
      originalPrice: course.price.toFixed(2),
    },
  });

  return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
}
