'use client';

import { useState, useEffect } from 'react';
import { useAdminPassword } from '@/components/AdminAuth';
import {
  Mail, Send, Users, Clock, Loader2, Trash2, Plus, Eye, History,
  FileText, ChevronDown, AlertCircle, Check,
} from 'lucide-react';

interface Subscriber {
  email: string;
  subscribedAt: string;
  source: string;
}

interface SentNewsletter {
  id: string;
  subject: string;
  content: string;
  sentAt: string;
  recipientCount: number;
}

type Tab = 'compose' | 'subscribers' | 'history';

const TEMPLATES = [
  {
    name: 'Nieuwe blog',
    subject: 'Nieuw artikel: [titel]',
    content: `<h2 style="margin:0 0 8px;font-size:20px;font-weight:800;color:#fff;">[Titel van het artikel]</h2>
<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#ccc;">[Korte samenvatting van het artikel - 2-3 zinnen die de lezer prikkelen om door te klikken]</p>
<a href="https://devadercoach.nl/blog/[slug]" style="display:inline-block;padding:12px 24px;background-color:#F59E0B;color:#000;font-weight:700;font-size:14px;border-radius:12px;text-decoration:none;">Lees het artikel</a>`,
  },
  {
    name: 'Wekelijkse tip',
    subject: 'Vadertip: [onderwerp]',
    content: `<h2 style="margin:0 0 8px;font-size:20px;font-weight:800;color:#fff;">Vadertip van de week</h2>
<p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#F59E0B;">[De tip in één zin]</p>
<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#ccc;">[Uitleg waarom deze tip werkt - 3-4 zinnen met een persoonlijk voorbeeld]</p>
<p style="margin:0;font-size:13px;color:#999;">Veel succes deze week.</p>`,
  },
  {
    name: 'Cursus aankondiging',
    subject: 'Nieuwe cursus: [naam]',
    content: `<h2 style="margin:0 0 8px;font-size:20px;font-weight:800;color:#fff;">[Naam van de cursus]</h2>
<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#ccc;">[Beschrijving - wat leer je, voor wie is het, wat maakt het bijzonder]</p>
<p style="margin:0 0 16px;font-size:14px;color:#ccc;">
  ✓ [Feature 1]<br>
  ✓ [Feature 2]<br>
  ✓ [Feature 3]
</p>
<a href="https://devadercoach.nl/cursussen/[slug]" style="display:inline-block;padding:12px 24px;background-color:#F59E0B;color:#000;font-weight:700;font-size:14px;border-radius:12px;text-decoration:none;">Bekijk de cursus</a>`,
  },
  {
    name: 'Persoonlijk bericht',
    subject: '[Onderwerp]',
    content: `<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#ccc;">Hoi,</p>
<p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#ccc;">[Je bericht hier - persoonlijk, eerlijk, zoals je tegen een vriend praat]</p>
<p style="margin:0 0 4px;font-size:14px;color:#ccc;">Groet,</p>
<p style="margin:0;font-size:14px;font-weight:700;color:#F59E0B;">De Vadercoach</p>`,
  },
];

export default function NieuwsbriefPage() {
  const password = useAdminPassword();
  const [tab, setTab] = useState<Tab>('compose');
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [newsletters, setNewsletters] = useState<SentNewsletter[]>([]);
  const [loading, setLoading] = useState(true);

  // Compose state
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; count: number; error?: string } | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Add subscriber state
  const [newEmail, setNewEmail] = useState('');
  const [addingEmail, setAddingEmail] = useState(false);

  const headers = { 'x-admin-password': password, 'Content-Type': 'application/json' };

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [subsRes, nlRes] = await Promise.all([
        fetch('/api/admin/subscribers', { headers }),
        fetch('/api/admin/newsletter', { headers }),
      ]);
      if (subsRes.ok) {
        const data = await subsRes.json();
        setSubscribers(data.subscribers || []);
      }
      if (nlRes.ok) {
        const data = await nlRes.json();
        setNewsletters(data.newsletters || []);
      }
    } catch {}
    setLoading(false);
  }

  async function handleRemoveSubscriber(email: string) {
    if (!confirm(`${email} verwijderen?`)) return;
    await fetch('/api/admin/subscribers', {
      method: 'DELETE',
      headers,
      body: JSON.stringify({ email }),
    });
    setSubscribers((prev) => prev.filter((s) => s.email !== email));
  }

  async function handleAddSubscriber() {
    if (!newEmail.trim()) return;
    setAddingEmail(true);
    await fetch('/api/admin/subscribers', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email: newEmail.trim() }),
    });
    setNewEmail('');
    setAddingEmail(false);
    loadData();
  }

  async function handleSend() {
    setShowConfirm(false);
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'POST',
        headers,
        body: JSON.stringify({ subject, content }),
      });
      const data = await res.json();
      setSendResult(data);
      if (data.success || data.count > 0) {
        loadData();
      }
    } catch (e) {
      setSendResult({ success: false, count: 0, error: String(e) });
    }
    setSending(false);
  }

  function applyTemplate(idx: number) {
    const t = TEMPLATES[idx];
    setSubject(t.subject);
    setContent(t.content);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const TABS: { id: Tab; label: string; icon: typeof Mail }[] = [
    { id: 'compose', label: 'Schrijven', icon: FileText },
    { id: 'subscribers', label: `Abonnees (${subscribers.length})`, icon: Users },
    { id: 'history', label: 'Verzonden', icon: History },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" style={{ color: '#F59E0B' }} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#F59E0B20' }}>
          <Mail className="h-5 w-5" style={{ color: '#F59E0B' }} />
        </div>
        <div>
          <h1 className="text-xl font-extrabold" style={{ color: 'var(--text)' }}>Nieuwsbrief</h1>
          <p className="text-xs" style={{ color: 'var(--text3)' }}>{subscribers.length} abonnees &middot; {newsletters.length} verzonden</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
            style={{
              color: tab === t.id ? '#F59E0B' : 'var(--text3)',
              backgroundColor: tab === t.id ? '#F59E0B12' : 'transparent',
            }}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Compose Tab */}
      {tab === 'compose' && (
        <div className="space-y-4">
          {/* Template picker */}
          <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <p className="text-xs font-bold mb-2" style={{ color: 'var(--text3)' }}>Snelle templates</p>
            <div className="flex flex-wrap gap-2">
              {TEMPLATES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => applyTemplate(i)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
                  style={{ backgroundColor: 'var(--surface2)', color: 'var(--text2)' }}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="text-xs font-bold mb-1 block" style={{ color: 'var(--text3)' }}>Onderwerp</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Onderwerp van je nieuwsbrief"
              className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-amber-500/40"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold" style={{ color: 'var(--text3)' }}>Inhoud (HTML)</label>
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
                className="w-full min-h-[300px] rounded-xl border p-6"
                style={{ backgroundColor: '#1A1A1A', borderColor: 'var(--border)' }}
              >
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ) : (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="<h2>Titel</h2><p>Je bericht hier...</p>"
                rows={12}
                className="w-full px-4 py-3 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-amber-500/40 font-mono"
                style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            )}
          </div>

          {/* Send result */}
          {sendResult && (
            <div
              className="rounded-xl border p-4 flex items-start gap-3"
              style={{
                backgroundColor: sendResult.success ? '#34D39910' : '#EF444410',
                borderColor: sendResult.success ? '#34D39930' : '#EF444430',
              }}
            >
              {sendResult.success ? (
                <Check className="h-5 w-5 shrink-0" style={{ color: '#34D399' }} />
              ) : (
                <AlertCircle className="h-5 w-5 shrink-0" style={{ color: '#EF4444' }} />
              )}
              <div>
                <p className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                  {sendResult.success ? `Verzonden naar ${sendResult.count} abonnees` : 'Er ging iets mis'}
                </p>
                {sendResult.error && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text3)' }}>{sendResult.error}</p>
                )}
              </div>
            </div>
          )}

          {/* Send button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!subject.trim() || !content.trim() || sending || subscribers.length === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100"
              style={{ backgroundColor: '#F59E0B' }}
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {sending ? 'Verzenden...' : `Verstuur naar ${subscribers.length} abonnees`}
            </button>
            {subscribers.length === 0 && (
              <p className="text-xs" style={{ color: 'var(--text3)' }}>Nog geen abonnees</p>
            )}
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="w-full max-w-sm rounded-2xl p-6" style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)' }}>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Nieuwsbrief versturen?</h3>
            <p className="text-sm mb-1" style={{ color: 'var(--text2)' }}>
              <strong>Onderwerp:</strong> {subject}
            </p>
            <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>
              Wordt verstuurd naar <strong>{subscribers.length}</strong> abonnees. Dit kan niet ongedaan worden.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold"
                style={{ backgroundColor: 'var(--surface2)', color: 'var(--text2)' }}
              >
                Annuleren
              </button>
              <button
                onClick={handleSend}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-black"
                style={{ backgroundColor: '#F59E0B' }}
              >
                Versturen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscribers Tab */}
      {tab === 'subscribers' && (
        <div className="space-y-4">
          {/* Add subscriber */}
          <div className="flex gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="E-mailadres toevoegen"
              onKeyDown={(e) => e.key === 'Enter' && handleAddSubscriber()}
              className="flex-1 px-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-amber-500/40"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
            <button
              onClick={handleAddSubscriber}
              disabled={addingEmail || !newEmail.trim()}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-black disabled:opacity-50"
              style={{ backgroundColor: '#F59E0B' }}
            >
              {addingEmail ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Toevoegen
            </button>
          </div>

          {/* Subscriber list */}
          {subscribers.length === 0 ? (
            <div className="rounded-xl border p-8 text-center" style={{ borderColor: 'var(--border)' }}>
              <Users className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--text3)' }} />
              <p className="text-sm" style={{ color: 'var(--text3)' }}>
                Nog geen abonnees. Abonnees worden automatisch toegevoegd wanneer iemand de gratis snelgids downloadt.
              </p>
            </div>
          ) : (
            <div className="rounded-xl border divide-y" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
              {subscribers.map((sub) => (
                <div
                  key={sub.email}
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text)' }}>{sub.email}</p>
                    <div className="flex items-center gap-2 text-[11px]" style={{ color: 'var(--text3)' }}>
                      <Clock className="h-3 w-3" />
                      {formatDate(sub.subscribedAt)}
                      <span className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--surface2)' }}>
                        {sub.source}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveSubscriber(sub.email)}
                    className="p-2 rounded-lg hover:opacity-70 transition-opacity shrink-0"
                    style={{ color: 'var(--text3)' }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {tab === 'history' && (
        <div className="space-y-3">
          {newsletters.length === 0 ? (
            <div className="rounded-xl border p-8 text-center" style={{ borderColor: 'var(--border)' }}>
              <History className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--text3)' }} />
              <p className="text-sm" style={{ color: 'var(--text3)' }}>Nog geen nieuwsbrieven verzonden.</p>
            </div>
          ) : (
            newsletters.map((nl) => (
              <NewsletterHistoryItem key={nl.id} newsletter={nl} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function NewsletterHistoryItem({ newsletter }: { newsletter: SentNewsletter }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="min-w-0">
          <p className="text-sm font-bold truncate" style={{ color: 'var(--text)' }}>{newsletter.subject}</p>
          <div className="flex items-center gap-2 text-[11px] mt-0.5" style={{ color: 'var(--text3)' }}>
            <Send className="h-3 w-3" />
            {newsletter.recipientCount} ontvangers
            <span>&middot;</span>
            {new Date(newsletter.sentAt).toLocaleDateString('nl-NL', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform"
          style={{ color: 'var(--text3)', transform: expanded ? 'rotate(180deg)' : undefined }}
        />
      </button>
      {expanded && (
        <div className="border-t px-4 py-3" style={{ borderColor: 'var(--border)' }}>
          <div
            className="rounded-lg p-4 text-sm"
            style={{ backgroundColor: '#1A1A1A' }}
            dangerouslySetInnerHTML={{ __html: newsletter.content }}
          />
        </div>
      )}
    </div>
  );
}
