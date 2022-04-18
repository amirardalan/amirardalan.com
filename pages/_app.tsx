import React from 'react'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useThemeContext } from '@/utils/useThemeContext'
import { themeLight, themeDark } from '@/styles/theme'
import { GlobalStyles } from '@/styles/global'
import { ThemeProvider } from '@emotion/react'
import Header from '@/components/Header'
import useGtag from '@/utils/useGtag'

import dynamic from 'next/dynamic'
const BlogAdmin = dynamic(() => import('@/components/BlogAdmin'),{
  ssr: false
})

const App = ({ Component, pageProps }: AppProps) => {

  useGtag() // Analytics
  const [theme, toggleTheme] = useThemeContext()
  const themeMode = theme === 'light' ? themeLight : themeDark

  return (
    <React.StrictMode>
      <SessionProvider session={pageProps.session}>
        <GlobalStyles />
        <ThemeProvider theme={themeMode}>
          <BlogAdmin />
          <Header toggleTheme={toggleTheme} />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </React.StrictMode>
  )
}

export default App