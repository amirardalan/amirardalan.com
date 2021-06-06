import { ThemeProvider } from '@emotion/react'
import { GlobalStyles } from '@/styles/global'
import { themeLight, themeDark } from '@/styles/theme'
import { useDarkMode } from '@/utils/useDarkMode'

import React from 'react'
import { AppProps } from 'next/app'

import { Provider } from 'next-auth/client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingBar from '@/components/LoadingBar'


const MyApp = ({Component, pageProps }: AppProps) => {

  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? themeLight : themeDark

  return (
    <React.StrictMode>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <LoadingBar />
        <Provider session={pageProps.session}>
          <Header toggleTheme={toggleTheme} />
          <div className="container">
            <Component {...pageProps} />
            <Footer />
          </div>
        </Provider>
      </ThemeProvider>
    </React.StrictMode>
  )
}

export default MyApp