'use client';

import { useState, useEffect, createContext, useContext } from 'react';

interface AdminSession {
  password: string;
  totp?: string;
}

const AdminContext = createContext<AdminSession>({ password: '' });

export function useAdminPassword() {
  return useContext(AdminContext).password;
}

export function useAdminSession() {
  return useContext(AdminContext);
}

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [input, setInput] = useState('');
  const [totpInput, setTotpInput] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);
  const [requires2FA, setRequires2FA] = useState(false);

  useEffect(() => {
    // Check if 2FA is required
    fetch('/api/admin/verify')
      .then((r) => r.json())
      .then((data) => setRequires2FA(data.requires2FA || false))
      .catch(() => {});

    const stored = localStorage.getItem('admin_password');
    const storedTotp = localStorage.getItem('admin_totp');
    if (stored) {
      verify(stored, storedTotp || undefined);
    } else {
      setChecking(false);
    }
  }, []);

  async function verify(pw: string, totp?: string) {
    setChecking(true);
    setError('');
    try {
      const headers: Record<string, string> = { 'x-admin-password': pw };
      if (totp) headers['x-admin-totp'] = totp;

      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers,
      });
      if (res.ok) {
        localStorage.setItem('admin_password', pw);
        if (totp) localStorage.setItem('admin_totp', totp);
        setSession({ password: pw, totp });
      } else {
        localStorage.removeItem('admin_password');
        localStorage.removeItem('admin_totp');
        if (requires2FA && totp) {
          setError('Onjuist wachtwoord of code');
        } else if (requires2FA) {
          setError('Verificatiecode is vereist');
        } else {
          setError('Onjuist wachtwoord');
        }
      }
    } catch {
      setError('Kon niet verbinden');
    }
    setChecking(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) verify(input.trim(), totpInput.trim() || undefined);
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <p className="text-sm" style={{ color: 'var(--text3)' }}>Laden...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg)' }}>
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
          <div className="rounded-2xl border p-8 text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h1 className="text-xl font-bold mb-1" style={{ color: 'var(--text)' }}>Admin</h1>
            <p className="text-sm mb-6" style={{ color: 'var(--text3)' }}>De Vadercoach</p>
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Wachtwoord"
              autoFocus
              className="w-full rounded-xl border px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-amber-500/40"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
            />
            {requires2FA && (
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={totpInput}
                onChange={(e) => setTotpInput(e.target.value.replace(/\D/g, ''))}
                placeholder="6-cijferige code"
                className="w-full rounded-xl border px-4 py-3 text-sm mb-3 outline-none focus:ring-2 focus:ring-amber-500/40 text-center tracking-[0.3em] font-mono"
                style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
              />
            )}
            {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-xl py-3 text-sm font-bold text-black cursor-pointer"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Inloggen
            </button>
            {requires2FA && (
              <p className="text-[10px] mt-3" style={{ color: 'var(--text3)' }}>
                Open je authenticator app voor de code
              </p>
            )}
          </div>
        </form>
      </div>
    );
  }

  return <AdminContext.Provider value={session}>{children}</AdminContext.Provider>;
}
