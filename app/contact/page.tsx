import type { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Neem contact op met De Vadercoach. We helpen je graag verder.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
        Contact
      </h1>
      <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text2)' }}>
        Heb je een vraag, opmerking of suggestie? Stuur ons een bericht en we reageren zo snel mogelijk.
      </p>

      <form className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
            Naam
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors focus:border-amber-500"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            placeholder="Je naam"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
            E-mailadres
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors focus:border-amber-500"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            placeholder="je@email.nl"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
            Bericht
          </label>
          <textarea
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl border text-base outline-none transition-colors focus:border-amber-500 resize-none"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            placeholder="Waar kunnen we je mee helpen?"
          />
        </div>

        <button
          type="submit"
          className="px-7 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97]"
          style={{ backgroundColor: '#F59E0B' }}
        >
          Versturen
        </button>
      </form>

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
