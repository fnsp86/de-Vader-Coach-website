import type { InvoiceData } from './invoice';
import { wrapInEmailTemplate } from './newsletter';

/**
 * Send an invoice email with the PDF as attachment via Resend.
 */
export async function sendInvoiceEmail(data: InvoiceData, pdfBytes: Uint8Array): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY niet geconfigureerd');

  const { Resend } = await import('resend');
  const resend = new Resend(apiKey);

  const invoiceDate = new Date(data.date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const bodyHtml = `
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:700;color:#ffffff;">
      Bedankt voor je aankoop!
    </h2>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#cccccc;">
      Hierbij ontvang je de factuur voor je aankoop van <strong style="color:#ffffff;">${data.courseTitle}</strong>.
    </p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;border-collapse:collapse;">
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#999;">Factuurnummer</td>
        <td style="padding:8px 0;font-size:13px;color:#fff;text-align:right;">${data.invoiceNumber}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#999;">Datum</td>
        <td style="padding:8px 0;font-size:13px;color:#fff;text-align:right;">${invoiceDate}</td>
      </tr>
      <tr>
        <td style="padding:8px 0;font-size:13px;color:#999;border-top:1px solid #333;">Totaal</td>
        <td style="padding:8px 0;font-size:16px;font-weight:700;color:#F59E0B;text-align:right;border-top:1px solid #333;">
          &euro;${parseFloat(data.amount).toFixed(2).replace('.', ',')}
        </td>
      </tr>
    </table>
    <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#999;">
      De factuur is als PDF bijgevoegd bij deze e-mail.
    </p>
  `;

  const html = wrapInEmailTemplate(
    bodyHtml,
    `Factuur ${data.invoiceNumber} - De Vadercoach`,
  );

  await resend.emails.send({
    from: 'De Vadercoach <noreply@devadercoach.nl>',
    to: data.buyerEmail,
    subject: `Je factuur van De Vadercoach - ${data.invoiceNumber}`,
    html,
    attachments: [
      {
        filename: `factuur-${data.invoiceNumber}.pdf`,
        content: Buffer.from(pdfBytes),
      },
    ],
  });
}
