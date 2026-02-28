'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

function UitschrijvenContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [maskedEmail, setMaskedEmail] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    fetch(`/api/unsubscribe?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMaskedEmail(data.email);
          setStatus('success');
        } else {
          setStatus('error');
        }
      })
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      {status === 'loading' && (
        <>
          <Loader2 className="h-10 w-10 mx-auto mb-4 animate-spin" style={{ color: 'var(--text3)' }} />
          <p className="text-sm" style={{ color: 'var(--text2)' }}>Even geduld...</p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle className="h-12 w-12 mx-auto mb-4 text-emerald-400" />
          <h1 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
            Uitgeschreven
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text2)' }}>
            {maskedEmail} ontvangt geen e-mails meer van De Vadercoach.
          </p>
          <p className="text-[13px]" style={{ color: 'var(--text3)' }}>
            We vinden het jammer dat je gaat. Mocht je je bedenken, je bent altijd welkom terug.
          </p>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
          <h1 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
            Link ongeldig
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text2)' }}>
            Deze uitschrijflink is ongeldig of je bent al uitgeschreven.
            Neem contact op via <a href="mailto:info@devadercoach.nl" className="text-amber-400 hover:underline">info@devadercoach.nl</a> als je hulp nodig hebt.
          </p>
        </>
      )}
    </div>
  );
}

export default function UitschrijvenPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <Loader2 className="h-10 w-10 mx-auto mb-4 animate-spin" style={{ color: 'var(--text3)' }} />
      </div>
    }>
      <UitschrijvenContent />
    </Suspense>
  );
}
