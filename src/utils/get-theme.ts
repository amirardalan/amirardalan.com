import { cookies } from 'next/headers';

export async function getTheme() {
  const cookieStore = await cookies();
  let theme = cookieStore.get('x-theme')?.value;

  if (!theme || theme === 'system') {
    const systemTheme = cookieStore.get('x-system-theme')?.value;
    theme = systemTheme === 'dark' ? 'dark' : 'dark';
  } else if (theme !== 'dark') {
    theme = 'light';
  }

  return theme;
}
