'use client';

import { useState } from 'react';
import { useAdminPassword } from '@/components/AdminAuth';
import { POSTS_LIST, getBlogPost } from '@/lib/blog-posts';
import { getAllCourses, SKILL_COLORS } from '@/lib/courses';
import { EXPERIENCE_DAYS } from '@/lib/experience';
import {
  generateBlogCaption,
  generateCourseCaption,
  generateExperienceCaption,
  extractQuote,
} from '@/lib/instagram-captions';
import {
  FileText,
  BookOpen,
  Calendar,
  Download,
  Send,
  Check,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';

type Tab = 'blog' | 'cursussen' | 'experience';
type Template = 'quote' | 'tip' | 'teaser';
type PostStatus = 'idle' | 'posting' | 'success' | 'error';

interface SelectedContent {
  type: Tab;
  title: string;
  category: string;
  caption: string;
  quoteText: string;
  subtitle: string;
}

export default function InstagramPage() {
  const password = useAdminPassword();
  const [tab, setTab] = useState<Tab>('blog');
  const [selected, setSelected] = useState<SelectedContent | null>(null);
  const [template, setTemplate] = useState<Template>('quote');
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState<PostStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const courses = getAllCourses();

  function selectBlogPost(slug: string) {
    const meta = POSTS_LIST.find((p) => p.slug === slug);
    if (!meta) return;
    const full = getBlogPost(slug);
    const quote = full ? extractQuote(full.content) : meta.description;
    const generatedCaption = generateBlogCaption({ ...meta, content: full?.content });
    setSelected({
      type: 'blog',
      title: meta.title,
      category: meta.category,
      caption: generatedCaption,
      quoteText: quote,
      subtitle: meta.description,
    });
    setCaption(generatedCaption);
    setStatus('idle');
    setErrorMsg('');
  }

  function selectCourse(slug: string) {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return;
    const generatedCaption = generateCourseCaption(course);
    setSelected({
      type: 'cursussen',
      title: course.title,
      category: course.category,
      caption: generatedCaption,
      quoteText: course.description,
      subtitle: course.longDescription.slice(0, 120) + '...',
    });
    setCaption(generatedCaption);
    setStatus('idle');
    setErrorMsg('');
  }

  function selectExperienceDay(dag: number) {
    const day = EXPERIENCE_DAYS.find((d) => d.dag === dag);
    if (!day) return;
    const generatedCaption = generateExperienceCaption(day);
    setSelected({
      type: 'experience',
      title: `Dag ${day.dag}: ${day.title}`,
      category: day.skill,
      caption: generatedCaption,
      quoteText: day.subtitle,
      subtitle: day.reflection,
    });
    setCaption(generatedCaption);
    setStatus('idle');
    setErrorMsg('');
  }

  function getImageUrl(): string {
    if (!selected) return '';
    const color = SKILL_COLORS[selected.category] ?? '#F59E0B';
    const params = new URLSearchParams({
      template,
      text: template === 'teaser' ? selected.title : selected.quoteText,
      color,
      skill: selected.category,
      subtitle: template === 'teaser' ? selected.subtitle : '',
      number: template === 'tip' ? '1' : '',
    });
    return `/api/instagram/image?${params.toString()}`;
  }

  async function handleDownload() {
    const url = getImageUrl();
    if (!url) return;
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `devadercoach-instagram-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      setErrorMsg('Kon afbeelding niet downloaden');
    }
  }

  async function handlePost() {
    if (!selected) return;
    setStatus('posting');
    setErrorMsg('');
    try {
      const fullImageUrl = `${window.location.origin}${getImageUrl()}`;
      const res = await fetch('/api/instagram/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-password': password,
        },
        body: JSON.stringify({ imageUrl: fullImageUrl, caption }),
      });
      const data = await res.json();
      if (data.error) {
        setStatus('error');
        setErrorMsg(data.error);
      } else {
        setStatus('success');
        // Save to history
        const history = JSON.parse(localStorage.getItem('ig_history') ?? '[]');
        history.unshift({
          title: selected.title,
          template,
          postedAt: new Date().toISOString(),
          postId: data.postId,
        });
        localStorage.setItem('ig_history', JSON.stringify(history.slice(0, 20)));
      }
    } catch {
      setStatus('error');
      setErrorMsg('Kon niet verbinden met Instagram');
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-6" style={{ color: 'var(--text)' }}>
        Instagram Tool
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Content browser */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          {/* Tabs */}
          <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
            {([
              { id: 'blog' as Tab, label: 'Blogposts', icon: FileText, count: POSTS_LIST.length },
              { id: 'cursussen' as Tab, label: 'Cursussen', icon: BookOpen, count: courses.length },
              { id: 'experience' as Tab, label: 'Experience', icon: Calendar, count: 22 },
            ]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 text-xs font-bold transition-colors"
                style={{
                  color: tab === t.id ? '#F59E0B' : 'var(--text3)',
                  borderBottom: tab === t.id ? '2px solid #F59E0B' : '2px solid transparent',
                }}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
                <span className="opacity-60">({t.count})</span>
              </button>
            ))}
          </div>

          {/* Content list */}
          <div className="max-h-[600px] overflow-y-auto p-3 space-y-1">
            {tab === 'blog' &&
              POSTS_LIST.map((post) => (
                <ContentItem
                  key={post.slug}
                  title={post.title}
                  badge={post.category}
                  badgeColor={SKILL_COLORS[post.category] ?? '#F59E0B'}
                  active={selected?.title === post.title}
                  onClick={() => selectBlogPost(post.slug)}
                />
              ))}
            {tab === 'cursussen' &&
              courses.map((c) => (
                <ContentItem
                  key={c.slug}
                  title={c.title}
                  badge={c.category}
                  badgeColor={SKILL_COLORS[c.category] ?? '#F59E0B'}
                  active={selected?.title === c.title}
                  onClick={() => selectCourse(c.slug)}
                />
              ))}
            {tab === 'experience' &&
              EXPERIENCE_DAYS.map((d) => (
                <ContentItem
                  key={d.dag}
                  title={`Dag ${d.dag}: ${d.title}`}
                  badge={d.skill}
                  badgeColor={SKILL_COLORS[d.skill] ?? '#F59E0B'}
                  active={selected?.title === `Dag ${d.dag}: ${d.title}`}
                  onClick={() => selectExperienceDay(d.dag)}
                />
              ))}
          </div>
        </div>

        {/* Right: Post editor */}
        <div className="space-y-4">
          {selected ? (
            <>
              {/* Image preview */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                  <ImageIcon className="h-4 w-4" style={{ color: '#F59E0B' }} />
                  <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>Preview</span>
                  <div className="ml-auto flex gap-1">
                    {(['quote', 'tip', 'teaser'] as Template[]).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTemplate(t)}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors"
                        style={{
                          backgroundColor: template === t ? '#F59E0B15' : 'transparent',
                          color: template === t ? '#F59E0B' : 'var(--text3)',
                        }}
                      >
                        {t === 'quote' ? 'Quote' : t === 'tip' ? 'Tip' : 'Blog'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl()}
                    alt="Instagram preview"
                    className="w-full aspect-square rounded-xl"
                    style={{ backgroundColor: '#111318' }}
                  />
                </div>
              </div>

              {/* Caption editor */}
              <div
                className="rounded-2xl border p-4"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>Caption</span>
                  <span className="text-[11px]" style={{ color: caption.length > 2000 ? '#EF4444' : 'var(--text3)' }}>
                    {caption.length}/2200
                  </span>
                </div>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={8}
                  className="w-full rounded-xl border px-4 py-3 text-sm resize-none outline-none focus:ring-2 focus:ring-amber-500/30"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text2)' }}
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-colors hover:border-amber-500/30"
                  style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
                >
                  <Download className="h-4 w-4" />
                  Download Afbeelding
                </button>
                <button
                  onClick={handlePost}
                  disabled={status === 'posting'}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-black transition-opacity"
                  style={{
                    backgroundColor: status === 'success' ? '#34D399' : '#F59E0B',
                    opacity: status === 'posting' ? 0.7 : 1,
                  }}
                >
                  {status === 'posting' ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Posten...</>
                  ) : status === 'success' ? (
                    <><Check className="h-4 w-4" />Gepost!</>
                  ) : (
                    <><Send className="h-4 w-4" />Post naar Instagram</>
                  )}
                </button>
              </div>

              {/* Error message */}
              {status === 'error' && errorMsg && (
                <div
                  className="flex items-start gap-2 rounded-xl border px-4 py-3"
                  style={{ borderColor: '#EF444440', backgroundColor: '#EF444410' }}
                >
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: '#EF4444' }} />
                  <p className="text-sm" style={{ color: '#EF4444' }}>{errorMsg}</p>
                </div>
              )}
            </>
          ) : (
            <div
              className="rounded-2xl border p-12 text-center"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" style={{ color: 'var(--text3)' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--text3)' }}>
                Selecteer content links om een Instagram post te genereren
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ContentItem({
  title,
  badge,
  badgeColor,
  active,
  onClick,
}: {
  title: string;
  badge: string;
  badgeColor: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
      style={{
        backgroundColor: active ? '#F59E0B10' : 'transparent',
        borderLeft: active ? '3px solid #F59E0B' : '3px solid transparent',
      }}
    >
      <span
        className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0"
        style={{ backgroundColor: badgeColor + '15', color: badgeColor }}
      >
        {badge}
      </span>
      <span
        className="text-sm font-medium truncate"
        style={{ color: active ? 'var(--text)' : 'var(--text2)' }}
      >
        {title}
      </span>
    </button>
  );
}
