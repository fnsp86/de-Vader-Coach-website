'use client';

import { useState, type FormEvent } from 'react';
import { Mail, Send, Check, Loader2 } from 'lucide-react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Versturen mislukt.');
      }

      setStatus('sent');
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Er ging iets mis.');
      setStatus('error');
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
        Contact
      </h1>
      <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text2)' }}>
        Heb je een vraag, opmerking of suggestie? Stuur ons een bericht en we reageren zo snel mogelijk.
      </p>

      {status === 'sent' ? (
        <div className="rounded-xl border p-6 text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <Check className="h-8 w-8 mx-auto mb-3 text-emerald-400" />
          <h2 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>Bericht verstuurd</h2>
          <p className="text-sm" style={{ color: 'var(--text2)' }}>
            Bedankt voor je bericht. We reageren zo snel mogelijk.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-4 text-sm font-semibold text-amber-400 hover:underline"
          >
            Nog een bericht sturen
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
              Naam
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors focus:border-amber-500"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
              placeholder="Je naam"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
              E-mailadres
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors focus:border-amber-500"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
              placeholder="je@email.nl"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
              Bericht
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors focus:border-amber-500 resize-none"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
              placeholder="Waar kunnen we je mee helpen?"
            />
          </div>

          {status === 'error' && (
            <p className="text-sm text-red-400">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#F59E0B' }}
          >
            {status === 'sending' ? (
              <><Loader2 className="h-5 w-5 animate-spin" /> Versturen...</>
            ) : (
              <><Send className="h-5 w-5" /> Versturen</>
            )}
          </button>
        </form>
      )}

      <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
            <Mail className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>E-mail</p>
            <a href="mailto:info@devadercoach.nl" className="text-sm text-amber-400 hover:underline">
              info@devadercoach.nl
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
