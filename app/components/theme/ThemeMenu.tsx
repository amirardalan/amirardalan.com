'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Tooltip from '@/components/ui/Tooltip';
import { useTheme } from '@/store/theme';
import { Theme } from '@/types/theme';
import MoonIcon from '@/components/icons/IconMoon';
import SunIcon from '@/components/icons/IconSun';

export default function ThemeMenu() {
  const router = useRouter();
  const { theme, effectiveTheme, setTheme, initializeTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Initialize theme
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Handle system theme changes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // Re-initialize theme when system preference changes
        initializeTheme();
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme, initializeTheme]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setMenuOpen(false);
    router.refresh();
  };

  return (
    <div className="relative flex align-middle" ref={menuRef}>
      <Tooltip pos="b" text="Change theme">
        <button className="m-0 p-0" onClick={() => setMenuOpen(!menuOpen)}>
          {effectiveTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
      </Tooltip>
      {menuOpen && (
        <div className="absolute right-0 z-40 mt-10 w-24 rounded-md bg-white shadow-lg dark:bg-zinc-800 dark:text-light">
          {(['light', 'dark', 'system'] as Theme[]).map((t, index, array) => (
            <button
              key={t}
              className={`flex w-full items-center justify-between px-4 py-2 text-left text-xs hover:bg-zinc-100 dark:text-light dark:hover:bg-zinc-700 ${index === 0 ? 'rounded-t-md' : ''} ${index === array.length - 1 ? 'rounded-b-md' : 'border-b border-zinc-200 dark:border-zinc-700'} `}
              onClick={() => handleThemeChange(t)}
            >
              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
              {theme === t && <span>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
