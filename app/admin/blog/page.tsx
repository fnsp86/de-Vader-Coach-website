'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAdminPassword } from '@/components/AdminAuth';
import {
  FileText, Plus, Loader2, Trash2, Eye, Save, ArrowLeft, Clock,
  Wand2, ExternalLink, Check, AlertCircle,
} from 'lucide-react';
import { POSTS_LIST, type BlogPostMeta } from '@/lib/blog-posts';
import { BLOG_TEMPLATES, generateSlug, estimateReadTime, type DynamicBlogPost } from '@/lib/blog-templates';

const CATEGORIES = [
  'Aanwezigheid', 'Emotiecoaching', 'Zelfregulatie', 'Grenzen',
  'Autonomie', 'Herstel', 'Verbinding', 'Reflectie',
];

const CATEGORY_COLORS: Record<string, string> = {
  Aanwezigheid: '#3B82F6',
  Emotiecoaching: '#EC4899',
  Zelfregulatie: '#8B5CF6',
  Grenzen: '#EF4444',
  Autonomie: '#10B981',
  Herstel: '#F97316',
  Verbinding: '#06B6D4',
  Reflectie: '#6366F1',
};

type View = 'list' | 'editor';

export default function BlogBuilderPage() {
  const password = useAdminPassword();
  const [view, setView] = useState<View>('list');
  const [dynamicPosts, setDynamicPosts] = useState<DynamicBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Editor state
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const headers = useMemo(() => ({ 'x-admin-password': password, 'Content-Type': 'application/json' }), [password]);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog', { headers });
      if (res.ok) {
        const data = await res.json();
        setDynamicPosts(data.posts || []);
      }
    } catch {}
    setLoading(false);
  }

  function resetEditor() {
    setEditSlug(null);
    setTitle('');
    setSlug('');
    setDescription('');
    setCategory(CATEGORIES[0]);
    setDate(new Date().toISOString().slice(0, 10));
    setContent('');
    setPublished(false);
    setSlugManuallyEdited(false);
    setSaveMessage(null);
    setShowPreview(false);
  }

  function handleNew() {
    resetEditor();
    setView('editor');
  }

  function handleEdit(post: DynamicBlogPost) {
    setEditSlug(post.slug);
    setTitle(post.title);
    setSlug(post.slug);
    setDescription(post.description);
    setCategory(post.category);
    setDate(post.date);
    setContent(post.content);
    setPublished(post.published);
    setSlugManuallyEdited(true);
    setSaveMessage(null);
    setShowPreview(false);
    setView('editor');
  }

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(val));
    }
  }

  function applyTemplate(cat: string) {
    const template = BLOG_TEMPLATES[cat];
    if (template) {
      setContent(template.structure);
      setCategory(cat);
    }
  }

  async function handleSave(pub?: boolean) {
    const shouldPublish = pub !== undefined ? pub : published;
    setSaving(true);
    setSaveMessage(null);

    const readTime = estimateReadTime(content);
    const post: DynamicBlogPost = {
      title,
      slug: slug || generateSlug(title),
      description,
      category,
      date,
      readTime,
      content,
      published: shouldPublish,
      createdAt: editSlug ? '' : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers,
        body: JSON.stringify(post),
      });
      if (res.ok) {
        setSaveMessage({ type: 'success', text: shouldPublish ? 'Gepubliceerd!' : 'Opgeslagen als concept' });
        setPublished(shouldPublish);
        setEditSlug(post.slug);
        setSlugManuallyEdited(true);
        loadPosts();
      } else {
        const data = await res.json();
        setSaveMessage({ type: 'error', text: data.error || 'Opslaan mislukt' });
      }
    } catch (e) {
      setSaveMessage({ type: 'error', text: String(e) });
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!editSlug) return;
    if (!confirm('Dit artikel verwijderen? Dit kan niet ongedaan worden.')) return;
    setDeleting(true);
    try {
      await fetch('/api/admin/blog', {
        method: 'DELETE',
        headers,
        body: JSON.stringify({ slug: editSlug }),
      });
      loadPosts();
      resetEditor();
      setView('list');
    } catch {}
    setDeleting(false);
  }

  // Simple markdown preview
  function renderMarkdown(md: string): string {
    return md
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('## ')) return `<h2 style="font-size:18px;font-weight:700;margin:24px 0 8px;color:var(--text)">${trimmed.slice(3)}</h2>`;
        if (trimmed.startsWith('# ')) return `<h1 style="font-size:22px;font-weight:800;margin:24px 0 8px;color:var(--text)">${trimmed.slice(2)}</h1>`;
        if (trimmed === '---') return '<hr style="border-color:var(--border);margin:24px 0" />';
        if (trimmed.startsWith('*') && trimmed.endsWith('*')) return `<p style="font-size:13px;opacity:0.7;margin:8px 0"><em>${trimmed.slice(1, -1)}</em></p>`;
        if (trimmed.startsWith('[') && trimmed.includes(']')) return `<p style="font-size:15px;line-height:1.7;margin:8px 0;color:#F59E0B;font-style:italic">${trimmed}</p>`;
        if (trimmed) return `<p style="font-size:15px;line-height:1.7;margin:8px 0;color:var(--text2)">${trimmed}</p>`;
        return '';
      })
      .join('\n');
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  // Merge static + dynamic for the list
  const allPosts: (BlogPostMeta & { dynamic?: boolean; published?: boolean })[] = [
    ...dynamicPosts.map((p) => ({ ...p, dynamic: true })),
    ...POSTS_LIST.map((p) => ({ ...p, dynamic: false, published: true })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: '#F59E0B' }} />
      </div>
    );
  }

  // === LIST VIEW ===
  if (view === 'list') {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B20' }}>
              <FileText className="h-5 w-5" style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <h1 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>Blog Builder</h1>
              <p className="text-xs" style={{ color: 'var(--text3)' }}>
                {POSTS_LIST.length} statisch &middot; {dynamicPosts.length} dynamisch
              </p>
            </div>
          </div>
          <button
            onClick={handleNew}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.98]"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <Plus className="h-4 w-4" />
            Nieuw artikel
          </button>
        </div>

        <div className="rounded-xl border divide-y" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
          {allPosts.map((post) => {
            const color = CATEGORY_COLORS[post.category] || '#F59E0B';
            return (
              <div
                key={post.slug}
                className="flex items-center gap-3 px-4 py-3"
                style={{ borderColor: 'var(--border)' }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded shrink-0"
                      style={{ backgroundColor: color + '15', color }}
                    >
                      {post.category}
                    </span>
                    {post.dynamic && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: post.published ? '#34D39915' : '#F59E0B15',
                          color: post.published ? '#34D399' : '#F59E0B',
                        }}
                      >
                        {post.published ? 'Live' : 'Concept'}
                      </span>
                    )}
                    {!post.dynamic && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                        Statisch
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{post.title}</p>
                  <div className="flex items-center gap-2 text-[11px] mt-0.5" style={{ color: 'var(--text3)' }}>
                    <Clock className="h-3 w-3" />
                    {formatDate(post.date)}
                    <span>&middot;</span>
                    {post.readTime} min leestijd
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {post.dynamic && (
                    <button
                      onClick={() => handleEdit(dynamicPosts.find((p) => p.slug === post.slug)!)}
                      className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                      style={{ color: '#F59E0B' }}
                    >
                      <FileText className="h-4 w-4" />
                    </button>
                  )}
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--text3)' }}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // === EDITOR VIEW ===
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => { resetEditor(); setView('list'); }}
          className="flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
          style={{ color: 'var(--text3)' }}
        >
          <ArrowLeft className="h-4 w-4" />
          Terug naar overzicht
        </button>
        <div className="flex items-center gap-2">
          {editSlug && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition-opacity hover:opacity-70 disabled:opacity-50"
              style={{ color: '#EF4444' }}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Verwijderen
            </button>
          )}
          <button
            onClick={() => handleSave(false)}
            disabled={saving || !title.trim() || !content.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold disabled:opacity-50"
            style={{ backgroundColor: 'var(--surface2)', color: 'var(--text2)' }}
          >
            <Save className="h-4 w-4" />
            Concept opslaan
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving || !title.trim() || !content.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-black disabled:opacity-50"
            style={{ backgroundColor: '#F59E0B' }}
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            Publiceren
          </button>
        </div>
      </div>

      {/* Save message */}
      {saveMessage && (
        <div
          className="rounded-xl border p-3 flex items-center gap-2 mb-4"
          style={{
            backgroundColor: saveMessage.type === 'success' ? '#34D39910' : '#EF444410',
            borderColor: saveMessage.type === 'success' ? '#34D39930' : '#EF444430',
          }}
        >
          {saveMessage.type === 'success' ? (
            <Check className="h-4 w-4" style={{ color: '#34D399' }} />
          ) : (
            <AlertCircle className="h-4 w-4" style={{ color: '#EF4444' }} />
          )}
          <span className="text-sm" style={{ color: 'var(--text)' }}>{saveMessage.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Titel van het artikel"
            className="w-full px-4 py-3 rounded-xl border text-lg font-bold outline-none focus:ring-2 focus:ring-amber-500/40"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Korte beschrijving (voor SEO en blog overzicht)"
            rows={2}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-amber-500/40"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
          />

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold" style={{ color: 'var(--text3)' }}>Inhoud (Markdown)</label>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1 text-xs font-medium"
                style={{ color: '#F59E0B' }}
              >
                <Eye className="h-3.5 w-3.5" />
                {showPreview ? 'Editor' : 'Preview'}
              </button>
            </div>
            {showPreview ? (
              <div
                className="w-full min-h-[400px] rounded-xl border p-6"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Schrijf je artikel in Markdown..."
                rows={20}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-amber-500/40 font-mono"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Metadata */}
          <div className="rounded-xl border p-4 space-y-3" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div>
              <label className="text-xs font-bold mb-1 block" style={{ color: 'var(--text3)' }}>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }}
                className="w-full px-3 py-2 rounded-lg border text-xs font-mono outline-none focus:ring-2 focus:ring-amber-500/40"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>

            <div>
              <label className="text-xs font-bold mb-1 block" style={{ color: 'var(--text3)' }}>Categorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold mb-1 block" style={{ color: 'var(--text3)' }}>Datum</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            </div>

            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <p className="text-[11px]" style={{ color: 'var(--text3)' }}>
                Leestijd: ~{estimateReadTime(content)} min &middot; {content.split(/\s+/).filter(Boolean).length} woorden
              </p>
            </div>
          </div>

          {/* Templates */}
          <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="h-4 w-4" style={{ color: '#F59E0B' }} />
              <span className="text-xs font-bold" style={{ color: 'var(--text)' }}>Template gebruiken</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {CATEGORIES.map((cat) => {
                const color = CATEGORY_COLORS[cat] || '#F59E0B';
                return (
                  <button
                    key={cat}
                    onClick={() => applyTemplate(cat)}
                    className="text-[11px] font-medium px-2.5 py-2 rounded-lg text-left transition-colors hover:opacity-80"
                    style={{ backgroundColor: color + '10', color }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
            <p className="text-[10px] mt-2" style={{ color: 'var(--text3)' }}>
              Klik op een categorie om de structuur te laden. Vul de [placeholders] in met je eigen verhaal.
            </p>
          </div>

          {/* Writing tips */}
          <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold mb-2" style={{ color: 'var(--text)' }}>Schrijftips</p>
            <ul className="space-y-1.5 text-[11px]" style={{ color: 'var(--text3)' }}>
              <li>Begin met een persoonlijk, herkenbaar moment</li>
              <li>Gebruik korte zinnen en alinea&apos;s</li>
              <li>Eindig met een link naar een cursus</li>
              <li>Gebruik ## voor kopjes</li>
              <li>Gebruik --- voor een horizontale lijn</li>
              <li>Zet *tekst* voor cursief (CTA onderaan)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
