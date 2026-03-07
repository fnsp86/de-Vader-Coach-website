import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeByToken } from '@/lib/newsletter';
import { checkRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  const rateLimited = checkRateLimit(request, { maxRequests: 10, windowMs: 60_000 });
  if (rateLimited) return rateLimited;
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Token ontbreekt' }, { status: 400 });
  }

  const email = await unsubscribeByToken(token);

  if (!email) {
    return NextResponse.json({ error: 'Ongeldige of verlopen link' }, { status: 404 });
  }

  // Mask email for privacy: f***@gmail.com
  const [local, domain] = email.split('@');
  const masked = local[0] + '***@' + domain;

  return NextResponse.json({ success: true, email: masked });
}
