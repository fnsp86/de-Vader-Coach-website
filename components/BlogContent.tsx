'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { SKILL_COLORS } from '@/lib/courses';
import BlogCard from './BlogCard';

interface Post {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: number;
  category: string;
}

const CATEGORIES = Object.keys(SKILL_COLORS);

export default function BlogContent({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [posts],
  );

  const featured = sorted[0];
  const rest = active
    ? sorted.filter((p) => p.category === active)
    : sorted.slice(1);

  const featuredColor = SKILL_COLORS[featured.category] || '#F59E0B';
  const featuredDate = new Date(featured.date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      {/* Featured article */}
      {!active && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group block rounded-2xl border p-6 sm:p-8 mb-10 transition-all hover:scale-[0.99]"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-[11px] font-bold px-2.5 py-1 rounded-md"
              style={{ backgroundColor: featuredColor + '15', color: featuredColor }}
            >
              {featured.category}
            </span>
            <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--text3)' }}>
              <Clock className="h-3 w-3" />
              {featured.readTime} min
            </span>
            <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{featuredDate}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold leading-tight mb-2" style={{ color: 'var(--text)' }}>
            {featured.title}
          </h2>
          <p className="text-sm leading-relaxed mb-4 max-w-2xl" style={{ color: 'var(--text2)' }}>
            {featured.description}
          </p>
          <span
            className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all"
            style={{ color: featuredColor }}
          >
            Lees artikel <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      )}

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive(null)}
          className="text-[12px] font-bold px-3.5 py-1.5 rounded-lg border transition-colors"
          style={{
            backgroundColor: !active ? 'var(--text)' : 'transparent',
            color: !active ? 'var(--bg)' : 'var(--text3)',
            borderColor: !active ? 'var(--text)' : 'var(--border)',
          }}
        >
          Alle
        </button>
        {CATEGORIES.map((cat) => {
          const color = SKILL_COLORS[cat];
          const isActive = active === cat;
          const count = sorted.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(isActive ? null : cat)}
              className="text-[12px] font-bold px-3.5 py-1.5 rounded-lg border transition-colors"
              style={{
                backgroundColor: isActive ? color + '18' : 'transparent',
                color: isActive ? color : 'var(--text3)',
                borderColor: isActive ? color + '40' : 'var(--border)',
              }}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>

      {rest.length === 0 && active && (
        <p className="text-sm text-center py-10" style={{ color: 'var(--text3)' }}>
          Geen artikelen in deze categorie.
        </p>
      )}
    </>
  );
}
