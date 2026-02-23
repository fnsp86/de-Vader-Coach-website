import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  price: number;
  slug: string;
  category: string;
  color?: string;
  status: 'available' | 'coming-soon';
  features?: string[];
}

export default function CourseCard({ title, description, price, slug, category, color, status, features }: CourseCardProps) {
  const accentColor = color || '#F59E0B';

  return (
    <Link
      href={`/cursussen/${slug}`}
      className="group block rounded-2xl border p-6 transition-all hover:scale-[0.98]"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      {/* Color accent bar */}
      <div className="h-1 w-12 rounded-full mb-4" style={{ backgroundColor: accentColor }} />

      {/* Category + status */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-lg"
          style={{ backgroundColor: accentColor + '15', color: accentColor }}
        >
          {category}
        </span>
        {status === 'coming-soon' && (
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
            Binnenkort
          </span>
        )}
      </div>

      {/* Icon + Title */}
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: accentColor + '15' }}>
          <BookOpen className="h-5 w-5" style={{ color: accentColor }} />
        </div>
        <h3 className="text-lg font-bold leading-tight" style={{ color: 'var(--text)' }}>
          {title}
        </h3>
      </div>

      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text2)' }}>
        {description}
      </p>

      {/* Features */}
      {features && features.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text3)' }}>
              <span className="h-1 w-1 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
              {f}
            </li>
          ))}
        </ul>
      )}

      {/* Price + CTA */}
      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <span className="text-xl font-extrabold" style={{ color: accentColor }}>
          &euro;{price.toFixed(2).replace('.', ',')}
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: accentColor }}>
          Bekijk
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
