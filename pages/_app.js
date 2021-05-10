import { GlobalStyles } from '../styles/global'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { useDarkMode } from '../utils/useDarkMode'
import Toggle from '../components/Toggle'

import { useEffect } from 'react'
import { useRouter } from "next/router";
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import * as gtag from '../lib/gtag'


function MyApp({ Component, pageProps }) {

  // Google Analytics - Pageview Tracking
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Dark Mode Toggle
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? themeLight : themeDark;
  if (!componentMounted) {
    return <div />
  };
  
  return (
    <ThemeProvider theme={themeMode}>
      <Head>
        <title>Amir Ardalan | Portfolio</title>
        <meta name="theme-color" content={themeMode.colors.background} />
      </Head>
      <GlobalStyles />
      <div className="container">
        <div className="header">
          <Header />
          <Toggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default MyApp
