'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import Link from 'next/link';

const TOKEN_KEY = 'vader-experience-token';

function ToegangContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'success' | 'used' | 'expired' | 'error'>('checking');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      return;
    }

    async function verify() {
      try {
        const res = await fetch('/api/experience/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          localStorage.setItem(TOKEN_KEY, token!);
          setStatus('success');
          setTimeout(() => router.push('/experience'), 2000);
        } else if (res.status === 403) {
          setStatus('used');
        } else if (res.status === 410) {
          setStatus('expired');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    }

    verify();
  }, [searchParams, router]);

  if (status === 'checking') {
    return (
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" style={{ color: 'var(--amber-text)' }} />
        <h1 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
          Toegang activeren...
        </h1>
        <p className="text-sm" style={{ color: 'var(--text3)' }}>
          Even geduld terwijl we je toegang verifiëren.
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="text-center">
        <div
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
          style={{ backgroundColor: '#34D39920' }}
        >
          <Check className="h-7 w-7" style={{ color: '#34D399' }} />
        </div>
        <h1 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
          Welkom bij De Vader Experience!
        </h1>
        <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>
          Je toegang is geactiveerd. Je wordt doorgestuurd naar het overzicht...
        </p>
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black"
          style={{ backgroundColor: '#F59E0B' }}
        >
          Naar het overzicht
        </Link>
      </div>
    );
  }

  const errorMessages: Record<string, { title: string; text: string }> = {
    used: {
      title: 'Link al geactiveerd',
      text: 'Deze link is al op een ander apparaat geactiveerd. Elke link kan maar op 1 apparaat worden gebruikt. Neem contact op als je hulp nodig hebt.',
    },
    expired: {
      title: 'Link verlopen',
      text: 'Deze link is verlopen (geldig tot 24 uur na aankoop). Neem contact op via info@devadercoach.nl voor een nieuwe link.',
    },
    error: {
      title: 'Ongeldige link',
      text: 'Deze toegangslink is ongeldig. Controleer of je de juiste link uit je e-mail hebt gebruikt.',
    },
  };

  const msg = errorMessages[status] || errorMessages.error;

  return (
    <div className="text-center">
      <div
        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
        style={{ backgroundColor: '#EF444420' }}
      >
        <X className="h-7 w-7" style={{ color: '#EF4444' }} />
      </div>
      <h1 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
        {msg.title}
      </h1>
      <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>
        {msg.text}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black"
          style={{ backgroundColor: '#F59E0B' }}
        >
          Bekijk de Experience
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border"
          style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
        >
          Contact opnemen
        </Link>
      </div>
    </div>
  );
}

export default function ToegangPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20">
      <Suspense fallback={
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" style={{ color: 'var(--amber-text)' }} />
          <p className="text-sm" style={{ color: 'var(--text3)' }}>Laden...</p>
        </div>
      }>
        <ToegangContent />
      </Suspense>
    </div>
  );
}
