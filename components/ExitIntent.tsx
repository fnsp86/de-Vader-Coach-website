'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { Download, Loader2, Gift } from 'lucide-react';

const EMAIL_KEY = 'vader-coach-email';
const SESSION_KEY = 'vader-coach-exit-shown';
const MIN_TIME_MS = 10_000;

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    // Don't show on mobile (exit-intent doesn't work well)
    if (window.innerWidth < 768) return;

    // Already subscribed or already shown this session
    if (localStorage.getItem(EMAIL_KEY)) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const startTime = Date.now();

    function handleMouseLeave(e: MouseEvent) {
      // Only trigger when mouse moves toward top of viewport (leaving page)
      if (e.clientY > 10) return;
      if (Date.now() - startTime < MIN_TIME_MS) return;
      if (localStorage.getItem(EMAIL_KEY)) return;
      if (sessionStorage.getItem(SESSION_KEY)) return;

      sessionStorage.setItem(SESSION_KEY, '1');
      setShow(true);
      document.removeEventListener('mouseleave', handleMouseLeave);
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

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

    // Track conversion
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/event/email-signup-exit', referrer: window.location.pathname }),
    }).catch(() => {});

    // GA4 + Pixel tracking
    if (typeof window !== 'undefined') {
      (window as any).gtag?.('event', 'sign_up', { method: 'exit_intent' });
      (window as any).fbq?.('track', 'Lead', { content_name: 'exit_intent' });
    }

    setSending(false);
    setShow(false);
    window.location.href = '/snelgids.pdf';
  }

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => { if (e.target === e.currentTarget) setShow(false); }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 relative"
        style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}
      >
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-[20px] leading-none cursor-pointer"
          style={{ color: 'var(--text3)' }}
        >
          &times;
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl mb-5" style={{ backgroundColor: '#F59E0B20' }}>
          <Gift className="h-7 w-7" style={{ color: '#F59E0B' }} />
        </div>

        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>
          Wacht even!
        </h3>
        <p className="text-[14px] mb-1" style={{ color: 'var(--text)' }}>
          Neem onze <strong>gratis vaderschapsgids</strong> mee.
        </p>
        <p className="text-[13px] mb-5" style={{ color: 'var(--text3)' }}>
          Praktische tips om direct toe te passen. Geen spam, beloofd.
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
            autoFocus
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
              <><Download className="h-4 w-4" /> Gratis downloaden</>
            )}
          </button>
          <p className="text-[11px] text-center" style={{ color: 'var(--text3)' }}>
            Je ontvangt ook wekelijkse vaderschapstips. Altijd uitschrijfbaar.
          </p>
        </form>
      </div>
    </div>
  );
}
