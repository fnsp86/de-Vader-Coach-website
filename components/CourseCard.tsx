import Link from 'next/link';
import {
  Eye, Heart, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
  BookOpen,
} from 'lucide-react';

const ICON_MAP: Record<string, typeof Eye> = {
  Eye, Heart, Waves, Shield, Sprout, RefreshCw, Handshake, Brain, BookOpen,
};

interface CourseCardProps {
  title: string;
  description: string;
  price: number;
  slug: string;
  category: string;
  color?: string;
  icon?: string;
  pages?: number;
  status: 'available' | 'coming-soon';
  features?: string[];
}

export default function CourseCard({ title, description, price, slug, category, color, icon, pages, status }: CourseCardProps) {
  const accentColor = color || '#F59E0B';
  const IconComponent = (icon && ICON_MAP[icon]) || BookOpen;

  return (
    <Link
      href={`/cursussen/${slug}`}
      className="group flex flex-col rounded-2xl border p-5 transition-all hover:scale-[0.98]"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      {/* Icon + Category */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: accentColor + '15' }}>
          <IconComponent className="h-5 w-5" style={{ color: accentColor }} />
        </div>
        <span
          className="text-[11px] font-bold px-2 py-0.5 rounded-md"
          style={{ backgroundColor: accentColor + '15', color: accentColor }}
        >
          {category}
        </span>
        {status === 'coming-soon' && (
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
            Binnenkort
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold leading-snug mb-2" style={{ color: 'var(--text)' }}>
        {title}
      </h3>

      {/* Description - flex-grow to push price down */}
      <p className="text-[13px] leading-relaxed flex-1 mb-4" style={{ color: 'var(--text3)' }}>
        {description}
      </p>

      {/* Price - always at bottom */}
      <div className="flex items-baseline justify-between pt-3 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
        <span className="text-lg font-extrabold" style={{ color: accentColor }}>
          &euro;{price.toFixed(2).replace('.', ',')}
        </span>
        {pages && (
          <span className="text-[11px] font-medium" style={{ color: 'var(--text3)' }}>
            {pages} pag.
          </span>
        )}
      </div>
    </Link>
  );
}
