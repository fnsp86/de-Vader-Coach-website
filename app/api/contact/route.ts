import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { isValidEmail, sanitizeForEmail } from '@/lib/validation';

export async function POST(request: NextRequest) {
  const rateLimited = checkRateLimit(request, { maxRequests: 3, windowMs: 60_000 });
  if (rateLimited) return rateLimited;

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Alle velden zijn verplicht.' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Ongeldig e-mailadres.' }, { status: 400 });
    }

    // Limit input lengths to prevent abuse
    const safeName = sanitizeForEmail(String(name).slice(0, 200));
    const safeMessage = sanitizeForEmail(String(message).slice(0, 5000));

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'E-mail service is nog niet geconfigureerd.' }, { status: 500 });
    }

    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'De Vadercoach <noreply@devadercoach.nl>',
      to: 'info@devadercoach.nl',
      replyTo: email,
      subject: `Contactformulier: ${safeName}`,
      text: `Naam: ${safeName}\nE-mail: ${email}\n\nBericht:\n${safeMessage}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Er ging iets mis. Probeer het later opnieuw.' }, { status: 500 });
  }
}
