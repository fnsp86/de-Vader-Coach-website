import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getSubscribers, removeSubscriber, addSubscriber } from '@/lib/newsletter';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();
  const subscribers = await getSubscribers();
  return NextResponse.json({ subscribers });
}

export async function POST(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();
  const { email, source } = await request.json();
  if (!email) return NextResponse.json({ error: 'E-mail is verplicht' }, { status: 400 });
  await addSubscriber(email, source || 'handmatig');
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();
  const { email } = await request.json();
  if (!email) return NextResponse.json({ error: 'E-mail is verplicht' }, { status: 400 });
  await removeSubscriber(email);
  return NextResponse.json({ success: true });
}
