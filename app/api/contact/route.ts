import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Alle velden zijn verplicht.' }, { status: 400 });
    }

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
      subject: `Contactformulier: ${name}`,
      text: `Naam: ${name}\nE-mail: ${email}\n\nBericht:\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Er ging iets mis. Probeer het later opnieuw.' }, { status: 500 });
  }
}
