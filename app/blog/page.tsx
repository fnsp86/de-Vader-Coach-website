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
};

export default async function BlogPage() {
  const posts = await getAllBlogPostsAsync();

  return (
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
    </div>
  );
}
