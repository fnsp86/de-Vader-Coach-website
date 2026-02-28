import { NextResponse } from 'next/server';
import { addSubscriber, sendEmail, wrapInEmailTemplate, getUnsubscribeUrl, logAutomation } from '@/lib/newsletter';
import { createDiscount } from '@/lib/discount';
import { scheduleDrip } from '@/lib/automation';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'E-mailadres is verplicht.' }, { status: 400 });
    }

    // Store subscriber in Redis (returns unsubscribe token)
    const unsubToken = await addSubscriber(email, 'snelgids');
    const unsubUrl = unsubToken ? getUnsubscribeUrl(unsubToken) : '';

    // Generate personal discount code (15%, 30 days)
    const discount = await createDiscount(email);

    // Schedule drip email sequence
    await scheduleDrip(email);

    // Send welcome email
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      try {
        const welcomeHtml = generateWelcomeEmail(discount?.code, unsubUrl);
        const fullHtml = wrapInEmailTemplate(welcomeHtml, 'Welkom bij De Vadercoach! Hier is je snelgids + persoonlijke korting.', unsubUrl);
        await sendEmail(email, 'Welkom! Hier is je gratis snelgids 📖', fullHtml, unsubUrl);

        await logAutomation({
          type: 'welcome',
          email: email.toLowerCase().trim(),
          subject: 'Welkomstmail',
          sentAt: new Date().toISOString(),
          success: true,
        });
      } catch (e) {
        await logAutomation({
          type: 'welcome',
          email: email.toLowerCase().trim(),
          subject: 'Welkomstmail',
          sentAt: new Date().toISOString(),
          success: false,
          error: e instanceof Error ? e.message : String(e),
        });
      }

      // Send notification to admin (fire and forget)
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: 'De Vadercoach <noreply@devadercoach.nl>',
          to: 'info@devadercoach.nl',
          subject: `Nieuwe snelgids download: ${email}`,
          text: `Iemand heeft de gratis snelgids gedownload.\n\nE-mailadres: ${email}\nKortingscode: ${discount?.code || 'geen'}\nTijdstip: ${new Date().toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam' })}`,
        });
      } catch {
        // Admin notification is non-critical
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: true });
  }
}

function generateWelcomeEmail(discountCode?: string, unsubUrl?: string): string {
  return `
    <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
      Welkom bij De Vadercoach!
    </p>
    <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
      Goed bezig, je hebt de eerste stap gezet. Hieronder kun je de <strong style="color:#F0F2F8">Snelgids</strong> downloaden:
    </p>
    <p style="margin:0 0 24px;text-align:center;">
      <a href="https://devadercoach.nl/snelgids-emotiecoaching.pdf" style="display:inline-block;padding:14px 28px;background-color:#F59E0B;color:#000;font-weight:700;font-size:14px;text-decoration:none;border-radius:12px;">Download je snelgids</a>
    </p>
    ${discountCode ? `
    <div style="background-color:#111;border-radius:12px;padding:20px;margin:20px 0;border:1px solid #2A2A2A;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#F59E0B;text-transform:uppercase;letter-spacing:1px;">
        Jouw persoonlijke welkomstkorting
      </p>
      <p style="margin:0 0 8px;font-size:15px;color:#ccc;line-height:1.7;">
        Als welkomstcadeau krijg je <strong style="color:#F0F2F8">15% korting</strong> op alle cursussen. Geldig voor 30 dagen.
      </p>
      <div style="text-align:center;margin:16px 0 8px;">
        <span style="display:inline-block;padding:12px 24px;background-color:#F59E0B15;border:2px dashed #F59E0B;border-radius:12px;font-size:20px;font-weight:800;color:#F59E0B;letter-spacing:2px;">${discountCode}</span>
      </div>
      <p style="margin:8px 0 0;font-size:12px;color:#888;text-align:center;">
        Gebruik deze code bij het afrekenen
      </p>
    </div>
    ` : ''}
    <p style="margin:0 0 16px;font-size:15px;color:#ccc;line-height:1.7;">
      De komende weken ontvang je af en toe een mail met praktische tips over vaderschap. Geen spam, alleen dingen die er echt toe doen.
    </p>
    <p style="margin:0 0 8px;font-size:15px;color:#ccc;line-height:1.7;">
      Wil je alvast rondkijken? Bekijk de cursussen en de Vader Experience.
    </p>
    <p style="margin:0 0 4px;">
      <a href="https://devadercoach.nl/cursussen" style="display:inline-block;padding:10px 20px;background-color:#F59E0B;color:#000;font-weight:700;font-size:13px;text-decoration:none;border-radius:10px;">Bekijk cursussen</a>
      <a href="https://devadercoach.nl/experience" style="display:inline-block;padding:10px 20px;background-color:transparent;color:#F59E0B;font-weight:700;font-size:13px;text-decoration:none;border-radius:10px;border:1px solid #F59E0B;margin-left:8px;">Vader Experience</a>
    </p>
    <p style="margin:24px 0 0;font-size:13px;color:#888;">
      Groet,<br>De Vadercoach
    </p>
  `;
}
