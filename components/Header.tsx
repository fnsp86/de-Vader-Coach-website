'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { href: '/experience', label: 'De Experience' },
  { href: '/cursussen', label: 'Cursussen' },
  { href: '/blog', label: 'Blog' },
  { href: '/over', label: 'Over' },
  { href: '/app-download', label: 'De App' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber" style={{ backgroundColor: '#F59E0B' }}>
              <Heart className="h-5 w-5 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-extrabold" style={{ color: 'var(--text)' }}>
              De Vadercoach
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--surface2)]"
                style={{ color: 'var(--text2)' }}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://instagram.com/devadercoach.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors hover:bg-[var(--surface2)]"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" style={{ color: 'var(--text2)' }}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <ThemeToggle />
            <Link
              href="/cursussen"
              className="ml-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97]"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Bekijk cursussen
            </Link>
          </nav>

          {/* Mobile: toggle + hamburger */}
          <div className="flex md:hidden items-center gap-1">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
            {mobileOpen ? (
              <X className="h-6 w-6" style={{ color: 'var(--text)' }} />
            ) : (
              <Menu className="h-6 w-6" style={{ color: 'var(--text)' }} />
            )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden border-t px-4 pb-4 pt-2" style={{ borderColor: 'var(--border)' }}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 rounded-lg text-sm font-semibold"
              style={{ color: 'var(--text2)' }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cursussen"
            onClick={() => setMobileOpen(false)}
            className="block mt-2 px-5 py-3 rounded-xl text-sm font-bold text-black text-center"
            style={{ backgroundColor: '#F59E0B' }}
          >
            Bekijk cursussen
          </Link>
        </nav>
      )}
    </header>
  );
}
