import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/react'
import { useThemeContext } from '@/utils/useThemeContext'
import { themeLight, themeDark } from '@/styles/theme'
import { GlobalStyles } from '@/styles/global'
import { ThemeProvider } from '@emotion/react'
import Header from '@/components/Header'
import LoadingBar from '@/components/LoadingBar'
import GtagRoutes from '@/lib/GtagRoutes'

import dynamic from 'next/dynamic'
const BlogAdmin = dynamic(() => import('@/components/BlogAdmin'),{
  ssr: false
})


const App = ({ Component, pageProps }: AppProps) => {

  const [theme, toggleTheme] = useThemeContext()
  const themeMode = theme === 'light' ? themeLight : themeDark

  GtagRoutes()

  return (
    <React.StrictMode>
      <Provider session={pageProps.session}>
        <GlobalStyles />
        <ThemeProvider theme={themeMode}>
          <LoadingBar />
          <BlogAdmin />
          <Header toggleTheme={toggleTheme} />
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App