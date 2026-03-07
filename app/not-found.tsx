import Link from 'next/link';
import { Home, BookOpen, FileText, Heart, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      <p className="text-6xl font-extrabold mb-4" style={{ color: 'var(--amber-text)' }}>
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: 'var(--text)' }}>
        Pagina niet gevonden
      </h1>
      <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text2)' }}>
        Deze pagina bestaat niet of is verplaatst. Geen zorgen, hieronder vind je de belangrijkste pagina&apos;s.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-400/40"
          style={{ borderColor: 'var(--border)' }}
        >
          <Home className="h-5 w-5 shrink-0" style={{ color: 'var(--amber-text)' }} />
          <div>
            <span className="text-sm font-bold block" style={{ color: 'var(--text)' }}>Home</span>
            <span className="text-xs" style={{ color: 'var(--text3)' }}>Terug naar de homepage</span>
          </div>
        </Link>

        <Link
          href="/cursussen"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-400/40"
          style={{ borderColor: 'var(--border)' }}
        >
          <BookOpen className="h-5 w-5 shrink-0" style={{ color: 'var(--amber-text)' }} />
          <div>
            <span className="text-sm font-bold block" style={{ color: 'var(--text)' }}>Cursussen</span>
            <span className="text-xs" style={{ color: 'var(--text3)' }}>Bekijk alle opvoedcursussen</span>
          </div>
        </Link>

        <Link
          href="/gids"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-400/40"
          style={{ borderColor: 'var(--border)' }}
        >
          <FileText className="h-5 w-5 shrink-0" style={{ color: 'var(--amber-text)' }} />
          <div>
            <span className="text-sm font-bold block" style={{ color: 'var(--text)' }}>Gratis gidsen</span>
            <span className="text-xs" style={{ color: 'var(--text3)' }}>Praktische opvoedgidsen</span>
          </div>
        </Link>

        <Link
          href="/blog"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-400/40"
          style={{ borderColor: 'var(--border)' }}
        >
          <Heart className="h-5 w-5 shrink-0" style={{ color: 'var(--amber-text)' }} />
          <div>
            <span className="text-sm font-bold block" style={{ color: 'var(--text)' }}>Blog</span>
            <span className="text-xs" style={{ color: 'var(--text3)' }}>Artikelen over vaderschap</span>
          </div>
        </Link>

        <Link
          href="/experience"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-400/40"
          style={{ borderColor: 'var(--border)' }}
        >
          <HelpCircle className="h-5 w-5 shrink-0" style={{ color: 'var(--amber-text)' }} />
          <div>
            <span className="text-sm font-bold block" style={{ color: 'var(--text)' }}>Vader Experience</span>
            <span className="text-xs" style={{ color: 'var(--text3)' }}>22 dagen vaderschapsprogramma</span>
          </div>
        </Link>

        <Link
          href="/contact"
          className="flex items-center gap-3 rounded-xl border p-4 transition-colors hover:border-amber-400/40"
          style={{ borderColor: 'var(--border)' }}
        >
          <HelpCircle className="h-5 w-5 shrink-0" style={{ color: 'var(--amber-text)' }} />
          <div>
            <span className="text-sm font-bold block" style={{ color: 'var(--text)' }}>Contact</span>
            <span className="text-xs" style={{ color: 'var(--text3)' }}>Stel je vraag</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
