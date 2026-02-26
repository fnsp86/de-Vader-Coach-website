import type { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tips, inzichten en praktisch advies voor vaders. Gebaseerd op wetenschap en ervaring.',
};

const POSTS_LIST = [
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
    description: 'Wat er echt gebeurt in het brein van je kind tijdens een driftbui, en hoe je er het beste mee omgaat.',
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
  {
    title: 'Waarom Je Kind Precies Jouw Triggers Kent',
    description: 'Je kind drukt op je knoppen als geen ander. Begrijp waarom, en leer er anders mee omgaan.',
    slug: 'waarom-je-kind-je-triggers',
    date: '2026-01-28',
    readTime: 6,
    category: 'Zelfregulatie',
  },
  {
    title: 'Loslaten Zonder Angst: Je Kind Ruimte Geven',
    description: 'De paradox van beschermen en loslaten. Hoe geef je je kind autonomie zonder de verbinding te verliezen?',
    slug: 'loslaten-zonder-angst',
    date: '2026-01-20',
    readTime: 5,
    category: 'Autonomie',
  },
  {
    title: 'Praten met je Tiener: Waarom Zij-aan-Zij Werkt',
    description: 'Je tiener wil niet praten? Probeer het eens zij aan zij in plaats van tegenover elkaar.',
    slug: 'praten-met-je-tiener',
    date: '2026-01-12',
    readTime: 5,
    category: 'Verbinding',
  },
  {
    title: 'Reflecteren als Vader: De Meest Onderschatte Vaardigheid',
    description: 'De vader die begrijpt waarom hij boos wordt, is al aan het veranderen.',
    slug: 'reflecteren-als-vader',
    date: '2026-01-05',
    readTime: 4,
    category: 'Reflectie',
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
        {POSTS_LIST.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
