'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Instagram, Mail, FileText, Settings, LogOut } from 'lucide-react';

const LINKS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/instagram', label: 'Instagram', icon: Instagram },
  { href: '/admin/nieuwsbrief', label: 'Nieuwsbrief', icon: Mail },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/instellingen', label: 'Instellingen', icon: Settings },
];

export default function AdminNav() {
  const pathname = usePathname();

  function handleLogout() {
    sessionStorage.removeItem('admin_password');
    sessionStorage.removeItem('admin_totp');
    window.location.href = '/admin';
  }

  return (
    <nav
      className="border-b px-4 sm:px-6 py-2.5 flex items-center gap-1"
      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
    >
      <span className="text-sm font-extrabold mr-4" style={{ color: '#F59E0B' }}>
        Admin
      </span>
      {LINKS.map((link) => {
        const active = link.href === '/admin' ? pathname === '/admin' : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            style={{
              color: active ? '#F59E0B' : 'var(--text3)',
              backgroundColor: active ? '#F59E0B12' : 'transparent',
            }}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
      <button
        onClick={handleLogout}
        className="ml-auto flex items-center gap-1 text-xs font-medium px-2 py-1.5 rounded-lg hover:opacity-80 transition-opacity"
        style={{ color: 'var(--text3)' }}
      >
        <LogOut className="h-3.5 w-3.5" />
        Uitloggen
      </button>
    </nav>
  );
}
