import React from 'react'
import type { AppProps } from 'next/app'
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { useThemeContext } from '@/utils/useThemeContext'
import { themeLight, themeDark } from '@/styles/theme'
import { GlobalStyles } from '@/styles/global'
import { ThemeProvider } from '@emotion/react'
import Header from '@/components/Header'
import useGtag from '@/utils/useGtag'
import { Analytics } from '@vercel/analytics/react'


const App = ({ Component, pageProps }: AppProps<{session: Session}>) => {

  useGtag() // Analytics
  const [theme, toggleTheme] = useThemeContext()
  const themeMode = theme === 'light' ? themeLight : themeDark

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
  )
}

export default App