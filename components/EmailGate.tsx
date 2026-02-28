'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Download, Loader2, Mail } from 'lucide-react';

const EMAIL_KEY = 'vader-coach-email';

interface EmailGateProps {
  downloadUrl: string;
  buttonText?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function EmailGate({ downloadUrl, buttonText = 'Download gratis snelgids', className, style }: EmailGateProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(EMAIL_KEY);
    if (stored) setSaved(true);
  }, []);

  function handleClick() {
    if (saved) {
      window.location.href = downloadUrl;
      return;
    }
    setOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);

    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {}

    localStorage.setItem(EMAIL_KEY, email);
    setSaved(true);
    setSending(false);
    setOpen(false);

    // Track conversion
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/event/email-signup', referrer: window.location.pathname }),
    }).catch(() => {});

    window.location.href = downloadUrl;
  }

  return (
    <>
      <button onClick={handleClick} className={className} style={style}>
        <Download className="h-5 w-5" />
        {buttonText}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div
            className="w-full max-w-sm rounded-2xl p-6 relative"
            style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-[18px] leading-none cursor-pointer"
              style={{ color: 'var(--text3)' }}
            >
              &times;
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-4" style={{ backgroundColor: '#F59E0B20' }}>
              <Mail className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
            </div>

            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
              Gratis snelgids downloaden
            </h3>
            <p className="text-[13px] mb-4" style={{ color: 'var(--text3)' }}>
              Vul je e-mailadres in en je ontvangt de snelgids direct. We sturen je af en toe een tip - je kunt je altijd uitschrijven.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="je@email.nl"
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors focus:border-amber-500"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.98] disabled:opacity-70 cursor-pointer"
                style={{ backgroundColor: '#F59E0B' }}
              >
                {sending ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Even geduld...</>
                ) : (
                  <><Download className="h-4 w-4" /> Download snelgids</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
