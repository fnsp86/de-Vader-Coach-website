import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { sendNewsletter, getSentNewsletters, wrapInEmailTemplate } from '@/lib/newsletter';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();
  const newsletters = await getSentNewsletters();
  return NextResponse.json({ newsletters });
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { subject, content, wrapTemplate } = await request.json();

  if (!subject || !content) {
    return NextResponse.json({ error: 'Onderwerp en inhoud zijn verplicht' }, { status: 400 });
  }

  const html = wrapTemplate !== false ? wrapInEmailTemplate(content) : content;
  const result = await sendNewsletter(subject, html);
  return NextResponse.json(result);
}
