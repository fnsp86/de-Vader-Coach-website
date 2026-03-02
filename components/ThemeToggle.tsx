'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setLight(false);
      document.documentElement.classList.remove('light');
    } else {
      setLight(true);
      document.documentElement.classList.add('light');
    }
  }, []);

  function toggle() {
    const next = !light;
    setLight(next);
    if (next) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
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
