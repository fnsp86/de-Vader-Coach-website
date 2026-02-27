'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAdminPassword } from '@/components/AdminAuth';
import { POSTS_LIST } from '@/lib/blog-posts';
import { getAllCourses, SKILL_COLORS } from '@/lib/courses';
import {
  FileText,
  BookOpen,
  CreditCard,
  ExternalLink,
  Instagram,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

interface Stats {
  payments: {
    total: number;
    revenue: number;
    recent: Array<{
      id: string;
      amount: string;
      description: string;
      status: string;
      createdAt: string;
    }>;
  };
}

export default function AdminDashboard() {
  const password = useAdminPassword();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  const courses = getAllCourses();
  const blogCount = POSTS_LIST.length;
  const courseCount = courses.length;

  useEffect(() => {
    if (!password) return;
    fetch('/api/admin/stats', { headers: { 'x-admin-password': password } })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [password]);

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: 'var(--text)' }}>
        Dashboard
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={FileText} label="Blogposts" value={blogCount} color="#667eea" />
        <StatCard icon={BookOpen} label="Cursussen" value={courseCount} color="#A78BFA" />
        <StatCard
          icon={CreditCard}
          label="Betalingen"
          value={loading ? '...' : stats?.payments.total ?? 0}
          color="#34D399"
        />
        <StatCard
          icon={TrendingUp}
          label="Omzet"
          value={loading ? '...' : `\u20AC${(stats?.payments.revenue ?? 0).toFixed(2)}`}
          color="#F59E0B"
        />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <QuickLink href="/admin/instagram" label="Instagram Tool" icon={Instagram} />
        <QuickLink href="https://my.mollie.com/dashboard" label="Mollie Dashboard" icon={CreditCard} external />
        <QuickLink href="https://resend.com/emails" label="Resend E-mails" icon={ExternalLink} external />
        <QuickLink href="https://vercel.com/dashboard" label="Vercel Analytics" icon={BarChart3} external />
      </div>

      {/* Recent payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section title="Recente betalingen">
          {loading ? (
            <p className="text-sm" style={{ color: 'var(--text3)' }}>Laden...</p>
          ) : stats?.payments.recent.length ? (
            <div className="space-y-2">
              {stats.payments.recent.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between rounded-xl px-4 py-3 border"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                      {p.description}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text3)' }}>
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString('nl-NL') : ''}
                    </p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: '#34D399' }}>
                    +&euro;{p.amount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm" style={{ color: 'var(--text3)' }}>Nog geen betalingen</p>
          )}
        </Section>

        {/* Content overview */}
        <Section title="Content overzicht">
          <div className="space-y-1.5 max-h-80 overflow-y-auto">
            {POSTS_LIST.slice(0, 10).map((post) => (
              <div
                key={post.slug}
                className="flex items-center gap-3 rounded-lg px-3 py-2"
                style={{ backgroundColor: 'var(--bg)' }}
              >
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: (SKILL_COLORS[post.category] ?? '#F59E0B') + '15',
                    color: SKILL_COLORS[post.category] ?? '#F59E0B',
                  }}
                >
                  {post.category}
                </span>
                <span className="text-sm font-medium truncate flex-1" style={{ color: 'var(--text2)' }}>
                  {post.title}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ComponentType<{ className?: string; color?: string }>;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-lg p-1.5" style={{ backgroundColor: color + '15' }}>
          <Icon className="h-4 w-4" color={color} />
        </div>
        <span className="text-xs font-semibold" style={{ color: 'var(--text3)' }}>
          {label}
        </span>
      </div>
      <p className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
        {value}
      </p>
    </div>
  );
}

function QuickLink({
  href,
  label,
  icon: Icon,
  external,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  external?: boolean;
}) {
  const Component = external ? 'a' : Link;
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Component
      href={href}
      className="flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors hover:border-amber-500/30"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text2)' }}
      {...(props as Record<string, string>)}
    >
      <Icon className="h-4 w-4 shrink-0" color="#F59E0B" />
      {label}
      {external && <ExternalLink className="h-3 w-3 ml-auto opacity-40" />}
    </Component>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-5"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <h2 className="text-sm font-bold mb-4" style={{ color: 'var(--text)' }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
