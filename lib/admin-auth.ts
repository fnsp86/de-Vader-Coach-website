import { NextRequest, NextResponse } from 'next/server';

export function verifyAdminAuth(request: NextRequest): boolean {
  const password = request.headers.get('x-admin-password');
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !password) return false;
  return password === adminPassword;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
