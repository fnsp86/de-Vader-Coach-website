'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const THEME_KEY = 'vc-theme';

export default function ThemeToggle() {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark') {
      setLight(false);
      document.documentElement.classList.add('dark');
    } else {
      setLight(true);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    }
  }

  return (
    <button
      onClick={toggle}
      className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[var(--surface2)]"
      aria-label={light ? 'Schakel naar donker thema' : 'Schakel naar licht thema'}
    >
      {light ? (
        <Moon className="h-[18px] w-[18px]" style={{ color: 'var(--text2)' }} />
      ) : (
        <Sun className="h-[18px] w-[18px]" style={{ color: 'var(--text2)' }} />
      )}
    </button>
  );
}
