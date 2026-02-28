'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import AffiliateCard from '@/components/AffiliateCard';
import {
  getAllProducts,
  PRODUCT_CATEGORIES,
  SKILL_COLORS,
} from '@/lib/affiliate-products';
import type { AffiliateProduct } from '@/lib/affiliate-products';

const SKILLS = Object.keys(SKILL_COLORS).filter((s) => s !== 'Integratie');

export default function AanbevolenPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const allProducts = getAllProducts();

  const filtered = activeCategory
    ? allProducts.filter((p) => p.category === activeCategory)
    : allProducts;

  // Group by skill
  const grouped = SKILLS.reduce<Record<string, AffiliateProduct[]>>((acc, skill) => {
    const items = filtered.filter((p) => p.skill === skill);
    if (items.length > 0) acc[skill] = items;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Hero */}
      <div className="max-w-2xl mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <Star className="h-4.5 w-4.5 text-black" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--amber-text)' }}>
            Aanbevolen
          </span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-extrabold mb-3"
          style={{ color: 'var(--text)' }}
        >
          Aanbevolen voor Vaders
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
          Onze favoriete boeken, tools en cursussen per vaardigheid. Alles wat we zelf gebruiken
          of aanraden aan vaders die willen groeien.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className="px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer"
          style={{
            backgroundColor: activeCategory === null ? '#F59E0B' : 'var(--surface)',
            color: activeCategory === null ? '#000' : 'var(--text2)',
            borderWidth: '1px',
            borderColor: activeCategory === null ? '#F59E0B' : 'var(--border)',
          }}
        >
          Alles
        </button>
        {PRODUCT_CATEGORIES.map((cat) => {
          const count = allProducts.filter((p) => p.category === cat.value).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(activeCategory === cat.value ? null : cat.value)}
              className="px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer"
              style={{
                backgroundColor: activeCategory === cat.value ? '#F59E0B' : 'var(--surface)',
                color: activeCategory === cat.value ? '#000' : 'var(--text2)',
                borderWidth: '1px',
                borderColor: activeCategory === cat.value ? '#F59E0B' : 'var(--border)',
              }}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Products grouped by skill */}
      <div className="space-y-10">
        {Object.entries(grouped).map(([skill, products]) => (
          <section key={skill}>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: SKILL_COLORS[skill] }}
              />
              <h2 className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>
                {skill}
              </h2>
              <span className="text-xs" style={{ color: 'var(--text3)' }}>
                {products.length} {products.length === 1 ? 'product' : 'producten'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {products.map((product) => (
                <AffiliateCard key={product.slug} product={product} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Empty state */}
      {Object.keys(grouped).length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm" style={{ color: 'var(--text3)' }}>
            Geen producten gevonden in deze categorie.
          </p>
        </div>
      )}

      {/* Affiliate disclaimer */}
      <div
        className="mt-12 rounded-xl border p-4 text-center"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text3)' }}>
          Sommige links op deze pagina zijn affiliate links. Dit betekent dat we een kleine
          commissie ontvangen als je via onze link koopt, zonder extra kosten voor jou. We
          bevelen alleen producten aan die we zelf waardevol vinden. Onze eigen cursussen zijn
          duidelijk gemarkeerd.
        </p>
      </div>
    </div>
  );
}
