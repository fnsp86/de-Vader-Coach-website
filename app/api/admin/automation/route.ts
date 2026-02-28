import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';
import { getAutomationLog } from '@/lib/newsletter';
import { getAllDripStatuses } from '@/lib/automation';

export async function GET(request: NextRequest) {
  if (!verifyAdminAuth(request)) return unauthorizedResponse();

  const [dripStatuses, log] = await Promise.all([
    getAllDripStatuses(),
    getAutomationLog(),
  ]);

  return NextResponse.json({ dripStatuses, log });
}
