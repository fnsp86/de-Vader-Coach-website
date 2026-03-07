import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse, is2FAEnabled, hashPassword, verifyPasswordHash } from '@/lib/admin-auth';
import { getTOTPUri, generateSecret } from '@/lib/totp';
import { checkRateLimit } from '@/lib/rate-limit';
import Redis from 'ioredis';

let redis: Redis | null = null;
function getRedis(): Redis | null {
  if (redis) return redis;
  const url = process.env.REDIS_URL;
  if (!url) return null;
  redis = new Redis(url, { maxRetriesPerRequest: 1, lazyConnect: true });
  return redis;
}

// GET: get current settings status
export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  return NextResponse.json({
    is2FAEnabled: is2FAEnabled(),
  });
}

// POST: update settings (change password or generate 2FA secret)
export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const rateLimited = checkRateLimit(request, { maxRequests: 5, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  const { action, newPassword, currentPassword } = await request.json();

  if (action === 'change-password') {
    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Wachtwoord moet minimaal 8 tekens zijn.' },
        { status: 400 },
      );
    }

    if (!currentPassword || typeof currentPassword !== 'string') {
      return NextResponse.json(
        { error: 'Huidig wachtwoord is vereist.' },
        { status: 400 },
      );
    }

    const r = getRedis();
    if (!r) {
      return NextResponse.json(
        { error: 'Redis niet beschikbaar. Wijzig ADMIN_PASSWORD in Vercel Environment Variables.' },
        { status: 500 },
      );
    }

    // Verify the current password explicitly (not just from auth header)
    const storedHash = await r.get('admin:password_hash');
    if (storedHash) {
      if (!verifyPasswordHash(currentPassword, storedHash)) {
        return NextResponse.json({ error: 'Huidig wachtwoord is onjuist.' }, { status: 403 });
      }
    } else {
      // Fallback: verify against env var
      const envPassword = process.env.ADMIN_PASSWORD;
      if (!envPassword || currentPassword !== envPassword) {
        return NextResponse.json({ error: 'Huidig wachtwoord is onjuist.' }, { status: 403 });
      }
    }

    // Store hashed password in Redis (overrides env var)
    await r.set('admin:password_hash', hashPassword(newPassword));
    // Remove any legacy plaintext password
    await r.del('admin:password');
    return NextResponse.json({ success: true, message: 'Wachtwoord gewijzigd. Log opnieuw in.' });
  }

  if (action === 'generate-totp-secret') {
    const secret = generateSecret();
    const uri = getTOTPUri(secret, 'admin@devadercoach.nl');
    return NextResponse.json({
      secret,
      uri,
      instructions: 'Sla deze secret op als ADMIN_TOTP_SECRET in Vercel Environment Variables en in .env.local',
    });
  }

  return NextResponse.json({ error: 'Onbekende actie' }, { status: 400 });
}
