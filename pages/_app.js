import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import LoadingBar from '../components/LoadingBar'
import * as gtag from '../lib/gtag'

import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { GlobalStyles } from '../styles/global'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { useDarkMode } from '../utils/useDarkMode'
import Toggle from '../components/Toggle'


function MyApp({ Component, pageProps }) {

  // Custom Route Handling
  // For Google Analytics & Loading Bar
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
  // if (!componentMounted) {
  //   return <div />
  // }
  
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
