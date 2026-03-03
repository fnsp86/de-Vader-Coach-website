import { getRedis } from './newsletter';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface InvoiceData {
  invoiceNumber: string;
  paymentId: string;
  date: string;
  buyerEmail: string;
  buyerName: string;
  courseTitle: string;
  courseSlug: string;
  amount: string;
  originalAmount?: string;
  discountCode?: string;
  vatRate: number;
  vatAmount: string;
  subtotal: string;
}

function getCompanyDetails() {
  return {
    name: process.env.COMPANY_NAME || 'De Vadercoach',
    kvk: process.env.COMPANY_KVK || '',
    btw: process.env.COMPANY_BTW || '',
    email: process.env.COMPANY_EMAIL || 'info@devadercoach.nl',
  };
}

/**
 * Calculate VAT breakdown from a price that includes 21% BTW.
 */
export function calculateVat(amountIncl: number): { subtotal: string; vatAmount: string } {
  const subtotal = amountIncl / 1.21;
  const vatAmount = amountIncl - subtotal;
  return {
    subtotal: subtotal.toFixed(2),
    vatAmount: vatAmount.toFixed(2),
  };
}

/**
 * Generate a sequential invoice number using atomic Redis INCR.
 * Format: VC-{year}-{0001}
 */
export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const r = getRedis();
  if (!r) throw new Error('Redis not available for invoice numbering');

  const counter = await r.incr(`invoice:counter:${year}`);
  return `VC-${year}-${String(counter).padStart(4, '0')}`;
}

/**
 * Build InvoiceData from payment details.
 */
export function buildInvoiceData(params: {
  invoiceNumber: string;
  paymentId: string;
  buyerEmail: string;
  buyerName: string;
  courseTitle: string;
  courseSlug: string;
  amount: string;
  originalAmount?: string;
  discountCode?: string;
}): InvoiceData {
  const amountNum = parseFloat(params.amount);
  const { subtotal, vatAmount } = calculateVat(amountNum);

  return {
    invoiceNumber: params.invoiceNumber,
    paymentId: params.paymentId,
    date: new Date().toISOString(),
    buyerEmail: params.buyerEmail,
    buyerName: params.buyerName,
    courseTitle: params.courseTitle,
    courseSlug: params.courseSlug,
    amount: params.amount,
    originalAmount: params.originalAmount,
    discountCode: params.discountCode,
    vatRate: 21,
    vatAmount,
    subtotal,
  };
}

/**
 * Generate a professional invoice PDF using pdf-lib.
 */
export async function generateInvoicePdf(data: InvoiceData): Promise<Uint8Array> {
  const company = getCompanyDetails();
  const doc = await PDFDocument.create();
  const page = doc.addPage([595.28, 841.89]); // A4
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const { width, height } = page.getSize();

  const black = rgb(0.1, 0.1, 0.1);
  const gray = rgb(0.4, 0.4, 0.4);
  const lightGray = rgb(0.85, 0.85, 0.85);
  const amber = rgb(0.96, 0.62, 0.04);

  const margin = 50;
  let y = height - margin;

  // Helper: draw text
  const drawText = (text: string, x: number, yPos: number, options?: { font?: typeof font; size?: number; color?: typeof black }) => {
    page.drawText(text, {
      x,
      y: yPos,
      size: options?.size || 10,
      font: options?.font || font,
      color: options?.color || black,
    });
  };

  // Company name (top left)
  drawText(company.name, margin, y, { font: fontBold, size: 18, color: amber });
  y -= 20;

  // Company details
  if (company.email) {
    drawText(company.email, margin, y, { size: 9, color: gray });
    y -= 13;
  }
  if (company.kvk) {
    drawText(`KVK: ${company.kvk}`, margin, y, { size: 9, color: gray });
    y -= 13;
  }
  if (company.btw) {
    drawText(`BTW: ${company.btw}`, margin, y, { size: 9, color: gray });
    y -= 13;
  }

  // Invoice title (right side)
  const invoiceDate = new Date(data.date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const rightX = width - margin;
  const titleY = height - margin;

  drawText('FACTUUR', rightX - fontBold.widthOfTextAtSize('FACTUUR', 22), titleY, {
    font: fontBold,
    size: 22,
    color: black,
  });

  const numText = data.invoiceNumber;
  drawText(numText, rightX - font.widthOfTextAtSize(numText, 10), titleY - 28, {
    size: 10,
    color: gray,
  });

  const dateText = `Datum: ${invoiceDate}`;
  drawText(dateText, rightX - font.widthOfTextAtSize(dateText, 10), titleY - 42, {
    size: 10,
    color: gray,
  });

  // Separator line
  y -= 20;
  page.drawLine({
    start: { x: margin, y },
    end: { x: width - margin, y },
    thickness: 1,
    color: lightGray,
  });

  // Customer details
  y -= 30;
  drawText('Klantgegevens', margin, y, { font: fontBold, size: 11 });
  y -= 18;
  drawText(data.buyerName, margin, y, { size: 10 });
  y -= 15;
  drawText(data.buyerEmail, margin, y, { size: 10, color: gray });

  // Invoice table
  y -= 40;
  const colX = [margin, margin + 280, margin + 370, margin + 440];
  const tableWidth = width - 2 * margin;

  // Table header background
  page.drawRectangle({
    x: margin,
    y: y - 5,
    width: tableWidth,
    height: 22,
    color: rgb(0.95, 0.95, 0.95),
  });

  drawText('Omschrijving', colX[0] + 8, y, { font: fontBold, size: 9 });
  drawText('Aantal', colX[1] + 8, y, { font: fontBold, size: 9 });
  drawText('BTW', colX[2] + 8, y, { font: fontBold, size: 9 });
  drawText('Bedrag', colX[3] + 8, y, { font: fontBold, size: 9 });

  // Table row
  y -= 28;
  drawText(data.courseTitle, colX[0] + 8, y, { size: 10 });
  drawText('1', colX[1] + 8, y, { size: 10 });
  drawText(`${data.vatRate}%`, colX[2] + 8, y, { size: 10 });

  const amountText = `\u20AC ${parseFloat(data.amount).toFixed(2).replace('.', ',')}`;
  drawText(amountText, colX[3] + 8, y, { size: 10 });

  // Discount row (if applicable)
  if (data.discountCode && data.originalAmount) {
    y -= 20;
    drawText(`Korting (${data.discountCode})`, colX[0] + 8, y, { size: 10, color: gray });
    const discountAmount = parseFloat(data.originalAmount) - parseFloat(data.amount);
    const discountText = `- \u20AC ${discountAmount.toFixed(2).replace('.', ',')}`;
    drawText(discountText, colX[3] + 8, y, { size: 10, color: gray });
  }

  // Separator
  y -= 15;
  page.drawLine({
    start: { x: colX[2], y },
    end: { x: width - margin, y },
    thickness: 0.5,
    color: lightGray,
  });

  // Totals
  y -= 20;
  const totalsLabelX = colX[2] + 8;
  const totalsValueX = colX[3] + 8;

  drawText('Subtotaal', totalsLabelX, y, { size: 10, color: gray });
  drawText(`\u20AC ${parseFloat(data.subtotal).toFixed(2).replace('.', ',')}`, totalsValueX, y, { size: 10 });

  y -= 18;
  drawText(`BTW (${data.vatRate}%)`, totalsLabelX, y, { size: 10, color: gray });
  drawText(`\u20AC ${parseFloat(data.vatAmount).toFixed(2).replace('.', ',')}`, totalsValueX, y, { size: 10 });

  y -= 5;
  page.drawLine({
    start: { x: colX[2], y },
    end: { x: width - margin, y },
    thickness: 0.5,
    color: lightGray,
  });

  y -= 18;
  drawText('Totaal', totalsLabelX, y, { font: fontBold, size: 11 });
  drawText(`\u20AC ${parseFloat(data.amount).toFixed(2).replace('.', ',')}`, totalsValueX, y, {
    font: fontBold,
    size: 11,
  });

  // Payment status
  y -= 40;
  drawText('Status: Betaald', margin, y, { font: fontBold, size: 10, color: rgb(0.2, 0.7, 0.3) });

  const refText = `Mollie referentie: ${data.paymentId}`;
  drawText(refText, margin, y - 18, { size: 9, color: gray });

  // Footer
  const footerY = margin + 20;
  page.drawLine({
    start: { x: margin, y: footerY + 10 },
    end: { x: width - margin, y: footerY + 10 },
    thickness: 0.5,
    color: lightGray,
  });

  const footerText = `${company.name} - ${company.email}`;
  const footerWidth = font.widthOfTextAtSize(footerText, 8);
  drawText(footerText, (width - footerWidth) / 2, footerY - 5, { size: 8, color: gray });

  return doc.save();
}

/**
 * Save invoice data and PDF bytes to Redis.
 */
export async function saveInvoice(data: InvoiceData, pdfBytes: Uint8Array): Promise<void> {
  const r = getRedis();
  if (!r) throw new Error('Redis not available');

  const pipeline = r.pipeline();

  // Store invoice data
  pipeline.hset(`invoice:${data.invoiceNumber}`, {
    ...data,
    createdAt: new Date().toISOString(),
  });

  // Store PDF as base64
  pipeline.set(`invoice:pdf:${data.invoiceNumber}`, Buffer.from(pdfBytes).toString('base64'));

  // Payment -> invoice mapping (for idempotency)
  pipeline.set(`invoice:by-payment:${data.paymentId}`, data.invoiceNumber);

  // Add to sorted set for listing (score = timestamp)
  pipeline.zadd('invoice:all', Date.now(), data.invoiceNumber);

  await pipeline.exec();
}

/**
 * Get invoice data by invoice number.
 */
export async function getInvoice(invoiceNumber: string): Promise<InvoiceData | null> {
  const r = getRedis();
  if (!r) return null;

  const data = await r.hgetall(`invoice:${invoiceNumber}`);
  if (!data || !data.invoiceNumber) return null;

  return {
    invoiceNumber: data.invoiceNumber,
    paymentId: data.paymentId,
    date: data.date,
    buyerEmail: data.buyerEmail,
    buyerName: data.buyerName,
    courseTitle: data.courseTitle,
    courseSlug: data.courseSlug,
    amount: data.amount,
    originalAmount: data.originalAmount || undefined,
    discountCode: data.discountCode || undefined,
    vatRate: parseInt(data.vatRate) || 21,
    vatAmount: data.vatAmount,
    subtotal: data.subtotal,
  };
}

/**
 * Get invoice PDF bytes by invoice number.
 */
export async function getInvoicePdf(invoiceNumber: string): Promise<Buffer | null> {
  const r = getRedis();
  if (!r) return null;

  const base64 = await r.get(`invoice:pdf:${invoiceNumber}`);
  if (!base64) return null;

  return Buffer.from(base64, 'base64');
}

/**
 * Check if an invoice already exists for a payment (idempotency).
 */
export async function getInvoiceByPayment(paymentId: string): Promise<string | null> {
  const r = getRedis();
  if (!r) return null;

  return r.get(`invoice:by-payment:${paymentId}`);
}

/**
 * Get all invoices sorted by date (newest first).
 */
export async function getAllInvoices(): Promise<InvoiceData[]> {
  const r = getRedis();
  if (!r) return [];

  // Get all invoice numbers, newest first
  const numbers = await r.zrevrange('invoice:all', 0, -1);
  if (numbers.length === 0) return [];

  const pipeline = r.pipeline();
  for (const num of numbers) {
    pipeline.hgetall(`invoice:${num}`);
  }
  const results = await pipeline.exec();
  if (!results) return [];

  const invoices: InvoiceData[] = [];
  for (const [err, data] of results) {
    if (err || !data) continue;
    const d = data as Record<string, string>;
    if (!d.invoiceNumber) continue;
    invoices.push({
      invoiceNumber: d.invoiceNumber,
      paymentId: d.paymentId,
      date: d.date,
      buyerEmail: d.buyerEmail,
      buyerName: d.buyerName,
      courseTitle: d.courseTitle,
      courseSlug: d.courseSlug,
      amount: d.amount,
      originalAmount: d.originalAmount || undefined,
      discountCode: d.discountCode || undefined,
      vatRate: parseInt(d.vatRate) || 21,
      vatAmount: d.vatAmount,
      subtotal: d.subtotal,
    });
  }

  return invoices;
}
