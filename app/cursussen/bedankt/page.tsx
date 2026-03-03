import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Download, ArrowLeft, Heart } from 'lucide-react';
import { getCourse, SKILL_COLORS } from '@/lib/courses';

export const metadata: Metadata = {
  title: 'Bedankt voor je aankoop',
};

async function getPaymentStatus(paymentId: string): Promise<{ paid: boolean }> {
  const apiKey = process.env.MOLLIE_API_KEY;
  if (!apiKey || !paymentId) return { paid: false };

  try {
    const { createMollieClient } = await import('@mollie/api-client');
    const mollieClient = createMollieClient({ apiKey });
    const payment = await mollieClient.payments.get(paymentId);
    return { paid: payment.status === 'paid' };
  } catch {
    return { paid: false };
  }
}

export default async function BedanktPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string; paymentId?: string }>;
}) {
  const { slug, paymentId } = await searchParams;
  const course = slug ? getCourse(slug) : undefined;
  const { paid } = paymentId ? await getPaymentStatus(paymentId) : { paid: false };

  if (!course || !paid) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl mb-6" style={{ backgroundColor: '#EF444415' }}>
          <Heart className="h-8 w-8" style={{ color: '#EF4444' }} />
        </div>
        <h1 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          {!paymentId ? 'Betaling niet gevonden' : 'Betaling nog niet voltooid'}
        </h1>
        <p className="text-base mb-6" style={{ color: 'var(--text2)' }}>
          {!paymentId
            ? 'Er is geen betaling gekoppeld aan deze pagina.'
            : 'Je betaling wordt nog verwerkt. Probeer het over een paar seconden opnieuw.'}
        </p>
        <Link
          href="/cursussen"
          className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
          style={{ color: 'var(--amber-text)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar cursussen
        </Link>
      </div>
    );
  }

  const accentColor = course.color || '#F59E0B';

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
      <div
        className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl mb-6"
        style={{ backgroundColor: accentColor + '15' }}
      >
        <Check className="h-8 w-8" style={{ color: accentColor }} />
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
        Bedankt voor je aankoop!
      </h1>

      <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text2)' }}>
        Je hebt <strong>{course.title}</strong> gekocht. Download hieronder je PDF.
      </p>

      <a
        href={`/api/download?paymentId=${paymentId}&slug=${slug}`}
        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97]"
        style={{ backgroundColor: accentColor }}
      >
        <Download className="h-5 w-5" />
        Download {course.title}
      </a>

      <p className="text-xs mt-4" style={{ color: 'var(--text3)' }}>
        Bewaar deze pagina. Je kunt de PDF opnieuw downloaden via deze link.
      </p>
      <p className="text-xs mt-2 mb-12" style={{ color: 'var(--text3)' }}>
        Je ontvangt een factuur per e-mail op het adres waarmee je hebt besteld.
      </p>

      <div className="rounded-2xl border p-6 text-left" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
        <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>
          Tips om te beginnen
        </h2>
        <ul className="space-y-2">
          {[
            'Lees de cursus op je eigen tempo, er is geen haast',
            'Print de werkbladen uit en schrijf erin',
            'Begin met de oefening aan het einde van elk hoofdstuk',
            'Bespreek wat je leert met je partner',
          ].map((tip) => (
            <li key={tip} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text2)' }}>
              <Check className="h-4 w-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
              {tip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Link
          href="/cursussen"
          className="inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
          style={{ color: 'var(--text3)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Meer cursussen bekijken
        </Link>
      </div>
    </div>
  );
}
