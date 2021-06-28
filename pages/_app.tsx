import React from 'react'
import { GlobalStyles } from '@/styles/global'
import { ThemeProvider } from '@emotion/react'
import { useThemeContext } from '@/utils/useThemeContext'
import { themeLight, themeDark } from '@/styles/theme'

import LoadingBar from '@/components/LoadingBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import TrackPageviews from '@/utils/trackPageviews'

import dynamic from 'next/dynamic'
const BlogAdmin = dynamic(() => import('@/components/BlogAdmin'),{
  ssr: false
})


const App = ({ Component, pageProps }: AppProps) => {

  // Theme Context for non-CSS
  const [theme, toggleTheme] = useThemeContext()
  const themeMode = theme === 'light' ? themeLight : themeDark

  // GA
  TrackPageviews()

  return (
    <React.StrictMode>
      <Provider session={pageProps.session}>
        <GlobalStyles />
        <ThemeProvider theme={themeMode}>
          <BlogAdmin />
          <LoadingBar />
          <Header toggleTheme={toggleTheme} />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App