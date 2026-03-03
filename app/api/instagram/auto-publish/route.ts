import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { isAutoPublishEnabled, setAutoPublishEnabled, getAutoPublishStatus } from '@/lib/instagram-auto-publish';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const status = await getAutoPublishStatus();
  return NextResponse.json(status);
}

export async function PATCH(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const { enabled } = await request.json();
  if (typeof enabled !== 'boolean') {
    return NextResponse.json({ error: 'enabled (boolean) is verplicht' }, { status: 400 });
  }

  await setAutoPublishEnabled(enabled);
  return NextResponse.json({ success: true, enabled });
}
