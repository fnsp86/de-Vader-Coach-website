'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAdminPassword } from '@/components/AdminAuth';
import Link from 'next/link';
import {
  MessageCircle,
  RefreshCw,
  Send,
  SkipForward,
  RotateCcw,
  Check,
  AlertCircle,
  Loader2,
  ChevronLeft,
  Settings,
  Pencil,
} from 'lucide-react';

type CommentStatus = 'pending' | 'approved' | 'replied' | 'skipped';
type AutoReplyMode = 'auto' | 'review' | 'off';

interface Comment {
  id: string;
  postId: string;
  username: string;
  text: string;
  timestamp: string;
  replyText?: string;
  replyId?: string;
  repliedAt?: string;
  status: CommentStatus;
}

export default function CommentsPage() {
  const password = useAdminPassword();
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<CommentStatus | 'all'>('pending');
  const [mode, setMode] = useState<AutoReplyMode>('review');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState('');
  const [refreshResult, setRefreshResult] = useState<{ fetched: number; replied: number; queued: number } | null>(null);

  const fetchComments = useCallback(async () => {
    if (!password) return;
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') params.set('status', filter);
      const res = await fetch(`/api/instagram/comments?${params}`, {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      setComments(data.comments ?? []);
    } catch {
      setError('Kon comments niet laden');
    }
    setLoading(false);
  }, [password, filter]);

  const fetchSettings = useCallback(async () => {
    if (!password) return;
    try {
      const res = await fetch('/api/instagram/comments?action=settings', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      if (data.mode) setMode(data.mode);
    } catch {}
  }, [password]);

  useEffect(() => {
    fetchComments();
    fetchSettings();
  }, [fetchComments, fetchSettings]);

  async function refreshComments() {
    if (!password) return;
    setRefreshing(true);
    setRefreshResult(null);
    setError('');
    try {
      const res = await fetch('/api/instagram/comments?action=refresh', {
        headers: { 'x-admin-password': password },
      });
      const data = await res.json();
      setRefreshResult(data);
      await fetchComments();
    } catch {
      setError('Kon comments niet ophalen van Instagram');
    }
    setRefreshing(false);
  }

  async function updateMode(newMode: AutoReplyMode) {
    if (!password) return;
    try {
      await fetch('/api/instagram/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ action: 'set-mode', replyText: newMode }),
      });
      setMode(newMode);
    } catch {}
  }

  async function approveComment(commentId: string, customReply?: string) {
    if (!password) return;
    setActionLoading(commentId);
    setError('');
    try {
      const res = await fetch('/api/instagram/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ action: 'approve', commentId, replyText: customReply }),
      });
      const data = await res.json();
      if (data.success) {
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, status: 'replied' as const, repliedAt: new Date().toISOString() } : c,
          ),
        );
        setEditingId(null);
      } else {
        setError(data.error || 'Fout bij plaatsen reply');
      }
    } catch {
      setError('Fout bij plaatsen reply');
    }
    setActionLoading(null);
  }

  async function skipComment(commentId: string) {
    if (!password) return;
    setActionLoading(commentId);
    try {
      await fetch('/api/instagram/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ action: 'skip', commentId }),
      });
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, status: 'skipped' as const } : c)),
      );
    } catch {}
    setActionLoading(null);
  }

  async function regenerateReply(commentId: string) {
    if (!password) return;
    setActionLoading(commentId);
    try {
      const res = await fetch('/api/instagram/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ action: 'regenerate', commentId }),
      });
      const data = await res.json();
      if (data.replyText) {
        setComments((prev) =>
          prev.map((c) => (c.id === commentId ? { ...c, replyText: data.replyText } : c)),
        );
      }
    } catch {}
    setActionLoading(null);
  }

  function startEditing(comment: Comment) {
    setEditingId(comment.id);
    setEditText(comment.replyText || '');
  }

  const pending = comments.filter((c) => c.status === 'pending').length;
  const replied = comments.filter((c) => c.status === 'replied').length;
  const filtered = filter === 'all' ? comments : comments.filter((c) => c.status === filter);

  return (
    <div
      className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/instagram"
          className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl transition-colors hover:bg-amber-500/10"
          style={{ color: '#F59E0B' }}
        >
          <ChevronLeft className="h-4 w-4" />
          Instagram
        </Link>
        <div className="flex-1">
          <h1 className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <MessageCircle className="h-5 w-5" style={{ color: '#F59E0B' }} />
            Comment Manager
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text3)' }}>
            AI-replies op Instagram comments
          </p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
          style={{ backgroundColor: 'var(--surface)', color: 'var(--text2)' }}
        >
          <Settings className="h-3.5 w-3.5" />
          Instellingen
        </button>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div
          className="rounded-2xl border p-4 mb-4 space-y-3"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <h3 className="text-sm font-bold">Auto-reply modus</h3>
          <div className="flex gap-2">
            {([
              { id: 'auto' as const, label: 'Automatisch', desc: 'AI beantwoordt direct alle comments' },
              { id: 'review' as const, label: 'Review eerst', desc: 'AI genereert reply, jij keurt goed' },
              { id: 'off' as const, label: 'Uit', desc: 'Geen AI-replies' },
            ]).map((opt) => (
              <button
                key={opt.id}
                onClick={() => updateMode(opt.id)}
                className="flex-1 rounded-xl border p-3 text-left transition-colors"
                style={{
                  backgroundColor: mode === opt.id ? '#F59E0B10' : 'transparent',
                  borderColor: mode === opt.id ? '#F59E0B' : 'var(--border)',
                }}
              >
                <span className="text-xs font-bold block" style={{ color: mode === opt.id ? '#F59E0B' : 'var(--text)' }}>
                  {opt.label}
                </span>
                <span className="text-[10px] block mt-0.5" style={{ color: 'var(--text3)' }}>
                  {opt.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats + Refresh */}
      <div
        className="rounded-2xl border p-4 mb-4 flex items-center gap-4 flex-wrap"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-6">
          <div>
            <span className="text-2xl font-bold" style={{ color: '#F59E0B' }}>{pending}</span>
            <span className="text-xs block" style={{ color: 'var(--text3)' }}>Wachtend</span>
          </div>
          <div>
            <span className="text-2xl font-bold" style={{ color: '#22C55E' }}>{replied}</span>
            <span className="text-xs block" style={{ color: 'var(--text3)' }}>Beantwoord</span>
          </div>
          <div>
            <span className="text-2xl font-bold" style={{ color: 'var(--text2)' }}>{comments.length}</span>
            <span className="text-xs block" style={{ color: 'var(--text3)' }}>Totaal</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {refreshResult && (
            <span className="text-[11px]" style={{ color: 'var(--text3)' }}>
              {refreshResult.fetched} nieuw, {refreshResult.replied} beantwoord, {refreshResult.queued} in wachtrij
            </span>
          )}
          <button
            onClick={refreshComments}
            disabled={refreshing}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl text-black transition-transform hover:scale-[0.97] disabled:opacity-50"
            style={{ backgroundColor: '#F59E0B' }}
          >
            {refreshing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Ophalen
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 mb-4 flex items-center gap-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto text-xs hover:underline">Sluiten</button>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex gap-1 mb-4">
        {([
          { id: 'pending' as const, label: 'Wachtend', count: pending },
          { id: 'replied' as const, label: 'Beantwoord', count: replied },
          { id: 'skipped' as const, label: 'Overgeslagen', count: comments.filter((c) => c.status === 'skipped').length },
          { id: 'all' as const, label: 'Alles', count: comments.length },
        ]).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: filter === f.id ? '#F59E0B' : 'var(--surface)',
              color: filter === f.id ? '#000' : 'var(--text3)',
            }}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Comments list */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin" style={{ color: '#F59E0B' }} />
        </div>
      ) : filtered.length === 0 ? (
        <div
          className="rounded-2xl border p-8 text-center"
          style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
        >
          <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-20" style={{ color: 'var(--text3)' }} />
          <p className="text-sm" style={{ color: 'var(--text3)' }}>
            {filter === 'pending' ? 'Geen comments in de wachtrij. Klik "Ophalen" om nieuwe comments te laden.' : 'Geen comments gevonden.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border p-4"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              {/* Comment header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                  @{comment.username}
                </span>
                <span className="text-[10px]" style={{ color: 'var(--text3)' }}>
                  {new Date(comment.timestamp).toLocaleString('nl-NL', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded ml-auto"
                  style={{
                    backgroundColor:
                      comment.status === 'replied' ? '#22C55E15' :
                      comment.status === 'pending' ? '#F59E0B15' :
                      'var(--bg)',
                    color:
                      comment.status === 'replied' ? '#22C55E' :
                      comment.status === 'pending' ? '#F59E0B' :
                      'var(--text3)',
                  }}
                >
                  {comment.status === 'replied' ? 'Beantwoord' : comment.status === 'pending' ? 'Wachtend' : 'Overgeslagen'}
                </span>
              </div>

              {/* Comment text */}
              <p className="text-sm mb-3" style={{ color: 'var(--text2)' }}>
                {comment.text}
              </p>

              {/* AI Reply */}
              {comment.replyText && (
                <div
                  className="rounded-xl p-3 mb-3"
                  style={{ backgroundColor: 'var(--bg)' }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-bold" style={{ color: '#F59E0B' }}>AI Reply</span>
                    {comment.repliedAt && (
                      <Check className="h-3 w-3" style={{ color: '#22C55E' }} />
                    )}
                  </div>
                  {editingId === comment.id ? (
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border px-3 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-amber-500/30"
                      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text2)' }}
                    />
                  ) : (
                    <p className="text-sm" style={{ color: 'var(--text2)' }}>
                      {comment.replyText}
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              {comment.status === 'pending' && (
                <div className="flex items-center gap-2">
                  {editingId === comment.id ? (
                    <>
                      <button
                        onClick={() => approveComment(comment.id, editText)}
                        disabled={actionLoading === comment.id}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-black transition-transform hover:scale-[0.97] disabled:opacity-50"
                        style={{ backgroundColor: '#22C55E' }}
                      >
                        {actionLoading === comment.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                        Verstuur
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        style={{ backgroundColor: 'var(--bg)', color: 'var(--text3)' }}
                      >
                        Annuleer
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => approveComment(comment.id)}
                        disabled={actionLoading === comment.id || !comment.replyText}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-black transition-transform hover:scale-[0.97] disabled:opacity-50"
                        style={{ backgroundColor: '#F59E0B' }}
                      >
                        {actionLoading === comment.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                        Goedkeuren
                      </button>
                      <button
                        onClick={() => startEditing(comment)}
                        disabled={actionLoading === comment.id}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        style={{ backgroundColor: 'var(--bg)', color: 'var(--text2)' }}
                      >
                        <Pencil className="h-3 w-3" />
                        Bewerk
                      </button>
                      <button
                        onClick={() => regenerateReply(comment.id)}
                        disabled={actionLoading === comment.id}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        style={{ backgroundColor: 'var(--bg)', color: 'var(--text2)' }}
                      >
                        <RotateCcw className="h-3 w-3" />
                        Opnieuw
                      </button>
                      <button
                        onClick={() => skipComment(comment.id)}
                        disabled={actionLoading === comment.id}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ml-auto"
                        style={{ backgroundColor: 'var(--bg)', color: 'var(--text3)' }}
                      >
                        <SkipForward className="h-3 w-3" />
                        Skip
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
