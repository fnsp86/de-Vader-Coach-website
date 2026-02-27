import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getAnalytics } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  const days = parseInt(request.nextUrl.searchParams.get('days') ?? '30', 10);

  try {
    const data = await getAnalytics(Math.min(days, 90));

    if (!data) {
      const hasRedisUrl = !!process.env.REDIS_URL;
      return NextResponse.json(
        {
          error: `Analytics niet geconfigureerd. REDIS_URL ${hasRedisUrl ? 'is set' : 'is MISSING'}.`,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: `Analytics error: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 }
    );
  }
}
