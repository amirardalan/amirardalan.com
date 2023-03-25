import React from 'react';
import type { AppProps } from 'next/app';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { Analytics } from '@vercel/analytics/react';
import useGtag from '@/hooks/useGtag';

import { ThemeProvider, Theme } from '@emotion/react';
import { useThemeContext } from '@/hooks/useThemeContext';
import { themeLight, themeDark } from '@/styles/theme';
import { GlobalStyles } from '@/styles/global';

import Header from '@/components/Header';

const App = ({ Component, pageProps }: AppProps<{ session: Session }>) => {
  useGtag(); // Analytics
  const [theme, toggleTheme] = useThemeContext();
  const themeMode: Theme = theme === 'light' ? themeLight : themeDark;

  return (
    <React.StrictMode>
      <SessionProvider session={pageProps.session}>
        <GlobalStyles />
        <ThemeProvider theme={themeMode}>
          <Header toggleTheme={toggleTheme} />
          <Component {...pageProps} />
          <Analytics />
        </ThemeProvider>
      </SessionProvider>
    </React.StrictMode>
  );
};

export default App;
