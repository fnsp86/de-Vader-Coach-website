import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown, Download, HelpCircle } from 'lucide-react';
import { FAQ_CURSUSSEN, FAQ_EXPERIENCE } from '@/lib/testimonials';
import { SNELGIDS } from '@/lib/courses';
import EmailGate from '@/components/EmailGate';

export const metadata: Metadata = {
  title: 'Veelgestelde Vragen (FAQ) - De Vadercoach',
  description:
    'Antwoorden op veelgestelde vragen over De Vadercoach. Alles over cursussen, de Vader Experience, de app, betaling en wetenschappelijke onderbouwing.',
  openGraph: {
    title: 'Veelgestelde Vragen - De Vadercoach',
    description:
      'Antwoorden op veelgestelde vragen over De Vadercoach. Cursussen, Experience, app, betaling en meer.',
    url: 'https://devadercoach.nl/faq',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/faq',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devadercoach.nl' },
    { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://devadercoach.nl/faq' },
  ],
};

const FAQ_ALGEMEEN = [
  {
    q: 'Wat is De Vadercoach?',
    a: 'De Vadercoach biedt trainingen persoonlijke ontwikkeling voor vaders. Via cursussen, een 22-daagse Vader Experience en een app leer je 8 wetenschappelijk onderbouwde opvoedvaardigheden zoals emotiecoaching, zelfregulatie en grenzen stellen.',
  },
  {
    q: 'Voor welke leeftijd zijn de cursussen geschikt?',
    a: 'De cursussen zijn geschikt voor vaders met kinderen van 0 tot 18 jaar. Elke cursus bevat leeftijdsspecifieke oefeningen en voorbeelden voor peuters, kleuters, basisschoolkinderen en tieners.',
  },
  {
    q: 'Zijn de cursussen wetenschappelijk onderbouwd?',
    a: 'Ja. Alle cursussen zijn gebaseerd op bewezen theorieën zoals de hechtingstheorie (Bowlby), emotiecoaching (Gottman), zelfdeterminatietheorie (Deci & Ryan), reflectief functioneren (Fonagy) en de polyvagaaltheorie (Porges). De wetenschap wordt vertaald naar herkenbare dagelijkse situaties.',
  },
  {
    q: 'Heb ik een abonnement nodig?',
    a: 'Nee. De Vadercoach app is helemaal gratis. De cursussen en Experience zijn eenmalige aankopen zonder abonnement.',
  },
  {
    q: 'Hoe kan ik contact opnemen?',
    a: 'Je kunt ons bereiken via het contactformulier op de website of door te mailen naar info@devadercoach.nl. We reageren doorgaans binnen 24 uur.',
  },
];

const FAQ_APP = [
  {
    q: 'Wat is de Vadercoach app?',
    a: 'De app is een dagelijkse training voor vaders. Je krijgt elke dag een praktische opdracht, mini-scenario of reflectie gebaseerd op de 8 vadervaardigheden. Inclusief cursussen over alle 8 vaardigheden, interactieve oefeningen en een community van vaders.',
  },
  {
    q: 'Wat kost de app?',
    a: 'De app is helemaal gratis. Je krijgt volledige toegang tot alle content, inclusief de cursussen over de 8 vadervaardigheden. Er zijn geen in-app aankopen of abonnementen.',
  },
  {
    q: 'Op welke telefoons werkt de app?',
    a: 'De app werkt op zowel iPhone (iOS 15+) als Android (versie 10+). Je vindt hem in de App Store en Google Play Store.',
  },
  {
    q: 'Hoe verschilt de app van de PDF-cursussen?',
    a: 'De PDF-cursussen bieden uitgebreide verdieping per vaardigheid met theorie, werkbladen en bronnen. De app is een dagelijkse coach die je helpt om alle vaardigheden in de praktijk te brengen met korte interactieve opdrachten, streaks en een community.',
  },
];

const FAQ_BETALING = [
  {
    q: 'Welke betaalmethoden accepteren jullie?',
    a: 'We accepteren iDEAL, creditcard (Visa, Mastercard), Bancontact en PayPal. Betaling verloopt veilig via Mollie.',
  },
  {
    q: 'Krijg ik een factuur?',
    a: 'Ja, na betaling ontvang je een factuur per e-mail.',
  },
  {
    q: 'Wat is het retourbeleid?',
    a: 'We bieden een 30 dagen niet-goed-geld-terug garantie op alle producten. Geen vragen, geen gedoe. Mail naar info@devadercoach.nl en je krijgt je geld terug.',
  },
];

const SECTIONS = [
  { title: 'Algemeen', items: FAQ_ALGEMEEN },
  { title: 'Cursussen', items: FAQ_CURSUSSEN },
  { title: 'De Vader Experience', items: FAQ_EXPERIENCE },
  { title: 'De App', items: FAQ_APP },
  { title: 'Betaling & Retour', items: FAQ_BETALING },
];

const allFaqs = SECTIONS.flatMap((s) => s.items);

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allFaqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="pt-16 pb-10 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <div
            className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: '#F59E0B18' }}
          >
            <HelpCircle className="h-7 w-7" style={{ color: '#F59E0B' }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--text)' }}>
            Veelgestelde vragen
          </h1>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
            Alles wat je wilt weten over De Vadercoach, onze cursussen, de Experience en de app.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-extrabold mb-4" style={{ color: 'var(--text)' }}>
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border overflow-hidden"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <summary
                      className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none text-sm font-bold hover:bg-[var(--surface)]"
                      style={{ color: 'var(--text)' }}
                    >
                      {item.q}
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" style={{ color: 'var(--text3)' }} />
                    </summary>
                    <div className="px-5 pb-4 text-[14px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div
            className="rounded-2xl border p-6 sm:p-8 text-center"
            style={{ backgroundColor: '#F59E0B08', borderColor: '#F59E0B30' }}
          >
            <Download className="h-8 w-8 mx-auto mb-3" style={{ color: 'var(--amber-text)' }} />
            <h3 className="text-lg sm:text-xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
              Gratis Snelgids: De 8 Vadervaardigheden
            </h3>
            <p className="text-sm mb-4 max-w-md mx-auto" style={{ color: 'var(--text2)' }}>
              {SNELGIDS.description}
            </p>
            <EmailGate
              downloadUrl="/api/free-download"
              buttonText="Download gratis snelgids"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97] cursor-pointer"
              style={{ backgroundColor: '#F59E0B' }}
            />
          </div>

          {/* Still questions? */}
          <div className="text-center pt-4">
            <p className="text-sm mb-2" style={{ color: 'var(--text3)' }}>
              Staat je vraag er niet bij?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-amber-400"
              style={{ color: '#F59E0B' }}
            >
              Neem contact op
            </Link>
          </div>

          {/* Cross-links */}
          <div className="mt-12 border-t pt-10" style={{ borderColor: 'var(--border)' }}>
            <h2 className="text-lg font-extrabold mb-4" style={{ color: 'var(--text)' }}>
              Direct aan de slag
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/cursussen"
                className="group rounded-xl border p-4 transition-colors hover:border-amber-500/30"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>Opvoedcursussen</h3>
                <p className="text-xs" style={{ color: 'var(--text3)' }}>Verdiepende PDF-werkboeken voor vaders</p>
              </Link>
              <Link
                href="/experience"
                className="group rounded-xl border p-4 transition-colors hover:border-amber-500/30"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>De Vader Experience</h3>
                <p className="text-xs" style={{ color: 'var(--text3)' }}>22-daagse reis door 8 vaardigheden</p>
              </Link>
              <Link
                href="/blog"
                className="group rounded-xl border p-4 transition-colors hover:border-amber-500/30"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>Vaderschapsblog</h3>
                <p className="text-xs" style={{ color: 'var(--text3)' }}>Gratis artikelen en opvoedtips</p>
              </Link>
              <Link
                href="/gids"
                className="group rounded-xl border p-4 transition-colors hover:border-amber-500/30"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>Gratis opvoedgidsen</h3>
                <p className="text-xs" style={{ color: 'var(--text3)' }}>Uitgebreide handleidingen per onderwerp</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
