import Link from 'next/link';
import { Heart } from 'lucide-react';

const FOOTER_LINKS = {
  'De Vadercoach': [
    { href: '/experience', label: 'De Vader Experience' },
    { href: '/over', label: 'Over ons' },
    { href: '/cursussen', label: 'Cursussen' },
    { href: '/gids', label: 'Gratis gidsen' },
    { href: '/aanbevolen', label: 'Aanbevolen' },
    { href: '/blog', label: 'Blog' },
    { href: '/app-download', label: 'De App' },
    { href: '/faq', label: 'Veelgestelde vragen' },
  ],
  Juridisch: [
    { href: '/privacy', label: 'Privacybeleid' },
    { href: '/voorwaarden', label: 'Algemene voorwaarden' },
  ],
  Contact: [
    { href: '/contact', label: 'Contactformulier' },
    { href: 'mailto:info@devadercoach.nl', label: 'info@devadercoach.nl' },
    { href: 'https://instagram.com/devadercoach.nl', label: 'Instagram' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: '#F59E0B' }}>
                <Heart className="h-4 w-4 text-black" strokeWidth={2.5} />
              </div>
              <span className="text-base font-extrabold" style={{ color: 'var(--text)' }}>
                De Vadercoach
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text3)' }}>
              Word elke dag een iets betere vader. Praktische cursussen gebaseerd op wetenschap en psychologie.
            </p>
            <a
              href="https://instagram.com/devadercoach.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 text-sm font-semibold transition-colors hover:text-amber-400"
              style={{ color: 'var(--text3)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @devadercoach.nl
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-amber-400"
                      style={{ color: 'var(--text3)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t text-center" style={{ borderColor: 'var(--border)' }}>
          <p className="text-xs" style={{ color: 'var(--text3)' }}>
            &copy; {new Date().getFullYear()} De Vadercoach. Alle rechten voorbehouden.
            {' · '}
            <a
              href="https://orembaworks.nl"
              className="transition-colors hover:text-amber-400"
              style={{ color: 'var(--text3)' }}
            >
              Website door Oremba Works
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
