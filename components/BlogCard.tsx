import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: number;
  category: string;
}

export default function BlogCard({ title, description, slug, date, readTime, category }: BlogCardProps) {
  const formatted = new Date(date).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Link
      href={`/blog/${slug}`}
      className="group block rounded-2xl border p-6 transition-all hover:scale-[0.98] hover:border-amber-500/30"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <span
        className="inline-block text-xs font-bold px-2.5 py-1 rounded-lg mb-3"
        style={{ backgroundColor: 'var(--surface2)', color: 'var(--text2)' }}
      >
        {category}
      </span>

      <h3 className="text-lg font-bold leading-tight mb-2" style={{ color: 'var(--text)' }}>
        {title}
      </h3>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text3)' }}>
          <span>{formatted}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime} min
          </span>
        </div>
        <ArrowRight className="h-4 w-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  );
}
