import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  if (!(await verifyAdminAuth(request))) return unauthorizedResponse();

  const apiKey = process.env.MOLLIE_API_KEY;
  let payments: { total: number; revenue: number; recent: Array<{ id: string; amount: string; description: string; status: string; createdAt: string }> } = {
    total: 0,
    revenue: 0,
    recent: [],
  };

  if (apiKey) {
    try {
      const { createMollieClient } = await import('@mollie/api-client');
      const mollieClient = createMollieClient({ apiKey });
      const paymentList = await mollieClient.payments.page({ limit: 50 });

      const paid: typeof payments.recent = [];
      let revenue = 0;
      for (const p of paymentList) {
        if (p.status === 'paid') {
          revenue += parseFloat(p.amount.value);
          if (paid.length < 10) {
            paid.push({
              id: p.id,
              amount: p.amount.value,
              description: p.description ?? '',
              status: p.status,
              createdAt: p.createdAt ?? '',
            });
          }
        }
      }
      payments = { total: paid.length, revenue, recent: paid.slice(0, 5) };
    } catch (e) {
      console.warn('[admin/stats] Mollie error:', e);
    }
  }

  return NextResponse.json({ payments });
}
