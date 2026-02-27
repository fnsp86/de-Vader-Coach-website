import { NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/newsletter';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'E-mailadres is verplicht.' }, { status: 400 });
    }

    // Store subscriber in Redis for newsletter
    await addSubscriber(email, 'snelgids');

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ success: true });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    // Send notification to yourself
    await resend.emails.send({
      from: 'De Vadercoach <noreply@devadercoach.nl>',
      to: 'info@devadercoach.nl',
      subject: `Nieuwe snelgids download: ${email}`,
      text: `Iemand heeft de gratis snelgids gedownload.\n\nE-mailadres: ${email}\nTijdstip: ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}
