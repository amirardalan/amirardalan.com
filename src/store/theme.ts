import { create } from 'zustand';
import Cookies from 'js-cookie';

import { Theme } from '@/types/theme';

type ThemeStore = {
  theme: Theme;
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
};

export const useTheme = create<ThemeStore>((set) => ({
  theme: 'system',
  effectiveTheme: 'light',
  setTheme: (theme) => {
    Cookies.set('x-theme', theme);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    if (theme === 'system') {
      Cookies.set('x-system-theme', systemTheme);
    }
    const effectiveTheme = theme === 'system' ? systemTheme : theme;

    // Set theme class on document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(effectiveTheme);

    set({ theme, effectiveTheme });
  },
  initializeTheme: () => {
    const savedTheme = (Cookies.get('x-theme') as Theme) || 'system';
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    if (savedTheme === 'system') {
      Cookies.set('x-system-theme', systemTheme);
    }
    const effectiveTheme = savedTheme === 'system' ? systemTheme : savedTheme;

    // Set theme class on document
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(effectiveTheme);

    set({ theme: savedTheme, effectiveTheme });
  },
}));
