import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Eye, Heart, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
  BookOpen, Check, ChevronRight, FileText, ShieldCheck,
} from 'lucide-react';
import { COURSES, type Course } from '@/lib/courses';
import BuyButton from '@/components/BuyButton';

const ICON_MAP: Record<string, typeof Eye> = {
  Eye, Heart, Waves, Shield, Sprout, RefreshCw, Handshake, Brain, BookOpen,
};

const DEFAULT_COURSE: Course = {
  title: 'Cursus niet gevonden',
  description: '',
  longDescription: 'Deze cursus is nog niet beschikbaar.',
  price: 0,
  pages: 0,
  category: '',
  color: 'var(--amber-text)',
  icon: 'BookOpen',
  status: 'coming-soon',
  features: [],
  learnPoints: [],
  forWho: [],
};

export function generateStaticParams() {
  return Object.keys(COURSES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES[slug] ?? DEFAULT_COURSE;
  return {
    title: `${course.title} - Opvoedcursus voor Vaders`,
    description: `${course.description} PDF-werkboek van ${course.pages} pagina's, wetenschappelijk onderbouwd. €${course.price.toFixed(2).replace('.', ',')} eenmalig.`,
    openGraph: {
      title: `${course.title} - Opvoedcursus voor Vaders`,
      description: course.description,
      type: 'website',
      url: `https://devadercoach.nl/cursussen/${slug}`,
    },
    alternates: {
      canonical: `https://devadercoach.nl/cursussen/${slug}`,
    },
  };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES[slug] ?? DEFAULT_COURSE;
  const accentColor = course.color || '#F59E0B';
  const IconComponent = ICON_MAP[course.icon] || BookOpen;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <nav className="flex items-center gap-1.5 text-[13px] mb-8" style={{ color: 'var(--text3)' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/cursussen" className="hover:underline">Cursussen</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate max-w-[200px]" style={{ color: 'var(--text2)' }}>{course.title}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: accentColor + '15' }}>
          <IconComponent className="h-7 w-7" style={{ color: accentColor }} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: accentColor + '15', color: accentColor }}>
              {course.category}
            </span>
            {course.status === 'coming-soon' && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                Binnenkort beschikbaar
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text)' }}>
            {course.title}
          </h1>
        </div>
      </div>

      <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text2)' }}>
        {course.longDescription}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wat je leert */}
          <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Wat je leert</h2>
            <ul className="space-y-3">
              {course.learnPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check className="h-5 w-5 shrink-0 mt-0.5" style={{ color: accentColor }} />
                  <span className="text-sm" style={{ color: 'var(--text2)' }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Voor wie */}
          <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Voor wie is deze cursus?</h2>
            <ul className="space-y-2">
              {course.forWho.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text2)' }}>
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border p-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-3xl font-extrabold mb-1" style={{ color: accentColor }}>
              &euro;{course.price.toFixed(2).replace('.', ',')}
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text3)' }}>
              Eenmalige betaling &middot; PDF download
            </p>

            {course.status === 'coming-soon' ? (
              <div className="px-5 py-3 rounded-xl text-center text-sm font-bold" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                Binnenkort beschikbaar
              </div>
            ) : (
              <BuyButton slug={slug} color={accentColor} price={course.price} />
            )}

            {/* Features */}
            <ul className="mt-5 space-y-2">
              {course.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text3)' }}>
                  <Check className="h-3.5 w-3.5" style={{ color: accentColor }} />
                  {f}
                </li>
              ))}
            </ul>

            {course.pages > 0 && (
              <div className="mt-4 pt-4 border-t flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
                <FileText className="h-4 w-4" style={{ color: 'var(--text3)' }} />
                <span className="text-xs" style={{ color: 'var(--text3)' }}>
                  {course.pages} pagina&apos;s
                </span>
              </div>
            )}

            <div className="mt-4 pt-4 border-t flex items-start gap-2" style={{ borderColor: 'var(--border)' }}>
              <ShieldCheck className="h-4 w-4 shrink-0 mt-0.5" style={{ color: '#34D399' }} />
              <span className="text-[11px] leading-snug" style={{ color: 'var(--text3)' }}>
                30 dagen geld-terug garantie
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Product + Course Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: course.title,
            description: course.longDescription,
            provider: {
              '@type': 'Organization',
              name: 'De Vadercoach',
              url: 'https://devadercoach.nl',
            },
            url: `https://devadercoach.nl/cursussen/${slug}`,
            courseMode: 'Online',
            inLanguage: 'nl',
            offers: {
              '@type': 'Offer',
              price: course.price.toFixed(2),
              priceCurrency: 'EUR',
              availability: course.status === 'available'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/PreOrder',
              url: `https://devadercoach.nl/cursussen/${slug}`,
            },
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
              { '@type': 'ListItem', position: 2, name: 'Cursussen', item: 'https://devadercoach.nl/cursussen' },
              { '@type': 'ListItem', position: 3, name: course.title, item: `https://devadercoach.nl/cursussen/${slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
