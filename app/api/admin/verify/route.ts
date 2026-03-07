import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminLogin, unauthorizedResponse, is2FAEnabled } from '@/lib/admin-auth';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  // Rate limit login attempts: max 20 per minute (navigating admin pages re-verifies)
  const rateLimited = checkRateLimit(request, { maxRequests: 20, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  if (!(await verifyAdminLogin(request))) {
    return unauthorizedResponse();
  }
  return NextResponse.json({ success: true });
}

// GET: check if 2FA is required (no auth needed)
export async function GET() {
  return NextResponse.json({ requires2FA: is2FAEnabled() });
}
