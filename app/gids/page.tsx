import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getAllGuides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Opvoedgidsen voor Vaders - Gratis & Praktisch',
  description:
    'Gratis opvoedgidsen voor vaders. Over driftbuien, grenzen stellen, positief opvoeden, pubers en meer. Wetenschappelijk onderbouwd, direct toepasbaar.',
  openGraph: {
    title: 'Opvoedgidsen voor Vaders - Gratis & Praktisch',
    description:
      'Gratis opvoedgidsen voor vaders. Over driftbuien, grenzen stellen, positief opvoeden, pubers en meer.',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/gids',
  },
};

export default function GidsenPage() {
  const guides = getAllGuides();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devadercoach.nl' },
      { '@type': 'ListItem', position: 2, name: 'Gidsen', item: 'https://devadercoach.nl/gids' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Opvoedgidsen voor Vaders',
    description: 'Gratis opvoedgidsen voor vaders over driftbuien, grenzen stellen, positief opvoeden en meer.',
    url: 'https://devadercoach.nl/gids',
    publisher: { '@type': 'Organization', name: 'De Vadercoach', url: 'https://devadercoach.nl' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: guides.length,
      itemListElement: guides.map((g, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://devadercoach.nl/gids/${g.slug}`,
        name: g.title,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-2xl mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            Opvoedgidsen voor Vaders
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
            Gratis, uitgebreide handleidingen over de meest voorkomende opvoedvragen.
            Dieper dan een blogartikel, met concrete stappen en wetenschappelijke onderbouwing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/gids/${guide.slug}`}
              className="group rounded-2xl border p-6 transition-all hover:border-amber-500/30 hover:shadow-sm"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl mb-4 bg-amber-500/10">
                <BookOpen className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="text-base font-bold mb-2 leading-snug" style={{ color: 'var(--text)' }}>
                {guide.title}
              </h2>
              <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'var(--text3)' }}>
                {guide.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all" style={{ color: 'var(--amber-text)' }}>
                Lees gids <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
