'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
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
