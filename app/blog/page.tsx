import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import BlogContent from '@/components/BlogContent';
import { getAllBlogPostsAsync } from '@/lib/blog-posts-server';

export const metadata: Metadata = {
  title: 'Vaderschapsblog - Opvoedtips & Verhalen voor Vaders',
  description:
    'Herkenbare verhalen en praktische opvoedtips voor vaders. Over grenzen stellen, omgaan met driftbuien, emotiecoaching, vader-kind relatie en meer.',
  openGraph: {
    title: 'Vaderschapsblog - Opvoedtips & Verhalen voor Vaders',
    description:
      'Herkenbare verhalen en praktische opvoedtips voor vaders. Over grenzen stellen, driftbuien, emotiecoaching en meer.',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/blog',
  },
};

export default async function BlogPage() {
  const posts = await getAllBlogPostsAsync();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devadercoach.nl' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://devadercoach.nl/blog' },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Vaderschapsblog',
    description:
      'Herkenbare verhalen en praktische opvoedtips voor vaders. Over grenzen stellen, omgaan met driftbuien, emotiecoaching en meer.',
    url: 'https://devadercoach.nl/blog',
    publisher: { '@type': 'Organization', name: 'De Vadercoach', url: 'https://devadercoach.nl' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://devadercoach.nl/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
            Vaderschapsblog
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
            Herkenbare verhalen, opvoedtips en inzichten voor vaders. Over grenzen stellen, emoties begeleiden en betrokken vaderschap.
          </p>
        </div>
        <Link
          href="/#snelgids"
          className="inline-flex items-center gap-2 shrink-0 rounded-xl px-5 py-2.5 text-sm font-bold text-black transition-transform hover:scale-[0.98]"
          style={{ backgroundColor: '#F59E0B' }}
        >
          <Download className="h-4 w-4" />
          Gratis snelgids
        </Link>
      </div>

      <BlogContent posts={posts} />

      {/* Cross-links */}
      <div className="mt-16 border-t pt-12" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-xl font-extrabold mb-6" style={{ color: 'var(--text)' }}>
          Meer van De Vadercoach
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/cursussen"
            className="group rounded-2xl border p-5 transition-colors hover:border-amber-500/30"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
          >
            <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>Opvoedcursussen</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>
              Verdiepende PDF-werkboeken over 8 opvoedvaardigheden
            </p>
          </Link>
          <Link
            href="/experience"
            className="group rounded-2xl border p-5 transition-colors hover:border-amber-500/30"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
          >
            <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>De Vader Experience</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>
              22 dagen, 8 vaardigheden, dagelijkse oefeningen
            </p>
          </Link>
          <Link
            href="/gids"
            className="group rounded-2xl border p-5 transition-colors hover:border-amber-500/30"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
          >
            <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>Gratis opvoedgidsen</h3>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text3)' }}>
              Uitgebreide handleidingen over veelvoorkomende opvoedvragen
            </p>
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
