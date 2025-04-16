import { cookies } from 'next/headers';

export async function getTheme() {
  const cookieStore = await cookies();
  let theme = cookieStore.get('x-theme')?.value;

  if (!theme || theme === 'system') {
    const systemTheme = cookieStore.get('x-system-theme')?.value;
    theme = systemTheme === 'dark' ? 'dark' : 'light';
  } else if (theme !== 'dark') {
    theme = 'light';
  }

  return theme;
}

export function getInitialTheme() {
  return `
    (function() {
      try {
        var theme = (document.cookie.match(/(?:^|; )x-theme=([^;]*)/)||[])[1];
        var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        var effectiveTheme;
        if (!theme || theme === 'system') {
          effectiveTheme = systemTheme;
          document.cookie = 'x-system-theme=' + systemTheme + '; path=/';
        } else if (theme === 'dark') {
          effectiveTheme = 'dark';
        } else {
          effectiveTheme = 'light';
        }
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(effectiveTheme);
      } catch(e){}
    })();
  `;
}
