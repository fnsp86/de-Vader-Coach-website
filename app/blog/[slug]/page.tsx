import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { SKILL_COLORS } from '@/lib/courses';
import { getBlogPost } from '@/lib/blog-posts';
import ShareButtons from '@/components/ShareButtons';

const DEFAULT_POST = {
  title: 'Artikel niet gevonden',
  description: '',
  date: '2026-01-01',
  readTime: 0,
  category: '',
  content: 'Dit artikel is nog niet beschikbaar. Kom binnenkort terug!',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug) ?? DEFAULT_POST;
  return { title: post.title, description: post.description };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug) ?? DEFAULT_POST;
  const formatted = new Date(post.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const categoryColor = SKILL_COLORS[post.category] || '#F59E0B';

  // Simple markdown-to-html
  const htmlContent = post.content
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith('# ')) return `<h1>${trimmed.slice(2)}</h1>`;
      if (trimmed === '---') return '<hr />';
      if (trimmed.startsWith('*') && trimmed.endsWith('*')) return `<p><em>${trimmed.slice(1, -1)}</em></p>`;
      if (trimmed) return `<p>${trimmed}</p>`;
      return '';
    })
    .join('\n');

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 hover:gap-2.5 transition-all"
        style={{ color: 'var(--text3)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Alle artikelen
      </Link>

      <article>
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-md"
              style={{ backgroundColor: categoryColor + '15', color: categoryColor }}
            >
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--text3)' }}>
              <Clock className="h-3 w-3" />
              {post.readTime} min
            </span>
            <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{formatted}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3" style={{ color: 'var(--text)' }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-[13px]" style={{ color: 'var(--text3)' }}>
            <User className="h-3.5 w-3.5" />
            De Vadercoach
          </div>
        </div>

        <div
          className="max-w-none [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:mb-4 [&_hr]:my-8 [&_hr]:border-[var(--border)] [&_em]:text-[13px] [&_em]:opacity-70"
          style={{ color: 'var(--text2)' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-10 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <ShareButtons
            url={`https://devadercoach.nl/blog/${slug}`}
            title={post.title}
          />
        </div>
      </article>
    </div>
  );
}
