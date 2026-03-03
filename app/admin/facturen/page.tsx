'use client';

import { useState, useEffect } from 'react';
import { useAdminPassword } from '@/components/AdminAuth';
import { Receipt, Download, Loader2 } from 'lucide-react';

interface Invoice {
  invoiceNumber: string;
  paymentId: string;
  date: string;
  buyerEmail: string;
  buyerName: string;
  courseTitle: string;
  amount: string;
  discountCode?: string;
}

export default function FacturenPage() {
  const password = useAdminPassword();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/invoices', {
      headers: { 'x-admin-password': password },
    })
      .then((r) => r.json())
      .then((data) => setInvoices(data.invoices || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [password]);

  function handleDownload(invoiceNumber: string) {
    const url = `/api/admin/invoices?download=${encodeURIComponent(invoiceNumber)}`;
    const a = document.createElement('a');
    a.href = url;
    // Use fetch with auth header, then create blob download
    fetch(url, {
      headers: { 'x-admin-password': password },
    })
      .then((r) => r.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `factuur-${invoiceNumber}.pdf`;
        link.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(() => alert('Download mislukt'));
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B15' }}>
          <Receipt className="h-5 w-5" style={{ color: '#F59E0B' }} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>Facturen</h1>
          <p className="text-sm" style={{ color: 'var(--text3)' }}>
            {invoices.length} facturen
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: 'var(--text3)' }} />
        </div>
      ) : invoices.length === 0 ? (
        <div
          className="rounded-2xl border p-8 text-center"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <Receipt className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--text3)' }} />
          <p className="text-sm font-medium" style={{ color: 'var(--text2)' }}>
            Nog geen facturen
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>
            Facturen worden automatisch aangemaakt bij elke betaling.
          </p>
        </div>
      ) : (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th className="text-left px-4 py-3 text-xs font-bold" style={{ color: 'var(--text3)' }}>
                  Factuur
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold" style={{ color: 'var(--text3)' }}>
                  Datum
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold" style={{ color: 'var(--text3)' }}>
                  Klant
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold" style={{ color: 'var(--text3)' }}>
                  Cursus
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold" style={{ color: 'var(--text3)' }}>
                  Bedrag
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold" style={{ color: 'var(--text3)' }}>
                  PDF
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr
                  key={inv.invoiceNumber}
                  className="hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <td className="px-4 py-3 font-mono text-xs font-bold" style={{ color: 'var(--amber-text)' }}>
                    {inv.invoiceNumber}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text2)' }}>
                    {new Date(inv.date).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium" style={{ color: 'var(--text)' }}>
                      {inv.buyerName}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--text3)' }}>
                      {inv.buyerEmail}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text2)' }}>
                    {inv.courseTitle}
                    {inv.discountCode && (
                      <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                        {inv.discountCode}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-right font-medium" style={{ color: 'var(--text)' }}>
                    &euro;{parseFloat(inv.amount).toFixed(2).replace('.', ',')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDownload(inv.invoiceNumber)}
                      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg transition-colors hover:opacity-80"
                      style={{ color: 'var(--amber-text)' }}
                      title="Download factuur PDF"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
