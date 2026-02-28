'use client';

import { useState } from 'react';
import { Shield, Key, Copy, Check } from 'lucide-react';
import { useAdminPassword } from '@/components/AdminAuth';

export default function InstellingenPage() {
  const password = useAdminPassword();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold" style={{ color: 'var(--text)' }}>
        Instellingen
      </h1>
      <PasswordSection password={password} />
      <TwoFactorSection password={password} />
    </div>
  );
}

// ── Password change ──────────────────────────────────────────────────────────

function PasswordSection({ password }: { password: string }) {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleChange(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (currentPw !== password) {
      setStatus({ type: 'error', msg: 'Huidig wachtwoord is onjuist.' });
      return;
    }
    if (newPw.length < 8) {
      setStatus({ type: 'error', msg: 'Nieuw wachtwoord moet minimaal 8 tekens zijn.' });
      return;
    }
    if (newPw !== confirmPw) {
      setStatus({ type: 'error', msg: 'Wachtwoorden komen niet overeen.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'x-admin-password': password, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'change-password', newPassword: newPw }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', msg: 'Wachtwoord gewijzigd. Je wordt uitgelogd...' });
        setTimeout(() => {
          sessionStorage.removeItem('admin_password');
          sessionStorage.removeItem('admin_totp');
          window.location.href = '/admin';
        }, 2000);
      } else {
        setStatus({ type: 'error', msg: data.error || 'Er ging iets mis.' });
      }
    } catch {
      setStatus({ type: 'error', msg: 'Kon niet verbinden.' });
    }
    setLoading(false);
  }

  return (
    <div
      className="rounded-xl border p-6"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Key className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
        <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
          Wachtwoord wijzigen
        </h2>
      </div>

      <form onSubmit={handleChange} className="space-y-3 max-w-sm">
        <input
          type="password"
          value={currentPw}
          onChange={(e) => setCurrentPw(e.target.value)}
          placeholder="Huidig wachtwoord"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40"
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
        />
        <input
          type="password"
          value={newPw}
          onChange={(e) => setNewPw(e.target.value)}
          placeholder="Nieuw wachtwoord (min. 8 tekens)"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40"
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
        />
        <input
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          placeholder="Herhaal nieuw wachtwoord"
          className="w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-500/40"
          style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
        />
        {status && (
          <p className={`text-xs ${status.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            {status.msg}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg text-sm font-bold text-black cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: '#F59E0B' }}
        >
          {loading ? 'Opslaan...' : 'Wachtwoord wijzigen'}
        </button>
      </form>
    </div>
  );
}

// ── Two-Factor Authentication ────────────────────────────────────────────────

function TwoFactorSection({ password }: { password: string }) {
  const [secret, setSecret] = useState<string | null>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generateSecret() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'x-admin-password': password, 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate-totp-secret' }),
      });
      const data = await res.json();
      if (res.ok) {
        setSecret(data.secret);
        setUri(data.uri);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }

  function copySecret() {
    if (secret) {
      navigator.clipboard.writeText(secret);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      className="rounded-xl border p-6"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5" style={{ color: 'var(--amber-text)' }} />
        <h2 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
          Twee-factor authenticatie (2FA)
        </h2>
      </div>

      <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>
        Voeg een extra beveiligingslaag toe met een authenticator app (Google Authenticator, Authy, etc.).
      </p>

      {!secret ? (
        <button
          onClick={generateSecret}
          disabled={loading}
          className="px-5 py-2.5 rounded-lg text-sm font-bold text-black cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: '#F59E0B' }}
        >
          {loading ? 'Genereren...' : '2FA instellen'}
        </button>
      ) : (
        <div className="space-y-4">
          <div
            className="rounded-lg border p-4"
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: 'var(--text)' }}>
              Stap 1: Scan de QR code of voer de code handmatig in
            </p>
            {/* QR code via Google Charts API */}
            {uri && (
              <div className="mb-3 bg-white inline-block p-2 rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(uri)}`}
                  alt="QR Code voor 2FA"
                  width={200}
                  height={200}
                />
              </div>
            )}
            <div className="flex items-center gap-2">
              <code
                className="text-xs font-mono px-3 py-2 rounded flex-1 break-all"
                style={{ backgroundColor: 'var(--surface2)', color: 'var(--text)' }}
              >
                {secret}
              </code>
              <button
                onClick={copySecret}
                className="p-2 rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                style={{ color: 'var(--text3)' }}
                title="Kopieer secret"
              >
                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div
            className="rounded-lg border p-4"
            style={{ backgroundColor: '#F59E0B08', borderColor: '#F59E0B30' }}
          >
            <p className="text-xs font-bold mb-2" style={{ color: 'var(--text)' }}>
              Stap 2: Voeg de secret toe aan je omgevingsvariabelen
            </p>
            <p className="text-xs mb-2" style={{ color: 'var(--text2)' }}>
              Voeg het volgende toe aan je <code>.env.local</code> en aan Vercel Environment Variables:
            </p>
            <code
              className="text-xs font-mono block px-3 py-2 rounded break-all"
              style={{ backgroundColor: 'var(--surface)', color: 'var(--amber-text)' }}
            >
              ADMIN_TOTP_SECRET={secret}
            </code>
            <p className="text-[11px] mt-2" style={{ color: 'var(--text3)' }}>
              Na het toevoegen en herstarten verschijnt het 2FA-veld automatisch op de login pagina.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
