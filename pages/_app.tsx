import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
import LoadingBar from '../components/LoadingBar'
import Header from '../components/Header'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'

import "@fontsource/poppins/700.css"
import "@fontsource/poppins/900.css"
import "@fontsource/lora/500.css"
import "@fontsource/lora/500-italic.css"
import "@fontsource/fira-code/400.css"
import { GlobalStyles } from '../styles/global'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { useDarkMode } from '../utils/useDarkMode'

import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {

  // Show loading indicator on router events
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => { setLoading(true) }
    const end = () => { setLoading(false) }
    Router.events.on("routeChangeStart", start)
    Router.events.on("routeChangeComplete", end)
    Router.events.on("routeChangeError", end)
    return () => {
      Router.events.off("routeChangeStart", start)
      Router.events.off("routeChangeComplete", end)
      Router.events.off("routeChangeError", end)
    }
  }, [])

  // Theme Toggle
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? themeLight : themeDark

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Head>
          <title>Amir Ardalan | Portfolio</title>
          <meta name="theme-color" content={themeMode.colors.background} />
        </Head>
        { loading ? <LoadingBar /> : null }
        <div className="container">
          <div className="header">
            <Header />
            <Toggle toggleTheme={toggleTheme} />
          </div>
          <Component {...pageProps} />
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp