import Link from 'next/link';
import { Heart } from 'lucide-react';

const FOOTER_LINKS = {
  'De Vadercoach': [
    { href: '/over', label: 'Over ons' },
    { href: '/cursussen', label: 'Cursussen' },
    { href: '/blog', label: 'Blog' },
    { href: '/app-download', label: 'De App' },
  ],
  Juridisch: [
    { href: '/privacy', label: 'Privacybeleid' },
    { href: '/voorwaarden', label: 'Algemene voorwaarden' },
  ],
  Contact: [
    { href: '/contact', label: 'Contactformulier' },
    { href: 'mailto:info@devadercoach.nl', label: 'info@devadercoach.nl' },
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
          </p>
        </div>
      </div>
    </footer>
  );
}
