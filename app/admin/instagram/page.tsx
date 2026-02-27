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
  generateRandomContent,
  extractQuote,
  type Template,
  type SlideConfig,
} from '@/lib/instagram-captions';
import { BRAND_COLORS, SKILL_ICONS, TEMPLATE_INFO } from '@/lib/instagram-assets';
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
  Shuffle,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Palette,
  Type,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'blog' | 'cursussen' | 'experience';
type PostStatus = 'idle' | 'posting' | 'success' | 'error';

const TEMPLATE_LABELS: Record<Template, string> = {
  quote: 'Quote',
  tip: 'Tip',
  teaser: 'Blog',
  stat: 'Statistiek',
  list: 'Lijst',
  cta: 'CTA',
  skills: 'Skills',
};

function defaultSlide(color: string = '#F59E0B', skill: string = ''): SlideConfig {
  return { template: 'quote', text: '', color, skill, subtitle: '', number: '', items: [] };
}

export default function InstagramPage() {
  const password = useAdminPassword();
  const [tab, setTab] = useState<Tab>('blog');
  const [slides, setSlides] = useState<SlideConfig[]>([defaultSlide()]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState<PostStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [selectedTitle, setSelectedTitle] = useState('');
  const [showBibliotheek, setShowBibliotheek] = useState(false);

  const courses = getAllCourses();
  const current = slides[activeSlide] ?? slides[0];

  function updateSlide(index: number, updates: Partial<SlideConfig>) {
    setSlides((prev) => prev.map((s, i) => (i === index ? { ...s, ...updates } : s)));
  }

  function addSlide() {
    const color = current?.color ?? '#F59E0B';
    const skill = current?.skill ?? '';
    setSlides((prev) => [...prev, defaultSlide(color, skill)]);
    setActiveSlide(slides.length);
  }

  function removeSlide(index: number) {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((_, i) => i !== index));
    setActiveSlide(Math.min(activeSlide, slides.length - 2));
  }

  function selectBlogPost(slug: string) {
    const meta = POSTS_LIST.find((p) => p.slug === slug);
    if (!meta) return;
    const full = getBlogPost(slug);
    const quote = full ? extractQuote(full.content) : meta.description;
    const color = SKILL_COLORS[meta.category] ?? '#F59E0B';
    setSlides([{ template: 'quote', text: quote, color, skill: meta.category, subtitle: meta.description, number: '' }]);
    setActiveSlide(0);
    setCaption(generateBlogCaption({ ...meta, content: full?.content }));
    setSelectedTitle(meta.title);
    resetStatus();
  }

  function selectCourse(slug: string) {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return;
    const color = SKILL_COLORS[course.category] ?? '#F59E0B';
    setSlides([{ template: 'quote', text: course.description, color, skill: course.category, subtitle: course.longDescription.slice(0, 120) + '...', number: '' }]);
    setActiveSlide(0);
    setCaption(generateCourseCaption(course));
    setSelectedTitle(course.title);
    resetStatus();
  }

  function selectExperienceDay(dag: number) {
    const day = EXPERIENCE_DAYS.find((d) => d.dag === dag);
    if (!day) return;
    const color = SKILL_COLORS[day.skill] ?? '#F59E0B';
    setSlides([{ template: 'quote', text: day.subtitle, color, skill: day.skill, subtitle: day.reflection, number: '' }]);
    setActiveSlide(0);
    setCaption(generateExperienceCaption(day));
    setSelectedTitle(`Dag ${day.dag}: ${day.title}`);
    resetStatus();
  }

  function startVrijePost() {
    setSlides([{ template: 'quote', text: 'Typ hier je tekst', color: '#F59E0B', skill: '', subtitle: '', number: '', items: [] }]);
    setActiveSlide(0);
    setCaption('');
    setSelectedTitle('Vrije post');
    resetStatus();
  }

  function insertIntoText(value: string) {
    updateSlide(activeSlide, { text: (current.text === 'Typ hier je tekst' ? '' : current.text) + value });
  }

  function handleRandom(slideCount: number = 1) {
    const result = generateRandomContent(slideCount);
    setSlides(result.slides);
    setActiveSlide(0);
    setCaption(result.caption);
    setSelectedTitle(result.title);
    resetStatus();
  }

  function resetStatus() {
    setStatus('idle');
    setErrorMsg('');
  }

  function getImageUrl(slide: SlideConfig): string {
    const params = new URLSearchParams({
      template: slide.template,
      text: slide.text,
      color: slide.color,
      skill: slide.skill,
      subtitle: slide.subtitle || '',
      number: slide.number || '',
    });
    if (slide.items?.length) {
      params.set('items', slide.items.join('||'));
    }
    return `/api/instagram/image?${params.toString()}`;
  }

  async function handleDownload() {
    for (let i = 0; i < slides.length; i++) {
      const url = getImageUrl(slides[i]);
      try {
        const res = await fetch(url);
        const blob = await res.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `devadercoach-${slides.length > 1 ? `slide-${i + 1}-` : ''}${Date.now()}.png`;
        a.click();
        URL.revokeObjectURL(a.href);
      } catch {
        setErrorMsg(`Kon slide ${i + 1} niet downloaden`);
      }
    }
  }

  async function handlePost() {
    setStatus('posting');
    setErrorMsg('');
    try {
      const imageUrls = slides.map((s) => `${window.location.origin}${getImageUrl(s)}`);
      const res = await fetch('/api/instagram/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({
          imageUrl: imageUrls[0],
          imageUrls: imageUrls.length > 1 ? imageUrls : undefined,
          caption,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setStatus('error');
        setErrorMsg(data.error);
      } else {
        setStatus('success');
        const history = JSON.parse(localStorage.getItem('ig_history') ?? '[]');
        history.unshift({ title: selectedTitle, slides: slides.length, postedAt: new Date().toISOString(), postId: data.postId });
        localStorage.setItem('ig_history', JSON.stringify(history.slice(0, 20)));
      }
    } catch {
      setStatus('error');
      setErrorMsg('Kon niet verbinden met Instagram');
    }
  }

  async function handleSchedule() {
    const dateStr = prompt('Wanneer posten? (YYYY-MM-DD HH:mm)', new Date(Date.now() + 86400000).toISOString().slice(0, 16).replace('T', ' '));
    if (!dateStr) return;
    setStatus('posting');
    setErrorMsg('');
    try {
      const imageUrls = slides.map((s) => `${window.location.origin}${getImageUrl(s)}`);
      const res = await fetch('/api/instagram/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({
          slides: slides.map((s) => ({ ...s, imageUrl: `${window.location.origin}${getImageUrl(s)}` })),
          caption,
          scheduledAt: new Date(dateStr).toISOString(),
          title: selectedTitle,
          imageUrls,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setStatus('error');
        setErrorMsg(data.error);
      } else {
        setStatus('success');
        setErrorMsg('');
        alert(`Ingepland voor ${dateStr}`);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Kon post niet inplannen');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
          Instagram
        </h1>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/instagram/kalender"
            className="flex items-center gap-1.5 text-xs font-bold rounded-xl border px-3 sm:px-4 py-2 sm:py-2.5 transition-colors hover:border-amber-500/30"
            style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
          >
            <Calendar className="h-3.5 w-3.5" />
            Kalender
          </Link>
        </div>
      </div>

      {/* Action bar: Random + Vrije Post */}
      <div
        className="rounded-2xl border p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 overflow-x-auto"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <Shuffle className="h-4 w-4 shrink-0" style={{ color: '#F59E0B' }} />
        <span className="text-xs sm:text-sm font-bold shrink-0" style={{ color: 'var(--text)' }}>Random:</span>
        {[1, 3, 5, 8].map((n) => (
          <button
            key={n}
            onClick={() => handleRandom(n)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors hover:bg-amber-500/10 shrink-0"
            style={{ backgroundColor: 'var(--bg)', color: 'var(--text2)' }}
          >
            {n === 1 ? '1' : n}
          </button>
        ))}
        <div className="w-px h-6 shrink-0" style={{ backgroundColor: 'var(--border)' }} />
        <button
          onClick={startVrijePost}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors hover:bg-amber-500/10 shrink-0"
          style={{ backgroundColor: 'var(--bg)', color: 'var(--text2)' }}
        >
          <Type className="h-3.5 w-3.5" />
          Vrij
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left: Content browser — on mobile shows below editor via order */}
        <div
          className="rounded-2xl border overflow-hidden order-2 lg:order-1"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <div className="flex border-b" style={{ borderColor: 'var(--border)' }}>
            {([
              { id: 'blog' as Tab, label: 'Blog', icon: FileText, count: POSTS_LIST.length },
              { id: 'cursussen' as Tab, label: 'Cursussen', icon: BookOpen, count: courses.length },
              { id: 'experience' as Tab, label: 'Experience', icon: Calendar, count: 22 },
            ]).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2.5 sm:py-3 text-[11px] sm:text-xs font-bold transition-colors"
                style={{
                  color: tab === t.id ? '#F59E0B' : 'var(--text3)',
                  borderBottom: tab === t.id ? '2px solid #F59E0B' : '2px solid transparent',
                }}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
                <span className="opacity-60 hidden sm:inline">({t.count})</span>
              </button>
            ))}
          </div>

          <div className="max-h-[300px] sm:max-h-[600px] overflow-y-auto p-2 sm:p-3 space-y-1">
            {tab === 'blog' &&
              POSTS_LIST.map((post) => (
                <ContentItem
                  key={post.slug}
                  title={post.title}
                  badge={post.category}
                  badgeColor={SKILL_COLORS[post.category] ?? '#F59E0B'}
                  active={selectedTitle === post.title}
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
                  active={selectedTitle === c.title}
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
                  active={selectedTitle === `Dag ${d.dag}: ${d.title}`}
                  onClick={() => selectExperienceDay(d.dag)}
                />
              ))}
          </div>
        </div>

        {/* Right: Post editor — on mobile shows first via order */}
        <div className="space-y-3 sm:space-y-4 order-1 lg:order-2">
          {slides[0]?.text ? (
            <>
              {/* Slide thumbnails */}
              {slides.length > 1 && (
                <div
                  className="rounded-2xl border p-3"
                  style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                      Slides ({slides.length})
                    </span>
                    <button
                      onClick={addSlide}
                      className="ml-auto flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg transition-colors hover:bg-amber-500/10"
                      style={{ color: '#F59E0B' }}
                    >
                      <Plus className="h-3 w-3" /> Slide
                    </button>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {slides.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className="relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors"
                        style={{
                          borderColor: i === activeSlide ? '#F59E0B' : 'var(--border)',
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={getImageUrl(s)}
                          alt={`Slide ${i + 1}`}
                          className="w-full h-full object-cover"
                          style={{ backgroundColor: '#111318' }}
                        />
                        <span className="absolute bottom-0.5 right-0.5 text-[9px] font-bold bg-black/60 text-white px-1 rounded">
                          {i + 1}
                        </span>
                        {slides.length > 1 && i === activeSlide && (
                          <button
                            onClick={(e) => { e.stopPropagation(); removeSlide(i); }}
                            className="absolute top-0.5 right-0.5 bg-red-500/80 text-white rounded p-0.5"
                          >
                            <Trash2 className="h-2.5 w-2.5" />
                          </button>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Active slide preview */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-b space-y-2" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 shrink-0" style={{ color: '#F59E0B' }} />
                  <span className="text-xs font-bold shrink-0" style={{ color: 'var(--text)' }}>
                    {slides.length > 1 ? `Slide ${activeSlide + 1}` : 'Preview'}
                  </span>
                  <button
                    onClick={() => handleRandom(slides.length)}
                    className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg transition-colors hover:bg-amber-500/10 shrink-0"
                    style={{ color: '#F59E0B' }}
                    title="Nieuwe random content"
                  >
                    <Shuffle className="h-3 w-3" /> Shuffle
                  </button>
                  {slides.length === 1 && (
                    <button
                      onClick={addSlide}
                      className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg transition-colors hover:bg-amber-500/10 shrink-0"
                      style={{ color: 'var(--text3)' }}
                    >
                      <Plus className="h-3 w-3" /> Carousel
                    </button>
                  )}
                </div>
                <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1">
                  {(Object.keys(TEMPLATE_LABELS) as Template[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => updateSlide(activeSlide, { template: t })}
                      className="text-[11px] font-bold px-2.5 py-1 rounded-lg transition-colors shrink-0"
                      style={{
                        backgroundColor: current.template === t ? '#F59E0B15' : 'transparent',
                        color: current.template === t ? '#F59E0B' : 'var(--text3)',
                      }}
                    >
                      {TEMPLATE_LABELS[t]}
                    </button>
                  ))}
                </div>
              </div>
                <div className="p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImageUrl(current)}
                    alt="Instagram preview"
                    className="w-full aspect-square rounded-xl"
                    style={{ backgroundColor: '#111318' }}
                  />
                </div>

                {/* Slide navigation */}
                {slides.length > 1 && (
                  <div className="flex items-center justify-center gap-3 pb-4">
                    <button
                      onClick={() => setActiveSlide(Math.max(0, activeSlide - 1))}
                      disabled={activeSlide === 0}
                      className="p-1.5 rounded-lg disabled:opacity-20"
                      style={{ color: 'var(--text2)' }}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className="w-2 h-2 rounded-full transition-colors"
                        style={{ backgroundColor: i === activeSlide ? '#F59E0B' : 'var(--border)' }}
                      />
                    ))}
                    <button
                      onClick={() => setActiveSlide(Math.min(slides.length - 1, activeSlide + 1))}
                      disabled={activeSlide === slides.length - 1}
                      className="p-1.5 rounded-lg disabled:opacity-20"
                      style={{ color: 'var(--text2)' }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Slide text editor */}
              <div
                className="rounded-2xl border p-4"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <span className="text-xs font-bold mb-2 block" style={{ color: 'var(--text)' }}>
                  Slide tekst
                </span>
                <input
                  value={current.text}
                  onChange={(e) => updateSlide(activeSlide, { text: e.target.value })}
                  className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/30 mb-2"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text2)' }}
                  placeholder="Hoofdtekst"
                />
                {(current.template === 'teaser' || current.template === 'stat' || current.template === 'cta') && (
                  <input
                    value={current.subtitle}
                    onChange={(e) => updateSlide(activeSlide, { subtitle: e.target.value })}
                    className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/30 mb-2"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text2)' }}
                    placeholder="Subtekst"
                  />
                )}
                {current.template === 'tip' && (
                  <input
                    value={current.number}
                    onChange={(e) => updateSlide(activeSlide, { number: e.target.value })}
                    className="w-24 rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/30 mb-2"
                    style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text2)' }}
                    placeholder="#"
                  />
                )}
                {/* Skill icons quick insert — sets skill + color on the slide */}
                <div className="flex items-center gap-1 sm:gap-1.5 mt-2 overflow-x-auto pb-1">
                  <span className="text-[11px] font-bold mr-1 shrink-0" style={{ color: 'var(--text3)' }}>Icoon:</span>
                  {Object.entries(SKILL_ICONS).map(([name, { icon: Icon }]) => {
                    const clr = SKILL_COLORS[name] ?? '#F59E0B';
                    const isActive = current.skill === name;
                    return (
                      <button
                        key={name}
                        onClick={() => updateSlide(activeSlide, { skill: name, color: clr })}
                        title={name}
                        className="p-2 sm:p-1.5 rounded-lg transition-all shrink-0"
                        style={{
                          color: clr,
                          backgroundColor: isActive ? clr + '20' : 'transparent',
                          transform: isActive ? 'scale(1.15)' : 'scale(1)',
                        }}
                      >
                        <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
                      </button>
                    );
                  })}
                </div>
                {/* Color picker */}
                <div className="flex items-center gap-1.5 sm:gap-2 mt-2 overflow-x-auto pb-1">
                  <span className="text-[11px] font-bold shrink-0" style={{ color: 'var(--text3)' }}>Kleur:</span>
                  {Object.entries(SKILL_COLORS).map(([name, clr]) => (
                    <button
                      key={name}
                      onClick={() => updateSlide(activeSlide, { color: clr, skill: name })}
                      title={name}
                      className="w-8 h-8 sm:w-6 sm:h-6 rounded-full transition-transform shrink-0"
                      style={{
                        backgroundColor: clr,
                        border: current.color === clr ? '2px solid white' : '2px solid transparent',
                        transform: current.color === clr ? 'scale(1.15)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Bibliotheek panel */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
              >
                <button
                  onClick={() => setShowBibliotheek(!showBibliotheek)}
                  className="w-full flex items-center gap-2 px-4 py-3 transition-colors hover:bg-amber-500/5"
                >
                  <Palette className="h-4 w-4" style={{ color: '#F59E0B' }} />
                  <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>
                    Bibliotheek
                  </span>
                  <span className="text-[11px]" style={{ color: 'var(--text3)' }}>
                    Iconen, kleuren &amp; templates
                  </span>
                  <ChevronRight
                    className="h-3.5 w-3.5 ml-auto transition-transform"
                    style={{ color: 'var(--text3)', transform: showBibliotheek ? 'rotate(90deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {showBibliotheek && (
                  <div className="px-4 pb-4 space-y-4">
                    {/* Skill icons */}
                    <div>
                      <span className="text-[11px] font-bold block mb-2" style={{ color: 'var(--text3)' }}>
                        Vaardigheid iconen — klik om in te voegen
                      </span>
                      <div className="grid grid-cols-4 sm:grid-cols-4 gap-1 sm:gap-1.5">
                        {Object.entries(SKILL_ICONS).map(([name, { icon: Icon }]) => {
                          const clr = SKILL_COLORS[name] ?? '#F59E0B';
                          const isActive = current.skill === name;
                          return (
                            <button
                              key={name}
                              onClick={() => updateSlide(activeSlide, { skill: name, color: clr })}
                              className="flex flex-col items-center gap-1 sm:gap-1.5 rounded-xl border px-1.5 sm:px-2 py-2 sm:py-3 transition-colors hover:border-amber-500/40"
                              style={{
                                borderColor: isActive ? clr : 'var(--border)',
                                backgroundColor: isActive ? clr + '15' : clr + '08',
                              }}
                            >
                              <div
                                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center"
                                style={{ backgroundColor: clr + '20' }}
                              >
                                <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" style={{ color: clr }} />
                              </div>
                              <span className="text-[8px] sm:text-[9px] font-bold truncate w-full text-center" style={{ color: isActive ? clr : 'var(--text2)' }}>
                                {name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Brand colors */}
                    <div>
                      <span className="text-[11px] font-bold block mb-2" style={{ color: 'var(--text3)' }}>
                        Brand kleuren — klik om toe te passen
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {BRAND_COLORS.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => updateSlide(activeSlide, { color: c.hex, skill: Object.keys(SKILL_ICONS).includes(c.name) ? c.name : current.skill })}
                            title={c.name}
                            className="flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 transition-colors hover:border-amber-500/40"
                            style={{
                              borderColor: current.color === c.hex ? c.hex : 'var(--border)',
                              backgroundColor: current.color === c.hex ? c.hex + '15' : 'transparent',
                            }}
                          >
                            <div
                              className="w-4 h-4 rounded-full shrink-0"
                              style={{
                                backgroundColor: c.hex,
                                border: c.hex === '#F0F2F8' ? '1px solid var(--border)' : 'none',
                              }}
                            />
                            <span className="text-[10px] font-bold" style={{ color: current.color === c.hex ? c.hex : 'var(--text3)' }}>
                              {c.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Template gallery */}
                    <div>
                      <span className="text-[11px] font-bold block mb-2" style={{ color: 'var(--text3)' }}>
                        Templates — klik om te kiezen
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                        {Object.entries(TEMPLATE_INFO).map(([key, info]) => (
                          <button
                            key={key}
                            onClick={() => updateSlide(activeSlide, { template: key as Template })}
                            className="rounded-xl border px-3 py-2.5 text-left transition-colors hover:border-amber-500/40"
                            style={{
                              borderColor: current.template === key ? '#F59E0B' : 'var(--border)',
                              backgroundColor: current.template === key ? '#F59E0B08' : 'transparent',
                            }}
                          >
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-sm">{info.icon}</span>
                              <span className="text-[11px] font-bold" style={{ color: current.template === key ? '#F59E0B' : 'var(--text)' }}>
                                {info.name}
                              </span>
                            </div>
                            <span className="text-[9px] leading-tight" style={{ color: 'var(--text3)' }}>
                              {info.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
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
                  rows={6}
                  className="w-full rounded-xl border px-4 py-3 text-sm resize-none outline-none focus:ring-2 focus:ring-amber-500/30"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text2)' }}
                />
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 sm:flex gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 rounded-xl border py-3 px-3 text-xs sm:text-sm font-bold transition-colors hover:border-amber-500/30 sm:flex-1"
                  style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
                >
                  <Download className="h-4 w-4" />
                  Download{slides.length > 1 ? ` (${slides.length})` : ''}
                </button>
                <button
                  onClick={handleSchedule}
                  className="flex items-center justify-center gap-2 rounded-xl border py-3 px-3 text-xs sm:text-sm font-bold transition-colors hover:border-amber-500/30"
                  style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
                >
                  <Clock className="h-4 w-4" />
                  Inplannen
                </button>
                <button
                  onClick={handlePost}
                  disabled={status === 'posting'}
                  className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 rounded-xl py-3 text-xs sm:text-sm font-bold text-black transition-opacity sm:flex-1"
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
                    <><Send className="h-4 w-4" />Post nu</>
                  )}
                </button>
              </div>

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
              className="rounded-2xl border p-6 sm:p-12 text-center"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <ImageIcon className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-20" style={{ color: 'var(--text3)' }} />
              <p className="text-xs sm:text-sm font-medium mb-3 sm:mb-4" style={{ color: 'var(--text3)' }}>
                Kies content, genereer random, of maak een vrije post
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleRandom(1)}
                  className="inline-flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-black"
                  style={{ backgroundColor: '#F59E0B' }}
                >
                  <Shuffle className="h-4 w-4" />
                  Random
                </button>
                <button
                  onClick={startVrijePost}
                  className="inline-flex items-center gap-2 rounded-xl border px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold transition-colors hover:border-amber-500/30"
                  style={{ borderColor: 'var(--border)', color: 'var(--text2)' }}
                >
                  <Type className="h-4 w-4" />
                  Vrij
                </button>
              </div>
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
