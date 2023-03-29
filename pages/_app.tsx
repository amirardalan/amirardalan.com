import React from 'react';
import type { AppProps } from 'next/app';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { Analytics } from '@vercel/analytics/react';
import useGtag from '@/hooks/useGtag';

import Header from '@/components/Header';

import { ThemeProvider, Theme } from '@emotion/react';
import { themeLight, themeDark } from '@/styles/theme';
import GlobalStyles from '@/styles/global';
import { useThemeContext } from '@/hooks/useThemeContext';

import { Assistant, JetBrains_Mono, PT_Serif } from 'next/font/google';
const fontPrimary = JetBrains_Mono({ subsets: ['latin'], weight: ['400'] });
const fontSecondary = Assistant({ subsets: ['latin'], weight: ['700', '800'] });
const fontTertiary = PT_Serif({ subsets: ['latin'], weight: ['400'] });

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
        </ThemeProvider>
      </SessionProvider>
    </React.StrictMode>
  );
};

export default App;
