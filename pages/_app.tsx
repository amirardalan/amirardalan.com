import React from 'react';
import type { AppProps } from 'next/app';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { Analytics } from '@vercel/analytics/react';
import useGtag from '@/hooks/useGtag';
import { SpeedInsights } from '@vercel/speed-insights/next';

import Header from '@/components/Header';

import { ThemeProvider, Theme } from '@emotion/react';
import { themeLight, themeDark } from '@/styles/theme';
import GlobalStyles from '@/styles/global';
import { useThemeContext } from '@/hooks/useThemeContext';

import { JetBrains_Mono, Noto_Serif, Saira } from 'next/font/google';
const fontPrimary = JetBrains_Mono({ subsets: ['latin'], weight: ['400'] });
const fontSecondary = Saira({
  subsets: ['latin'],
  weight: ['400', '700'],
});
const fontTertiary = Noto_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
});

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  const [theme, toggleTheme] = useThemeContext();
  const themeMode: Theme = theme === 'light' ? themeLight : themeDark;

  useGtag();

  return (
    <React.StrictMode>
      <SessionProvider session={pageProps.session}>
        <GlobalStyles
          fontPrimary={fontPrimary.style.fontFamily}
          fontSecondary={fontSecondary.style.fontFamily}
          fontTertiary={fontTertiary.style.fontFamily}
        />
        <ThemeProvider theme={themeMode}>
          <Header toggleTheme={toggleTheme} />
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </SessionProvider>
    </React.StrictMode>
  );
};

export default App;
