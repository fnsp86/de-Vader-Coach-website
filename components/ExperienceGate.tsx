'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';

const TOKEN_KEY = 'vader-experience-token';

export default function ExperienceGate({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    setHasAccess(!!token);
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <div
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
          style={{ backgroundColor: '#F59E0B20' }}
        >
          <Lock className="h-7 w-7" style={{ color: '#F59E0B' }} />
        </div>
        <h1 className="text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
          Toegang vereist
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text2)' }}>
          De Vader Experience is een betaald programma. Na aankoop ontvang je een persoonlijke toegangslink per e-mail.
        </p>
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97]"
          style={{ backgroundColor: '#F59E0B' }}
        >
          Bekijk de Experience
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
