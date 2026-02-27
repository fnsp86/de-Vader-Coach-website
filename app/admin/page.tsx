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
  Eye,
  Users,
  Globe,
  Monitor,
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

interface AnalyticsData {
  today: { pageviews: number; visitors: number };
  days: Array<{ date: string; pageviews: number; visitors: number }>;
  topPages: Array<{ path: string; count: number }>;
  topReferrers: Array<{ referrer: string; count: number }>;
  countries: Array<{ country: string; count: number }>;
  recent: Array<{
    path: string;
    ip: string;
    referrer: string;
    userAgent: string;
    country: string;
    timestamp: string;
  }>;
}

export default function AdminDashboard() {
  const password = useAdminPassword();
  const [stats, setStats] = useState<Stats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [analyticsError, setAnalyticsError] = useState('');
  const [loading, setLoading] = useState(true);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

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

    fetch('/api/admin/analytics?days=30', { headers: { 'x-admin-password': password } })
      .then(async (r) => {
        const data = await r.json();
        if (data.error) {
          setAnalyticsError(data.error);
        } else {
          setAnalytics(data);
        }
      })
      .catch(() => setAnalyticsError('Kon analytics niet laden'))
      .finally(() => setAnalyticsLoading(false));
  }, [password]);

  // Calculate totals from analytics
  const totalPageviews7d = analytics?.days.slice(0, 7).reduce((s, d) => s + d.pageviews, 0) ?? 0;
  const totalVisitors7d = analytics?.days.slice(0, 7).reduce((s, d) => s + d.visitors, 0) ?? 0;

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

      {/* Analytics stat cards */}
      {analytics && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Eye}
            label="Vandaag"
            value={analyticsLoading ? '...' : `${analytics.today.pageviews} views`}
            color="#3B82F6"
          />
          <StatCard
            icon={Users}
            label="Bezoekers vandaag"
            value={analyticsLoading ? '...' : analytics.today.visitors}
            color="#8B5CF6"
          />
          <StatCard
            icon={Eye}
            label="Views (7d)"
            value={analyticsLoading ? '...' : totalPageviews7d}
            color="#06B6D4"
          />
          <StatCard
            icon={Users}
            label="Bezoekers (7d)"
            value={analyticsLoading ? '...' : totalVisitors7d}
            color="#EC4899"
          />
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <QuickLink href="/admin/instagram" label="Instagram Tool" icon={Instagram} />
        <QuickLink href="https://my.mollie.com/dashboard" label="Mollie Dashboard" icon={CreditCard} external />
        <QuickLink href="https://resend.com/emails" label="Resend E-mails" icon={ExternalLink} external />
        <QuickLink href="https://vercel.com/dashboard" label="Vercel Analytics" icon={BarChart3} external />
      </div>

      {/* Analytics chart */}
      {analytics && (
        <div className="mb-6">
          <Section title="Pageviews (30 dagen)">
            <MiniChart days={analytics.days} />
          </Section>
        </div>
      )}

      {/* Analytics details */}
      {analytics && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Section title="Top pagina's vandaag">
            {analytics.topPages.length ? (
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {analytics.topPages.map((p) => (
                  <div
                    key={p.path}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{ backgroundColor: 'var(--bg)' }}
                  >
                    <span className="text-sm font-medium truncate flex-1" style={{ color: 'var(--text2)' }}>
                      {p.path}
                    </span>
                    <span className="text-xs font-bold ml-2" style={{ color: '#3B82F6' }}>
                      {p.count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text3)' }}>Nog geen data</p>
            )}
          </Section>

          <Section title="Referrers">
            {analytics.topReferrers.length ? (
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {analytics.topReferrers.map((r) => (
                  <div
                    key={r.referrer}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{ backgroundColor: 'var(--bg)' }}
                  >
                    <span className="text-sm font-medium truncate flex-1" style={{ color: 'var(--text2)' }}>
                      {r.referrer}
                    </span>
                    <span className="text-xs font-bold ml-2" style={{ color: '#8B5CF6' }}>
                      {r.count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text3)' }}>Nog geen data</p>
            )}
          </Section>

          <Section title="Landen">
            {analytics.countries.length ? (
              <div className="space-y-1.5 max-h-64 overflow-y-auto">
                {analytics.countries.map((c) => (
                  <div
                    key={c.country}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{ backgroundColor: 'var(--bg)' }}
                  >
                    <span className="text-sm font-medium" style={{ color: 'var(--text2)' }}>
                      <Globe className="h-3.5 w-3.5 inline mr-1.5 opacity-50" />
                      {c.country || 'Onbekend'}
                    </span>
                    <span className="text-xs font-bold ml-2" style={{ color: '#06B6D4' }}>
                      {c.count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text3)' }}>Nog geen data</p>
            )}
          </Section>
        </div>
      )}

      {/* Recent visitors + payments + content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Recent visitors with IPs */}
        {analytics && (
          <Section title="Recente bezoekers">
            {analytics.recent.length ? (
              <div className="space-y-1.5 max-h-96 overflow-y-auto">
                {analytics.recent.map((v, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-4 py-3 border"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                        {v.path}
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--text3)' }}>
                        {formatTime(v.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--surface)', color: '#3B82F6' }}>
                        {v.ip}
                      </span>
                      {v.country && (
                        <span className="text-xs" style={{ color: 'var(--text3)' }}>
                          <Globe className="h-3 w-3 inline mr-0.5" />{v.country}
                        </span>
                      )}
                      {v.referrer && (
                        <span className="text-xs truncate max-w-40" style={{ color: 'var(--text3)' }}>
                          via {cleanReferrer(v.referrer)}
                        </span>
                      )}
                      <span className="text-xs truncate max-w-32" style={{ color: 'var(--text3)' }}>
                        <Monitor className="h-3 w-3 inline mr-0.5" />{parseDevice(v.userAgent)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: 'var(--text3)' }}>Nog geen bezoekers</p>
            )}
          </Section>
        )}

        {/* Analytics not configured message */}
        {!analytics && !analyticsLoading && analyticsError && (
          <Section title="Analytics">
            <div
              className="rounded-xl border px-4 py-3"
              style={{ borderColor: '#F59E0B40', backgroundColor: '#F59E0B10' }}
            >
              <p className="text-sm" style={{ color: '#F59E0B' }}>{analyticsError}</p>
              <p className="text-xs mt-2" style={{ color: 'var(--text3)' }}>
                Ga naar Vercel → Storage → Create Redis Database → Link aan je project.
                De env vars KV_REST_API_URL en KV_REST_API_TOKEN worden automatisch toegevoegd.
              </p>
            </div>
          </Section>
        )}

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
      </div>

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
  );
}

/* ── Mini bar chart ── */
function MiniChart({ days }: { days: AnalyticsData['days'] }) {
  const reversed = [...days].reverse();
  const max = Math.max(...reversed.map((d) => d.pageviews), 1);

  return (
    <div className="flex items-end gap-1 h-32">
      {reversed.map((d) => {
        const height = Math.max((d.pageviews / max) * 100, 2);
        return (
          <div
            key={d.date}
            className="flex-1 group relative"
            style={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}
          >
            <div
              className="w-full rounded-t transition-colors"
              style={{
                height: `${height}%`,
                backgroundColor: '#3B82F630',
                borderTop: '2px solid #3B82F6',
              }}
            />
            <div
              className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block rounded px-2 py-1 text-[10px] font-bold whitespace-nowrap z-10"
              style={{ backgroundColor: 'var(--text)', color: 'var(--bg)' }}
            >
              {d.date.slice(5)}: {d.pageviews} views, {d.visitors} bezoekers
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Helpers ── */
function formatTime(ts: string): string {
  try {
    const d = new Date(ts);
    return d.toLocaleString('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function cleanReferrer(ref: string): string {
  try {
    return new URL(ref).hostname;
  } catch {
    return ref.slice(0, 30);
  }
}

function parseDevice(ua: string): string {
  if (!ua) return 'Onbekend';
  if (/iPhone/i.test(ua)) return 'iPhone';
  if (/iPad/i.test(ua)) return 'iPad';
  if (/Android/i.test(ua)) return 'Android';
  if (/Mac/i.test(ua)) return 'Mac';
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Overig';
}

/* ── Reusable components ── */
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
