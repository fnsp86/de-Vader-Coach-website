import Link from 'next/link';
import { Clock } from 'lucide-react';
import { SKILL_COLORS } from '@/lib/courses';

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
  const color = SKILL_COLORS[category] || '#F59E0B';

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col rounded-2xl border p-5 transition-all hover:scale-[0.98]"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded-md"
          style={{ backgroundColor: color + '15', color }}
        >
          {category}
        </span>
        <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--text3)' }}>
          <Clock className="h-3 w-3" />
          {readTime} min
        </span>
      </div>

      <h3 className="text-base font-bold leading-snug mb-2" style={{ color: 'var(--text)' }}>
        {title}
      </h3>

      <p className="text-[13px] leading-relaxed flex-1 mb-4" style={{ color: 'var(--text3)' }}>
        {description}
      </p>

      <div className="flex items-center justify-between pt-3 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
        <span className="text-[11px] font-medium" style={{ color: 'var(--text3)' }}>
          {formatted}
        </span>
        <span className="text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
          Lees meer
        </span>
      </div>
    </Link>
  );
}
