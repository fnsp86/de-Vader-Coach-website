import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, inzichten en praktisch advies voor vaders. Gebaseerd op wetenschap en ervaring.',
};

const PLACEHOLDER_POSTS = [
  {
    title: '5 Manieren om Echt Aanwezig te Zijn voor je Kind',
    description: 'Kwaliteitstijd hoeft niet uren te duren. Ontdek vijf bewezen technieken om in korte momenten een sterke band op te bouwen.',
    slug: 'aanwezig-zijn-voor-kind',
    date: '2026-02-20',
    readTime: 5,
    category: 'Aanwezigheid',
  },
  {
    title: 'Waarom Driftbuien Geen Gedragsprobleem Zijn',
    description: 'Wat er écht gebeurt in het brein van je kind tijdens een driftbui, en hoe je er het beste mee omgaat.',
    slug: 'driftbuien-begrijpen',
    date: '2026-02-15',
    readTime: 7,
    category: 'Emotiecoaching',
  },
  {
    title: 'Grenzen Stellen Zonder Schreeuwen',
    description: 'Praktische scripts en technieken voor het stellen van duidelijke grenzen met empathie.',
    slug: 'grenzen-zonder-schreeuwen',
    date: '2026-02-10',
    readTime: 6,
    category: 'Grenzen',
  },
  {
    title: 'De Kracht van Herstellen na een Fout',
    description: 'Iedereen maakt fouten als ouder. Wat telt is hoe je herstelt. Leer de kunst van de oprechte verontschuldiging.',
    slug: 'herstellen-na-fout',
    date: '2026-02-05',
    readTime: 4,
    category: 'Herstel',
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          Blog
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
          Tips, inzichten en praktisch advies voor vaders. Gebaseerd op wetenschap en echte ervaringen.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PLACEHOLDER_POSTS.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
