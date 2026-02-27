import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { headers } from 'next/headers';

const TOKENS_DIR = path.join(process.cwd(), 'data', 'experience-tokens');
const ACTIVATION_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 uur

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Token is vereist.' }, { status: 400 });
    }

    // Haal IP-adres op
    const headersList = await headers();
    const ip =
      headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headersList.get('x-real-ip') ||
      'unknown';

    const tokenPath = path.join(TOKENS_DIR, `${token}.json`);

    try {
      const raw = await fs.readFile(tokenPath, 'utf-8');
      const data = JSON.parse(raw);

      // Check of het token al geactiveerd is
      if (data.activated) {
        // Token is al eerder geactiveerd - check of het hetzelfde apparaat/IP is
        if (data.activatedIp === ip) {
          // Zelfde IP, sta toe (bijv. browser cache geleegd)
          return NextResponse.json({ success: true, email: data.email });
        }

        // Ander IP - niet toestaan
        return NextResponse.json(
          { error: 'Deze link is al op een ander apparaat geactiveerd.' },
          { status: 403 }
        );
      }

      // Check of het token verlopen is (24 uur na aanmaken)
      const createdAt = new Date(data.createdAt).getTime();
      const now = Date.now();

      if (now - createdAt > ACTIVATION_WINDOW_MS) {
        return NextResponse.json(
          { error: 'Deze link is verlopen. Neem contact op via info@devadercoach.nl voor een nieuwe link.' },
          { status: 410 }
        );
      }

      // Activeer het token
      data.activated = true;
      data.activatedAt = new Date().toISOString();
      data.activatedIp = ip;
      await fs.writeFile(tokenPath, JSON.stringify(data, null, 2));

      return NextResponse.json({ success: true, email: data.email });
    } catch {
      return NextResponse.json({ error: 'Ongeldig token.' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ error: 'Er ging iets mis.' }, { status: 500 });
  }
}
