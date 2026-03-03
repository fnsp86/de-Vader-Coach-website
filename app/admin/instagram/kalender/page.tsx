'use client';

import { useState, useEffect } from 'react';
import { useAdminPassword } from '@/components/AdminAuth';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Trash2,
  Check,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Clock,
  Send,
  Video,
} from 'lucide-react';

interface ScheduledPost {
  id: string;
  type: 'single' | 'carousel';
  title: string;
  caption: string;
  imageUrls: string[];
  scheduledAt: string;
  status: 'scheduled' | 'posting' | 'posted' | 'failed';
  postId?: string;
  error?: string;
  createdAt: string;
  mediaType?: 'image' | 'reel';
  videoUrl?: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  scheduled: { bg: '#3B82F620', text: '#3B82F6', label: 'Gepland' },
  posting: { bg: '#F59E0B20', text: '#F59E0B', label: 'Bezig...' },
  posted: { bg: '#34D39920', text: '#34D399', label: 'Gepost' },
  failed: { bg: '#EF444420', text: '#EF4444', label: 'Mislukt' },
};

const MONTHS_NL = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];
const DAYS_NL = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

export default function KalenderPage() {
  const password = useAdminPassword();
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedPost, setSelectedPost] = useState<ScheduledPost | null>(null);

  useEffect(() => {
    if (!password) return;
    fetchPosts();
  }, [password]);

  async function fetchPosts() {
    try {
      const res = await fetch('/api/instagram/schedule', {
        headers: { 'x-admin-password': password },
        cache: 'no-store',
      });
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      // ignore
    }
    setLoading(false);
  }

  const [publishing, setPublishing] = useState(false);

  async function publishNow(id: string) {
    if (!confirm('Nu direct posten op Instagram?')) return;
    setPublishing(true);
    try {
      const res = await fetch('/api/instagram/schedule', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.error) {
        alert(`Fout: ${data.error}`);
      } else {
        const warnings: string[] = [];
        if (data.facebookError) warnings.push(`Facebook: ${data.facebookError}`);
        if (data.storyError) warnings.push(`Story: ${data.storyError}`);
        if (warnings.length) {
          alert(`Gepost op Instagram!\n\nMaar met problemen:\n${warnings.join('\n')}`);
        } else {
          alert('Gepost!');
        }
      }
      await fetchPosts();
      setSelectedPost(null);
    } catch {
      alert('Kon niet posten');
    }
    setPublishing(false);
  }

  async function deletePost(id: string) {
    if (!confirm('Weet je zeker dat je deze post wilt verwijderen?')) return;
    try {
      const res = await fetch('/api/instagram/schedule', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!data.success) {
        alert('Kon post niet verwijderen');
        return;
      }
    } catch {
      alert('Kon post niet verwijderen');
      return;
    }
    if (selectedPost?.id === id) setSelectedPost(null);
    await fetchPosts();
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  }

  // Calendar grid
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // Monday = 0
  const totalDays = lastDay.getDate();
  const todayStr = new Date().toISOString().slice(0, 10);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let i = 1; i <= totalDays; i++) cells.push(i);
  while (cells.length % 7 !== 0) cells.push(null);

  function getPostsForDay(day: number): ScheduledPost[] {
    const dateStr = `${String(day).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}-${year}`;
    return posts.filter((p) => {
      const d = new Date(p.scheduledAt);
      const nlDate = d.toLocaleDateString('nl-NL', { timeZone: 'Europe/Amsterdam', day: '2-digit', month: '2-digit', year: 'numeric' });
      return nlDate === dateStr;
    });
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/instagram"
          className="p-2 rounded-lg transition-colors hover:bg-amber-500/10"
          style={{ color: 'var(--text2)' }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
          Post Kalender
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div
          className="lg:col-span-2 rounded-2xl border p-5"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-amber-500/10" style={{ color: 'var(--text2)' }}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>
              {MONTHS_NL[month]} {year}
            </span>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-amber-500/10" style={{ color: 'var(--text2)' }}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS_NL.map((d) => (
              <div key={d} className="text-center text-[11px] font-bold py-1" style={{ color: 'var(--text3)' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={i} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isToday = dateStr === todayStr;
              const dayPosts = getPostsForDay(day);

              return (
                <div
                  key={i}
                  className="min-h-[80px] rounded-xl p-1.5 border transition-colors"
                  style={{
                    borderColor: isToday ? '#F59E0B40' : 'var(--border)',
                    backgroundColor: isToday ? '#F59E0B08' : 'var(--bg)',
                  }}
                >
                  <span
                    className="text-xs font-bold block mb-1"
                    style={{ color: isToday ? '#F59E0B' : 'var(--text3)' }}
                  >
                    {day}
                  </span>
                  {dayPosts.map((p) => {
                    const s = STATUS_COLORS[p.status] ?? STATUS_COLORS.scheduled;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPost(p)}
                        className="w-full text-left rounded px-1.5 py-0.5 mb-0.5 truncate text-[10px] font-medium"
                        style={{ backgroundColor: s.bg, color: s.text }}
                      >
                        {p.mediaType === 'reel' ? '🎬 ' : p.type === 'carousel' ? '📱 ' : ''}{p.title.slice(0, 20)}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: Selected post or upcoming */}
        <div className="space-y-4">
          {selectedPost ? (
            <div
              className="rounded-2xl border p-5"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>Post details</span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs" style={{ color: 'var(--text3)' }}
                >
                  Sluiten
                </button>
              </div>

              {/* Preview */}
              {selectedPost.mediaType === 'reel' ? (
                <div className="mb-3 flex items-center justify-center aspect-square rounded-xl" style={{ backgroundColor: '#111318' }}>
                  <Video className="h-12 w-12 opacity-30" style={{ color: 'var(--text3)' }} />
                </div>
              ) : selectedPost.imageUrls[0] ? (
                <div className="mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selectedPost.imageUrls[0]}
                    alt="Preview"
                    className="w-full aspect-square rounded-xl"
                    style={{ backgroundColor: '#111318' }}
                  />
                </div>
              ) : null}

              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                  {selectedPost.title}
                </h3>
                {selectedPost.mediaType === 'reel' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}>
                    Reel
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mb-3">
                {(() => {
                  const s = STATUS_COLORS[selectedPost.status] ?? STATUS_COLORS.scheduled;
                  return (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: s.bg, color: s.text }}>
                      {s.label}
                    </span>
                  );
                })()}
                <span className="text-xs" style={{ color: 'var(--text3)' }}>
                  <Clock className="h-3 w-3 inline mr-1" />
                  {new Date(selectedPost.scheduledAt).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
                {selectedPost.type === 'carousel' && (
                  <span className="text-[11px]" style={{ color: 'var(--text3)' }}>
                    <ImageIcon className="h-3 w-3 inline mr-0.5" />{selectedPost.imageUrls.length} slides
                  </span>
                )}
              </div>

              {selectedPost.caption && (
                <p className="text-xs mb-3 line-clamp-4 whitespace-pre-wrap" style={{ color: 'var(--text2)' }}>
                  {selectedPost.caption}
                </p>
              )}

              {selectedPost.error && (
                <div className="flex items-start gap-2 rounded-xl px-3 py-2 mb-3" style={{ backgroundColor: '#EF444410' }}>
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
                  <p className="text-xs" style={{ color: '#EF4444' }}>{selectedPost.error}</p>
                </div>
              )}

              {selectedPost.status === 'scheduled' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => publishNow(selectedPost.id)}
                    disabled={publishing}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-colors"
                    style={{ backgroundColor: '#F59E0B', color: '#111318' }}
                  >
                    {publishing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    {publishing ? 'Posten...' : 'Nu posten'}
                  </button>
                  <button
                    onClick={() => deletePost(selectedPost.id)}
                    className="flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition-colors hover:border-red-400/40"
                    style={{ borderColor: 'var(--border)', color: '#EF4444' }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {selectedPost.status === 'posted' && selectedPost.postId && (
                <div className="flex items-center gap-1.5 text-xs" style={{ color: '#34D399' }}>
                  <Check className="h-3.5 w-3.5" /> Gepubliceerd
                </div>
              )}
            </div>
          ) : (
            <div
              className="rounded-2xl border p-5"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--text)' }}>Komende posts</h2>
              {loading ? (
                <div className="flex items-center gap-2 py-4 justify-center">
                  <Loader2 className="h-4 w-4 animate-spin" style={{ color: 'var(--text3)' }} />
                  <span className="text-xs" style={{ color: 'var(--text3)' }}>Laden...</span>
                </div>
              ) : posts.filter((p) => p.status === 'scheduled').length ? (
                <div className="space-y-2">
                  {posts.filter((p) => p.status === 'scheduled').slice(0, 10).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPost(p)}
                      className="w-full text-left rounded-xl border px-3 py-2.5 transition-colors hover:border-amber-500/30"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold truncate" style={{ color: 'var(--text)' }}>
                          {p.title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          {p.mediaType === 'reel' && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}>
                              Reel
                            </span>
                          )}
                          {p.type === 'carousel' && p.mediaType !== 'reel' && (
                            <span className="text-[10px]" style={{ color: 'var(--text3)' }}>
                              {p.imageUrls.length} slides
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px]" style={{ color: 'var(--text3)' }}>
                        <Clock className="h-3 w-3 inline mr-1" />
                        {new Date(p.scheduledAt).toLocaleString('nl-NL', { timeZone: 'Europe/Amsterdam', weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs py-4 text-center" style={{ color: 'var(--text3)' }}>
                  Nog geen posts ingepland
                </p>
              )}
            </div>
          )}

          {/* Legend */}
          <div
            className="rounded-2xl border p-4"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <span className="text-xs font-bold block mb-2" style={{ color: 'var(--text)' }}>Legenda</span>
            <div className="space-y-1.5">
              {Object.entries(STATUS_COLORS).map(([key, s]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: s.bg, border: `1px solid ${s.text}` }} />
                  <span className="text-[11px]" style={{ color: 'var(--text2)' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
