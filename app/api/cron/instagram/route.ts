import { NextRequest, NextResponse } from 'next/server';

// Redirects to the combined automation cron
// Instagram publishing is now handled by /api/cron/automation
export async function GET(request: NextRequest) {
  const url = new URL('/api/cron/automation', request.url);
  const res = await fetch(url.toString(), {
    headers: { authorization: request.headers.get('authorization') || '' },
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
