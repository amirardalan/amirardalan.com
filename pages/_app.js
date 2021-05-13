import "@fontsource/poppins/500.css"
import "@fontsource/poppins/700.css"
import { GlobalStyles } from '../styles/global'
import LoadingBar from '../components/LoadingBar'

import Head from 'next/head'
import Header from '../components/Header'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { useDarkMode } from '../utils/useDarkMode'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/gtag'


function MyApp({ Component, pageProps }) {

  // Route handling for Google Analytics & Loading Bar
  const router = useRouter()
  const [loader, setLoader] = useState()
  useEffect(() => {
    let handleRouteStart = () => setLoader(true)
    const handleRouteChange = (url) => {
      gtag.pageview(url)
      setLoader(false)
    }
    router.events.on('routeChangeStart', handleRouteStart)
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  function UseLoader() {
    if(setLoader)return <LoadingBar />
      else return null
  }

  // Theme Toggle
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? themeLight : themeDark
  
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <UseLoader isLoading={false} />
      <Head>
        <title>Amir Ardalan | Portfolio</title>
        <meta name="theme-color" content={themeMode.colors.background} />
      </Head>
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
