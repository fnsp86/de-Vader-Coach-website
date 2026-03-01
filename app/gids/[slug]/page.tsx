import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, ChevronDown, Download } from 'lucide-react';
import { getAllGuides, getGuide } from '@/lib/guides';
import { getAllCourses, SNELGIDS } from '@/lib/courses';
import { POSTS_LIST } from '@/lib/blog-posts';
import EmailGate from '@/components/EmailGate';

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: 'Gids niet gevonden' };
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url: `https://devadercoach.nl/gids/${slug}`,
    },
    alternates: {
      canonical: `https://devadercoach.nl/gids/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const courses = getAllCourses();
  const relatedCourses = guide.relatedCourses
    .map((s) => courses.find((c) => c.slug === s))
    .filter(Boolean);
  const relatedPosts = guide.relatedPosts
    .map((s) => POSTS_LIST.find((p) => p.slug === s))
    .filter(Boolean);

  // Render content: simple markdown to HTML
  const htmlContent = guide.content
    .split('\n\n')
    .map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith('## ')) return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith('**') && trimmed.endsWith('**'))
        return `<p><strong>${trimmed.slice(2, -2)}</strong></p>`;
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed
          .split('\n')
          .map((line) => `<li>${inlineMd(line.replace(/^[-*]\s+/, ''))}</li>`)
          .join('');
        return `<ul>${items}</ul>`;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed
          .split('\n')
          .map((line) => `<li>${inlineMd(line.replace(/^\d+\.\s+/, ''))}</li>`)
          .join('');
        return `<ol>${items}</ol>`;
      }
      if (trimmed) return `<p>${inlineMd(trimmed)}</p>`;
      return '';
    })
    .join('\n');

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    author: { '@type': 'Organization', name: 'De Vadercoach', url: 'https://devadercoach.nl' },
    publisher: {
      '@type': 'Organization',
      name: 'De Vadercoach',
      url: 'https://devadercoach.nl',
      logo: { '@type': 'ImageObject', url: 'https://devadercoach.nl/icon-512.png' },
    },
    mainEntityOfPage: `https://devadercoach.nl/gids/${slug}`,
    inLanguage: 'nl',
    keywords: guide.keywords.join(', '),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devadercoach.nl' },
      { '@type': 'ListItem', position: 2, name: 'Gidsen', item: 'https://devadercoach.nl/gids' },
      { '@type': 'ListItem', position: 3, name: guide.title, item: `https://devadercoach.nl/gids/${slug}` },
    ],
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Link
        href="/gids"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 hover:gap-2.5 transition-all"
        style={{ color: 'var(--text3)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Alle gidsen
      </Link>

      <article>
        <div className="mb-8">
          <span
            className="text-[11px] font-bold px-2.5 py-1 rounded-md mb-4 inline-block"
            style={{ backgroundColor: '#F59E0B15', color: 'var(--amber-text)' }}
          >
            Gratis gids
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight mb-3" style={{ color: 'var(--text)' }}>
            {guide.title}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--text2)' }}>
            {guide.description}
          </p>
        </div>

        <div
          className="max-w-none [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-3 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-4 [&_ul]:space-y-1 [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:mb-4 [&_ol]:space-y-1 [&_li]:text-[15px] [&_li]:leading-relaxed [&_strong]:font-bold"
          style={{ color: 'var(--text2)' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>

      {/* FAQ */}
      {guide.faq.length > 0 && (
        <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-xl font-extrabold mb-6" style={{ color: 'var(--text)' }}>
            Veelgestelde vragen
          </h2>
          <div className="space-y-3">
            {guide.faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border overflow-hidden"
                style={{ borderColor: 'var(--border)' }}
              >
                <summary
                  className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none text-sm font-bold hover:bg-[var(--surface)]"
                  style={{ color: 'var(--text)' }}
                >
                  {item.question}
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" style={{ color: 'var(--text3)' }} />
                </summary>
                <div className="px-5 pb-4 text-[14px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA: Free Snelgids */}
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

      {/* Related courses */}
      {relatedCourses.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            Verdiep je verder
          </h3>
          <div className="space-y-3">
            {relatedCourses.map((course) => course && (
              <Link
                key={course.slug}
                href={`/cursussen/${course.slug}`}
                className="flex items-start gap-4 rounded-xl border p-5 transition-colors hover:border-amber-500/30"
                style={{ borderColor: 'var(--border)' }}
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: course.color + '20' }}
                >
                  <BookOpen className="h-5 w-5" style={{ color: course.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold mb-0.5" style={{ color: 'var(--text)' }}>
                    {course.title}
                  </h4>
                  <p className="text-[13px] line-clamp-2" style={{ color: 'var(--text3)' }}>
                    {course.description}
                  </p>
                  <span className="text-xs mt-1 inline-block" style={{ color: 'var(--text3)' }}>
                    {course.pages} pagina&apos;s &middot; &euro;{course.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 mt-1" style={{ color: 'var(--text3)' }} />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related blog posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            Gerelateerde artikelen
          </h3>
          <div className="grid gap-3">
            {relatedPosts.map((post) => post && (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-500/30"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="text-sm font-medium truncate" style={{ color: 'var(--text2)' }}>
                  {post.title}
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 ml-auto" style={{ color: 'var(--text3)' }} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function inlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
