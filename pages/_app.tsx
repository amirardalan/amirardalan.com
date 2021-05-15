import "@fontsource/poppins/500.css"
import "@fontsource/poppins/700.css"
import { GlobalStyles } from '../styles/global'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { useDarkMode } from '../utils/useDarkMode'

import Head from 'next/head'
import LoadingBar from '../components/LoadingBar'
import Header from '../components/Header'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'


function MyApp({ Component, pageProps }) {

  // Loading Bar
  function DisplayLoadingBar(loader) {
    if(loader)return <LoadingBar />
      else return null
  }

  // Theme Toggle
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? themeLight : themeDark
  
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Head>
        <title>Amir Ardalan | Portfolio</title>
        <meta name="theme-color" content={themeMode.colors.background} />
      </Head>
      <DisplayLoadingBar />
      <div className="container">
        <div className="header">
          <Header />
          <Toggle toggleTheme={toggleTheme} />
        </div>
        <Component {...pageProps} />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default MyApp
