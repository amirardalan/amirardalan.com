'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/store/theme';
import { Theme } from '@/types/theme';
import IconMoon from '@/components/icons/IconMoon';
import IconSun from '@/components/icons/IconSun';
import Tooltip from '@/components/ui/Tooltip';

export default function ThemeMenu() {
  const router = useRouter();
  const { theme, effectiveTheme, setTheme, initializeTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);

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

  // Focus management for keyboard navigation
  useEffect(() => {
    if (menuOpen && firstItemRef.current) {
      firstItemRef.current.focus();
    }
  }, [menuOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setMenuOpen(false);
      buttonRef.current?.focus();
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setMenuOpen(false);
    buttonRef.current?.blur();
    router.refresh();
  };

  const closeTooltip = () => {
    buttonRef.current?.blur();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    buttonRef.current?.blur();
  };

  const themeLabel = effectiveTheme === 'dark' ? 'Dark mode' : 'Light mode';

  return (
    <div
      className="relative flex align-middle"
      ref={menuRef}
      onKeyDown={handleKeyDown}
    >
      <Tooltip pos="b" text="Change theme" onClose={closeTooltip}>
        <button
          className="m-0 p-0"
          onClick={toggleMenu}
          ref={buttonRef}
          aria-haspopup="true"
          aria-expanded={menuOpen}
          aria-label={`Theme toggle, current theme: ${themeLabel}`}
        >
          {effectiveTheme === 'dark' ? <IconMoon /> : <IconSun />}
        </button>
      </Tooltip>
      {menuOpen && (
        <div
          className="absolute right-0 z-40 mt-8 w-24 rounded-md bg-light shadow-lg dark:bg-zinc-800 dark:text-light"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="theme-menu-button"
        >
          {(['system', 'light', 'dark'] as Theme[]).map((t, index, array) => (
            <button
              key={t}
              ref={index === 0 ? firstItemRef : null}
              className={`flex w-full items-center justify-between px-4 py-2 text-left text-xs hover:bg-zinc-100 dark:text-light dark:hover:bg-zinc-700 ${index === 0 ? 'rounded-t-md' : ''} ${index === array.length - 1 ? 'rounded-b-md' : 'border-b border-zinc-200 dark:border-zinc-700'} `}
              onClick={() => handleThemeChange(t)}
              role="menuitem"
              aria-current={theme === t ? 'true' : 'false'}
            >
              <span>{t.charAt(0).toUpperCase() + t.slice(1)}</span>
              {theme === t && <span aria-hidden="true">✓</span>}
              {theme === t && <span className="sr-only">(selected)</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
