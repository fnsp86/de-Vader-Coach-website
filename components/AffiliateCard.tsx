import Link from 'next/link';
import { BookOpen, Wrench, Gift, GraduationCap } from 'lucide-react';
import type { AffiliateProduct } from '@/lib/affiliate-products';
import { SKILL_COLORS } from '@/lib/affiliate-products';

const CATEGORY_ICONS: Record<string, typeof BookOpen> = {
  boek: BookOpen,
  tool: Wrench,
  speelgoed: Gift,
  cursus: GraduationCap,
};

const CATEGORY_LABELS: Record<string, string> = {
  boek: 'Boek',
  tool: 'Tool',
  speelgoed: 'Speelgoed',
  cursus: 'Cursus',
};

export default function AffiliateCard({ product }: { product: AffiliateProduct }) {
  const Icon = CATEGORY_ICONS[product.category] || BookOpen;
  const skillColor = SKILL_COLORS[product.skill] || '#F59E0B';
  const categoryLabel = CATEGORY_LABELS[product.category] || product.category;

  const inner = (
    <div
      className="flex flex-col rounded-xl border p-4 transition-all hover:scale-[0.98] h-full"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: skillColor + '15' }}
        >
          <Icon className="h-4 w-4" style={{ color: skillColor }} />
        </div>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded"
          style={{ backgroundColor: skillColor + '15', color: skillColor }}
        >
          {product.skill}
        </span>
        {product.badge && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded ml-auto"
            style={{
              backgroundColor: product.isOwnProduct ? '#F59E0B20' : 'var(--surface2)',
              color: product.isOwnProduct ? 'var(--amber-text)' : 'var(--text3)',
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      <h3 className="text-sm font-bold leading-snug mb-1" style={{ color: 'var(--text)' }}>
        {product.title}
      </h3>
      <p className="text-[12px] leading-relaxed flex-1 mb-3" style={{ color: 'var(--text3)' }}>
        {product.description}
      </p>

      <div className="flex items-center justify-between pt-2.5 border-t mt-auto" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          {product.price && (
            <span className="text-sm font-bold" style={{ color: skillColor }}>
              {product.price}
            </span>
          )}
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
            {categoryLabel}
          </span>
        </div>
        {!product.isOwnProduct && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
            Binnenkort
          </span>
        )}
      </div>
    </div>
  );

  if (product.isOwnProduct) {
    return (
      <Link href={product.affiliateUrl}>
        {inner}
      </Link>
    );
  }

  // External affiliate links are not yet active
  return <div style={{ opacity: 0.7, cursor: 'default' }}>{inner}</div>;
}
