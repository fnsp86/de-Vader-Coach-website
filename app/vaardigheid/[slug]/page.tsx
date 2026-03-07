import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Eye, Heart, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
  BookOpen, ArrowRight, ChevronRight, FileText,
} from 'lucide-react';
import { getAllSkills, getSkill } from '@/lib/skills';
import { COURSES, SKILL_COLORS, getAllCourses } from '@/lib/courses';
import { POSTS_LIST } from '@/lib/blog-posts';
import { getAllGuides } from '@/lib/guides';

const ICON_MAP: Record<string, typeof Eye> = {
  Eye, Heart, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
};

export function generateStaticParams() {
  return getAllSkills().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) return { title: 'Vaardigheid niet gevonden' };
  return {
    title: `${skill.name} - Alles over ${skill.tagline.toLowerCase()}`,
    description: skill.description,
    openGraph: {
      title: `${skill.name} - Vaderschap Vaardigheid`,
      description: skill.description,
      type: 'website',
      url: `https://devadercoach.nl/vaardigheid/${slug}`,
    },
    alternates: {
      canonical: `https://devadercoach.nl/vaardigheid/${slug}`,
    },
  };
}

export default async function SkillPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const skill = getSkill(slug);
  if (!skill) notFound();

  const SkillIcon = ICON_MAP[skill.icon] || BookOpen;

  // Find the course for this skill
  const courses = getAllCourses();
  const course = courses.find((c) => c.category === skill.name);
  const courseSlug = course ? Object.entries(COURSES).find(([, v]) => v.title === course.title)?.[0] : null;

  // Find blog posts for this skill
  const posts = POSTS_LIST.filter((p) => p.category === skill.name);

  // Find guides related to this skill's course
  const guides = getAllGuides().filter((g) =>
    courseSlug ? g.relatedCourses.includes(courseSlug) : false,
  );

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://devadercoach.nl' },
      { '@type': 'ListItem', position: 2, name: 'Vaardigheden', item: 'https://devadercoach.nl/vaardigheid' },
      { '@type': 'ListItem', position: 3, name: skill.name, item: `https://devadercoach.nl/vaardigheid/${slug}` },
    ],
  };

  const faqSchema = skill.faq?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: skill.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <nav className="flex items-center gap-1.5 text-[13px] mb-8" style={{ color: 'var(--text3)' }}>
        <Link href="/" className="hover:underline">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/vaardigheid" className="hover:underline">Vaardigheden</Link>
        <ChevronRight className="h-3 w-3" />
        <span style={{ color: skill.color }}>{skill.name}</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl mb-5"
          style={{ backgroundColor: skill.color + '15' }}
        >
          <SkillIcon className="h-8 w-8" style={{ color: skill.color }} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          {skill.name}
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--text2)' }}>
          {skill.description}
        </p>
      </div>

      {/* Extended content sections */}
      {skill.sections && skill.sections.length > 0 && (
        <div className="mb-12 space-y-8">
          {skill.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
                {section.heading}
              </h2>
              <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                {section.body}
              </p>
            </section>
          ))}
        </div>
      )}

      {/* FAQ */}
      {skill.faq && skill.faq.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-5" style={{ color: 'var(--text)' }}>
            Veelgestelde vragen over {skill.name.toLowerCase()}
          </h2>
          <div className="space-y-4">
            {skill.faq.map((item, i) => (
              <details
                key={i}
                className="rounded-xl border p-5 group"
                style={{ borderColor: 'var(--border)' }}
              >
                <summary
                  className="flex items-center justify-between cursor-pointer text-[15px] font-bold list-none"
                  style={{ color: 'var(--text)' }}
                >
                  {item.question}
                  <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-open:rotate-90" style={{ color: 'var(--text3)' }} />
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Course */}
      {course && courseSlug && (
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            Cursus
          </h2>
          <Link
            href={`/cursussen/${courseSlug}`}
            className="flex items-start gap-4 rounded-2xl border p-6 transition-colors hover:border-opacity-60"
            style={{ borderColor: skill.color + '30', backgroundColor: skill.color + '06' }}
          >
            <div
              className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: skill.color + '20' }}
            >
              <BookOpen className="h-6 w-6" style={{ color: skill.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
                {course.title}
              </h3>
              <p className="text-sm leading-relaxed mb-2" style={{ color: 'var(--text2)' }}>
                {course.description}
              </p>
              <span className="text-xs" style={{ color: 'var(--text3)' }}>
                {course.pages} pagina&apos;s &middot; &euro;{course.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 mt-1" style={{ color: skill.color }} />
          </Link>
        </section>
      )}

      {/* Blog posts */}
      {posts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            Artikelen over {skill.name.toLowerCase()}
          </h2>
          <div className="grid gap-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-opacity-60"
                style={{ borderColor: 'var(--border)' }}
              >
                <FileText className="h-4 w-4 shrink-0" style={{ color: skill.color }} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold block truncate" style={{ color: 'var(--text)' }}>
                    {post.title}
                  </span>
                  <span className="text-[12px] line-clamp-1" style={{ color: 'var(--text3)' }}>
                    {post.description}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--text3)' }} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Guides */}
      {guides.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
            Gratis gidsen
          </h2>
          <div className="grid gap-3">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/gids/${guide.slug}`}
                className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-opacity-60"
                style={{ borderColor: 'var(--border)' }}
              >
                <BookOpen className="h-4 w-4 shrink-0" style={{ color: 'var(--amber-text)' }} />
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold block truncate" style={{ color: 'var(--text)' }}>
                    {guide.title}
                  </span>
                  <span className="text-[12px] line-clamp-1" style={{ color: 'var(--text3)' }}>
                    {guide.description}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--text3)' }} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Other skills */}
      <section className="pt-8 border-t" style={{ borderColor: 'var(--border)' }}>
        <h2 className="text-lg font-extrabold mb-4" style={{ color: 'var(--text)' }}>
          Andere vaardigheden
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {getAllSkills()
            .filter((s) => s.slug !== slug)
            .map((s) => {
              const Icon = ICON_MAP[s.icon] || BookOpen;
              return (
                <Link
                  key={s.slug}
                  href={`/vaardigheid/${s.slug}`}
                  className="rounded-xl border p-4 text-center transition-colors hover:border-opacity-60"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Icon className="h-5 w-5 mx-auto mb-2" style={{ color: s.color }} />
                  <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{s.name}</span>
                </Link>
              );
            })}
        </div>
      </section>
    </div>
  );
}
