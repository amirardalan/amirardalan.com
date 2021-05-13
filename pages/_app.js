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


function MyApp({ Component, pageProps }) {

  // Loading Bar
  function UseLoader(setLoader) {
    if(setLoader)return <LoadingBar />
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
      <UseLoader />
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
