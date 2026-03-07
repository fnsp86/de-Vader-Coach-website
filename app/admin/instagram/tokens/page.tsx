'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw, Key, ArrowLeft, Send } from 'lucide-react';
import { useAdminPassword } from '@/components/AdminAuth';
import Link from 'next/link';

interface TokenStatus {
  instagram: {
    hasToken: boolean;
    valid: boolean;
    username?: string;
    accountId?: string;
    error?: string;
  };
  facebook: {
    hasToken: boolean;
    valid: boolean;
    pageName?: string;
    error?: string;
  };
}

export default function TokensPage() {
  const password = useAdminPassword();
  const [status, setStatus] = useState<TokenStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [newToken, setNewToken] = useState('');
  const [mode, setMode] = useState<'exchange' | 'direct'>('exchange');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const headers: Record<string, string> = {
    'x-admin-password': password,
    'Content-Type': 'application/json',
  };

  async function fetchStatus() {
    setLoading(true);
    try {
      const res = await fetch('/api/instagram/tokens', { headers: { 'x-admin-password': password } });
      const data = await res.json();
      setStatus(data);
    } catch {
      setStatus(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newToken.trim()) return;

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/instagram/tokens', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          action: mode === 'exchange' ? 'exchange' : 'save-direct',
          token: newToken.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ type: 'success', msg: data.message });
        setNewToken('');
        // Refresh status
        setTimeout(fetchStatus, 1000);
      } else {
        setResult({ type: 'error', msg: data.error || 'Er ging iets mis' });
      }
    } catch {
      setResult({ type: 'error', msg: 'Kon niet verbinden met server' });
    }
    setSubmitting(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/instagram"
          className="p-2 rounded-lg hover:opacity-80 transition"
          style={{ backgroundColor: 'var(--surface)', color: 'var(--muted)' }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
          Token Beheer
        </h1>
      </div>

      {/* Current Status */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
            Huidige status
          </h2>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition hover:opacity-80"
            style={{ backgroundColor: 'var(--bg)', color: 'var(--muted)' }}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Ververs
          </button>
        </div>

        {loading && !status ? (
          <p style={{ color: 'var(--muted)' }}>Laden...</p>
        ) : status ? (
          <div className="space-y-3">
            <StatusRow
              label="Instagram"
              valid={status.instagram.valid}
              detail={
                status.instagram.valid
                  ? `@${status.instagram.username} (ID: ${status.instagram.accountId})`
                  : status.instagram.error || 'Ongeldig'
              }
              hasToken={status.instagram.hasToken}
            />
            <StatusRow
              label="Facebook Page"
              valid={status.facebook.valid}
              detail={
                status.facebook.valid
                  ? status.facebook.pageName || 'Geldig'
                  : status.facebook.error || 'Ongeldig'
              }
              hasToken={status.facebook.hasToken}
            />
          </div>
        ) : (
          <p style={{ color: 'var(--error, #ef4444)' }}>Kon status niet ophalen</p>
        )}
      </div>

      {/* Renew Token */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
          <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
            Token vernieuwen
          </h2>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setMode('exchange')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                mode === 'exchange' ? 'ring-2 ring-amber-500' : 'opacity-60'
              }`}
              style={{
                backgroundColor: mode === 'exchange' ? 'var(--amber-bg)' : 'var(--bg)',
                color: mode === 'exchange' ? 'var(--amber-text)' : 'var(--muted)',
              }}
            >
              Short-lived omwisselen
            </button>
            <button
              onClick={() => setMode('direct')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                mode === 'direct' ? 'ring-2 ring-amber-500' : 'opacity-60'
              }`}
              style={{
                backgroundColor: mode === 'direct' ? 'var(--amber-bg)' : 'var(--bg)',
                color: mode === 'direct' ? 'var(--amber-text)' : 'var(--muted)',
              }}
            >
              Token direct opslaan
            </button>
          </div>

          <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
            {mode === 'exchange'
              ? 'Plak een short-lived token uit de Graph API Explorer. Het wordt automatisch omgewisseld voor een long-lived token en de Page token wordt opgehaald.'
              : 'Plak een Page Access Token direct. Gebruik dit als je al een geldig token hebt.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={newToken}
            onChange={(e) => setNewToken(e.target.value)}
            placeholder={mode === 'exchange' ? 'EAAt...' : 'EAAt... (Page token)'}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border text-sm font-mono resize-none"
            style={{
              backgroundColor: 'var(--bg)',
              borderColor: 'var(--border)',
              color: 'var(--text)',
            }}
          />

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting || !newToken.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition disabled:opacity-50"
              style={{ backgroundColor: 'var(--amber-text)' }}
            >
              {submitting ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {mode === 'exchange' ? 'Omwisselen en opslaan' : 'Opslaan'}
            </button>

            {result && (
              <span
                className="text-sm font-medium"
                style={{ color: result.type === 'success' ? 'var(--green, #22c55e)' : 'var(--error, #ef4444)' }}
              >
                {result.msg}
              </span>
            )}
          </div>
        </form>
      </div>

      {/* Instructions */}
      <div
        className="rounded-xl border p-6"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
      >
        <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>
          Hoe vernieuw je een token?
        </h2>
        <ol className="space-y-2 text-sm" style={{ color: 'var(--muted)' }}>
          <li>
            <strong style={{ color: 'var(--text)' }}>1.</strong> Ga naar{' '}
            <a
              href="https://developers.facebook.com/tools/explorer/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: 'var(--amber-text)' }}
            >
              Graph API Explorer
            </a>
          </li>
          <li>
            <strong style={{ color: 'var(--text)' }}>2.</strong> Selecteer je Meta App
          </li>
          <li>
            <strong style={{ color: 'var(--text)' }}>3.</strong> Klik &quot;Generate Access Token&quot; met de juiste permissies
            (pages_manage_posts, instagram_basic, instagram_content_publish, instagram_manage_comments)
          </li>
          <li>
            <strong style={{ color: 'var(--text)' }}>4.</strong> Kopieer het token en plak het hierboven
          </li>
          <li>
            <strong style={{ color: 'var(--text)' }}>5.</strong> Klik &quot;Omwisselen en opslaan&quot; - het systeem regelt de rest
          </li>
        </ol>
      </div>
    </div>
  );
}

function StatusRow({
  label,
  valid,
  detail,
  hasToken,
}: {
  label: string;
  valid: boolean;
  detail: string;
  hasToken: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {!hasToken ? (
        <XCircle className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--muted)' }} />
      ) : valid ? (
        <CheckCircle className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--green, #22c55e)' }} />
      ) : (
        <XCircle className="h-5 w-5 flex-shrink-0" style={{ color: 'var(--error, #ef4444)' }} />
      )}
      <div>
        <span className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
          {label}:
        </span>{' '}
        <span className="text-sm" style={{ color: valid ? 'var(--green, #22c55e)' : 'var(--muted)' }}>
          {detail}
        </span>
      </div>
    </div>
  );
}
