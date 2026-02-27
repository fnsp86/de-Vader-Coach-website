import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getAnalytics } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  const days = parseInt(request.nextUrl.searchParams.get('days') ?? '30', 10);
  const data = await getAnalytics(Math.min(days, 90));

  if (!data) {
    return NextResponse.json(
      { error: 'Analytics niet geconfigureerd. Koppel een Redis database in Vercel.' },
      { status: 503 }
    );
  }

  return NextResponse.json(data);
}
