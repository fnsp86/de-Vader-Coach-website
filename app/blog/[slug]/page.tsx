import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';

// Placeholder — later replaced by MDX
const POSTS: Record<string, {
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  content: string;
}> = {
  'aanwezig-zijn-voor-kind': {
    title: '5 Manieren om Echt Aanwezig te Zijn voor je Kind',
    description: 'Kwaliteitstijd hoeft niet uren te duren.',
    date: '2026-02-20',
    readTime: 5,
    category: 'Aanwezigheid',
    content: `
## Kwaliteitstijd is niet hetzelfde als kwantiteitstijd

Veel vaders denken dat ze uren vrij moeten maken om een goede vader te zijn. Maar onderzoek laat zien dat het niet gaat om hoeveel tijd je doorbrengt, maar om de kwaliteit van die tijd.

## 1. De 5-minuten regel

Neem elke dag 5 minuten waarin je je volledige aandacht geeft aan je kind. Geen telefoon, geen afleiding. Alleen jij en je kind.

## 2. Benoem wat je ziet

"Ik zie dat je een toren aan het bouwen bent" — deze simpele techniek laat je kind voelen dat je echt kijkt.

## 3. Volg hun lead

Laat je kind bepalen wat jullie doen. Jouw enige taak is aanwezig zijn en meedoen.

## 4. Maak oogcontact

Ga op hun niveau zitten. Oogcontact is een van de krachtigste manieren om verbinding te maken.

## 5. Rituals maken

Maak vaste momenten: een voorleesritueel, een wandeling na het eten, of een speciaal geheim handgebaar.

---

*Deze tips zijn gebaseerd op onderzoek naar ouder-kind hechting en de Circle of Security methode.*
    `,
  },
};

const DEFAULT_POST = {
  title: 'Artikel niet gevonden',
  description: '',
  date: '2026-01-01',
  readTime: 0,
  category: '',
  content: 'Dit artikel is nog niet beschikbaar. Kom binnenkort terug!',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug] ?? DEFAULT_POST;
  return { title: post.title, description: post.description };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug] ?? DEFAULT_POST;
  const formatted = new Date(post.date).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });

  // Simple markdown-to-html for placeholders (headers and paragraphs)
  const htmlContent = post.content
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) return `<h2>${trimmed.slice(3)}</h2>`;
      if (trimmed.startsWith('# ')) return `<h1>${trimmed.slice(2)}</h1>`;
      if (trimmed === '---') return '<hr />';
      if (trimmed.startsWith('*') && trimmed.endsWith('*')) return `<p><em>${trimmed.slice(1, -1)}</em></p>`;
      if (trimmed) return `<p>${trimmed}</p>`;
      return '';
    })
    .join('\n');

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 hover:gap-2.5 transition-all"
        style={{ color: 'var(--text3)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Alle artikelen
      </Link>

      <article>
        <div className="mb-8">
          <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-lg mb-3" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text2)' }}>
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4" style={{ color: 'var(--text)' }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--text3)' }}>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              De Vadercoach
            </span>
            <span>{formatted}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime} min
            </span>
          </div>
        </div>

        <div
          className="prose prose-invert max-w-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:mb-4 [&_hr]:my-6 [&_em]:text-sm"
          style={{ color: 'var(--text2)' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
