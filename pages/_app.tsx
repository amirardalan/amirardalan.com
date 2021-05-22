import "@fontsource/poppins/500.css"
import "@fontsource/poppins/700.css"
import "@fontsource/poppins/200.css"
import "@fontsource/lora/500.css"
import "@fontsource/lora/500-italic.css"
import { GlobalStyles } from '../styles/global'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { useDarkMode } from '../utils/useDarkMode'

import Head from 'next/head'
import LoadingBar from '../components/LoadingBar'
import Header from '../components/Header'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'

import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {

  // Loading Bar
  function DisplayLoadingBar(loader:Object) {
    if(loader)return <LoadingBar />
      else return null
  }

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
    </Provider>
  )
}

export default MyApp