import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User, BookOpen, Download, ArrowRight } from 'lucide-react';
import { SKILL_COLORS, getAllCourses, SNELGIDS } from '@/lib/courses';
import { getBlogPostAsync, getAllBlogPostsAsync } from '@/lib/blog-posts-server';
import ShareButtons from '@/components/ShareButtons';
import EmailGate from '@/components/EmailGate';
import AffiliateCard from '@/components/AffiliateCard';
import { getRecommendationsForBlog } from '@/lib/affiliate-products';

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
  const post = (await getBlogPostAsync(slug)) ?? DEFAULT_POST;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['De Vadercoach'],
      url: `https://devadercoach.nl/blog/${slug}`,
    },
    alternates: {
      canonical: `https://devadercoach.nl/blog/${slug}`,
    },
  };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = (await getBlogPostAsync(slug)) ?? DEFAULT_POST;
  const formatted = new Date(post.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const categoryColor = SKILL_COLORS[post.category] || '#F59E0B';

  // Find related course for this category
  const relatedCourse = getAllCourses().find((c) => c.category === post.category);

  // Find 3 related blog posts (same category, excluding current)
  const allPosts = await getAllBlogPostsAsync();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => (a.category === post.category ? -1 : 1) - (b.category === post.category ? -1 : 1))
    .slice(0, 3);

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

  // BlogPosting structured data for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'De Vadercoach', url: 'https://devadercoach.nl' },
    publisher: {
      '@type': 'Organization',
      name: 'De Vadercoach',
      url: 'https://devadercoach.nl',
      logo: { '@type': 'ImageObject', url: 'https://devadercoach.nl/icon-512.png' },
    },
    mainEntityOfPage: `https://devadercoach.nl/blog/${slug}`,
    inLanguage: 'nl',
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devadercoach.nl' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://devadercoach.nl/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://devadercoach.nl/blog/${slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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

      {/* CTA: Free Snelgids download */}
      <div
        className="mt-10 rounded-2xl border p-6 sm:p-8 text-center"
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
          className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-[0.98] cursor-pointer"
          style={{ backgroundColor: '#F59E0B' }}
        />
      </div>

      {/* CTA: Related course */}
      {relatedCourse && (
        <div
          className="mt-6 rounded-2xl border p-6 sm:p-8"
          style={{ backgroundColor: relatedCourse.color + '08', borderColor: relatedCourse.color + '30' }}
        >
          <div className="flex items-start gap-4">
            <div
              className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: relatedCourse.color + '20' }}
            >
              <BookOpen className="h-5 w-5" style={{ color: relatedCourse.color }} />
            </div>
            <div className="flex-1">
              <span
                className="text-[11px] font-bold px-2 py-0.5 rounded mb-2 inline-block"
                style={{ backgroundColor: relatedCourse.color + '15', color: relatedCourse.color }}
              >
                Cursus {relatedCourse.category}
              </span>
              <h3 className="text-lg font-extrabold mb-1" style={{ color: 'var(--text)' }}>
                {relatedCourse.title}
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--text2)' }}>
                {relatedCourse.description}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Link
                  href={`/cursussen/${relatedCourse.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:opacity-80"
                  style={{ color: relatedCourse.color }}
                >
                  Bekijk cursus <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <span className="text-xs" style={{ color: 'var(--text3)' }}>
                  {relatedCourse.pages} pagina&apos;s &middot; &euro;{relatedCourse.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommended products */}
      {(() => {
        const recommendations = getRecommendationsForBlog(post.category);
        if (recommendations.length === 0) return null;
        return (
          <div className="mt-8">
            <h3 className="text-lg font-extrabold mb-4" style={{ color: 'var(--text)' }}>
              Aanbevolen bij dit artikel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recommendations.map((product) => (
                <AffiliateCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        );
      })()}

      {/* Related articles */}
      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-lg font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            Meer artikelen
          </h3>
          <div className="grid gap-3">
            {relatedPosts.map((rp) => {
              const rpColor = SKILL_COLORS[rp.category] || '#F59E0B';
              return (
                <Link
                  key={rp.slug}
                  href={`/blog/${rp.slug}`}
                  className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-500/30"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0"
                    style={{ backgroundColor: rpColor + '15', color: rpColor }}
                  >
                    {rp.category}
                  </span>
                  <span className="text-sm font-medium truncate" style={{ color: 'var(--text2)' }}>
                    {rp.title}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-auto" style={{ color: 'var(--text3)' }} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
