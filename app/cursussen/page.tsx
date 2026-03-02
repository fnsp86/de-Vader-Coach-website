import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, BookOpen, ChevronDown, ShieldCheck, ArrowRight } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import EmailGate from '@/components/EmailGate';
import { getAllCourses, BUNDLE, SNELGIDS } from '@/lib/courses';
import { FAQ_CURSUSSEN } from '@/lib/testimonials';
import { getAllGuides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Opvoedcursussen voor Vaders - Persoonlijke Ontwikkeling Training',
  description:
    'Trainingen persoonlijke ontwikkeling voor vaders. Leer grenzen stellen, emotiecoaching, zelfregulatie en meer. 10 PDF-werkboeken, wetenschappelijk onderbouwd, direct toepasbaar.',
  openGraph: {
    title: 'Opvoedcursussen voor Vaders - Persoonlijke Ontwikkeling Training',
    description:
      'Trainingen persoonlijke ontwikkeling voor vaders. 10 PDF-werkboeken over grenzen stellen, emotiecoaching, zelfregulatie en meer.',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/cursussen',
  },
};

export default function CursussenPage() {
  const courses = getAllCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          Opvoedcursussen voor Vaders
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
          {courses.length} verdiepende PDF-werkboeken over opvoedvaardigheden. Van grenzen stellen en emotiecoaching
          tot zelfregulatie en verbinding met je tiener. Wetenschappelijk onderbouwd, direct toepasbaar.
        </p>
      </div>

      {/* Gratis snelgids */}
      <div
        className="rounded-2xl border p-6 sm:p-8 mb-8"
        style={{ borderColor: '#F59E0B40', backgroundColor: 'var(--surface)' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <BookOpen className="h-7 w-7 text-black" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F59E0B30', color: 'var(--amber-text)' }}>
                GRATIS
              </span>
            </div>
            <h2 className="text-xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>
              {SNELGIDS.title}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>
              {SNELGIDS.description}
            </p>
          </div>
          <EmailGate
            downloadUrl="/api/free-download"
            buttonText="Download PDF"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97] cursor-pointer"
            style={{ backgroundColor: '#F59E0B' }}
          />
        </div>
      </div>

      {/* Alle 8 cursussen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.slug} {...course} />
        ))}
      </div>

      {/* Bundel */}
      <div
        className="mt-8 rounded-2xl border p-6 sm:p-8"
        style={{ backgroundColor: 'var(--surface)', borderColor: '#F59E0B40' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: '#F59E0B15', color: 'var(--amber-text)' }}>
                Bundel
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                Binnenkort
              </span>
            </div>
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
              {BUNDLE.title}
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>
              {BUNDLE.description}
            </p>
            <ul className="space-y-1.5">
              {[
                'Alle 8 cursussen in een download',
                '451 pagina\'s, 77 hoofdstukken',
                'Honderden oefeningen en werkbladen',
                `${Math.round((1 - BUNDLE.price / BUNDLE.originalPrice) * 100)}% korting ten opzichte van losse aankoop`,
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text2)' }}>
                  <Check className="h-4 w-4 shrink-0 text-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <div className="text-sm line-through" style={{ color: 'var(--text3)' }}>
              &euro;{BUNDLE.originalPrice.toFixed(2).replace('.', ',')}
            </div>
            <div className="text-4xl font-extrabold" style={{ color: 'var(--amber-text)' }}>
              &euro;{BUNDLE.price.toFixed(2).replace('.', ',')}
            </div>
            <div className="text-xs mb-4" style={{ color: 'var(--text3)' }}>
              8 cursussen &middot; eenmalige betaling
            </div>
            <div
              className="px-6 py-3 rounded-xl text-sm font-bold text-center"
              style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}
            >
              Binnenkort beschikbaar
            </div>
          </div>
        </div>
      </div>

      {/* Garantie */}
      <div
        className="mt-8 rounded-2xl border p-5 sm:p-6 flex items-start gap-4"
        style={{ backgroundColor: '#34D39908', borderColor: '#34D39930' }}
      >
        <ShieldCheck className="h-6 w-6 shrink-0 mt-0.5" style={{ color: '#34D399' }} />
        <div>
          <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
            30 dagen niet-goed-geld-terug garantie
          </h3>
          <p className="text-[13px]" style={{ color: 'var(--text2)' }}>
            Niet tevreden? Mail naar info@devadercoach.nl en je krijgt je geld terug. Geen vragen, geen gedoe.
          </p>
        </div>
      </div>

      {/* Gratis gidsen */}
      <div className="mt-12">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          Gratis opvoedgidsen
        </h2>
        <p className="text-sm mb-6" style={{ color: 'var(--text2)' }}>
          Wil je eerst gratis kennismaken? Onze uitgebreide gidsen geven je direct toepasbare tips.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {getAllGuides().slice(0, 3).map((guide) => (
            <Link
              key={guide.slug}
              href={`/gids/${guide.slug}`}
              className="group flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-500/30"
              style={{ borderColor: 'var(--border)' }}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                <BookOpen className="h-4 w-4 text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[13px] font-bold block truncate" style={{ color: 'var(--text)' }}>
                  {guide.title.replace(/:.*/,'')}
                </span>
                <span className="text-[11px]" style={{ color: 'var(--text3)' }}>Gratis gids</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--text3)' }} />
            </Link>
          ))}
        </div>
        <Link
          href="/gids"
          className="inline-flex items-center gap-1.5 text-sm font-bold mt-4 hover:gap-2 transition-all"
          style={{ color: 'var(--amber-text)' }}
        >
          Alle {getAllGuides().length} gidsen bekijken <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-6" style={{ color: 'var(--text)' }}>
          Veelgestelde vragen
        </h2>
        <div className="space-y-3">
          {FAQ_CURSUSSEN.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border overflow-hidden"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <summary
                className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-bold list-none"
                style={{ color: 'var(--text)' }}
              >
                {faq.q}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" style={{ color: 'var(--text3)' }} />
              </summary>
              <div className="px-5 pb-4 text-[13px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_CURSUSSEN.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devadercoach.nl' },
              { '@type': 'ListItem', position: 2, name: 'Opvoedcursussen', item: 'https://devadercoach.nl/cursussen' },
            ],
          }),
        }}
      />

      {/* ItemList Schema for all courses */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Opvoedcursussen voor Vaders',
            description: 'Online opvoedcursussen speciaal voor vaders. 8 PDF-werkboeken, wetenschappelijk onderbouwd.',
            numberOfItems: courses.length,
            itemListElement: courses.map((course, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Course',
                name: course.title,
                description: course.description,
                url: `https://devadercoach.nl/cursussen/${course.slug}`,
                provider: { '@type': 'Organization', name: 'De Vadercoach' },
                offers: {
                  '@type': 'Offer',
                  price: course.price.toFixed(2),
                  priceCurrency: 'EUR',
                },
              },
            })),
          }),
        }}
      />
    </div>
  );
}
