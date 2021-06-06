import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import { ThemeProvider } from '@emotion/react'
import { GlobalStyles } from '@/styles/global'
import { themeLight, themeDark } from '@/styles/theme'
import { useDarkMode } from '@/utils/useDarkMode'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingBar from '@/components/LoadingBar'


const MyApp = ({Component, pageProps }: AppProps) => {

  const [theme, toggleTheme] = useDarkMode()
  const themeMode = (theme === 'light') ? themeLight : themeDark

  return (
    <React.StrictMode>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <LoadingBar />
          <Header toggleTheme={toggleTheme} />
          <div className="container">
            <Component {...pageProps} />
            <Footer />
          </div>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default MyApp