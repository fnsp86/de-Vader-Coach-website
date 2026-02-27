import type { Metadata } from 'next';
import BlogContent from '@/components/BlogContent';
import { POSTS_LIST } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Verhalen, inzichten en herkenbare momenten voor vaders.',
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          Blog
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
          Verhalen, inzichten en herkenbare momenten voor vaders.
        </p>
      </div>

      <BlogContent posts={POSTS_LIST} />
    </div>
  );
}
