import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

// Theme context for theme-specific non-CSS
export const useThemeContext = (): [Theme, () => void] => {
  const [theme, setTheme] = useState<Theme>('light');
  const setMode = (mode: Theme) => {
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') as Theme | null;
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      !localTheme
    ) {
      setMode('dark');
    } else if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  return [theme, toggleTheme];
};
