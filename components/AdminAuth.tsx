'use client';

import { useState, useEffect, createContext, useContext } from 'react';

const AdminContext = createContext<string>('');

export function useAdminPassword() {
  return useContext(AdminContext);
}

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_password');
    if (stored) {
      verify(stored);
    } else {
      setChecking(false);
    }
  }, []);

  async function verify(pw: string) {
    setChecking(true);
    setError('');
    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'x-admin-password': pw },
      });
      if (res.ok) {
        sessionStorage.setItem('admin_password', pw);
        setPassword(pw);
      } else {
        sessionStorage.removeItem('admin_password');
        setError('Onjuist wachtwoord');
      }
    } catch {
      setError('Kon niet verbinden');
    }
    setChecking(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) verify(input.trim());
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
        <p className="text-sm" style={{ color: 'var(--text3)' }}>Laden...</p>
      </div>
    );
  }

  if (!password) {
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
            {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-xl py-3 text-sm font-bold text-black"
              style={{ backgroundColor: '#F59E0B' }}
            >
              Inloggen
            </button>
          </div>
        </form>
      </div>
    );
  }

  return <AdminContext.Provider value={password}>{children}</AdminContext.Provider>;
}
