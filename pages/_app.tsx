import Head from 'next/head'
import Header from '../components/Header'
import Navigation  from '../components/Navigation'
import Toggle from '../components/Toggle'
import Footer from '../components/Footer'

import { GlobalStyles } from '../styles/global'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { useDarkMode } from '../utils/useDarkMode'

import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'

import LoadingBar from '../components/LoadingBar'
import { useLoadingBar } from '../utils/useLoadingBar'

const MyApp = ({ Component, pageProps }: AppProps) => {

  // Toggle Dark Mode
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === 'light' ? themeLight : themeDark

  // Show Loading Bar
  const loading = useLoadingBar()

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
            <div className="headerRight">
              <Navigation />
              <Toggle toggleTheme={toggleTheme} />
            </div>
          </div>
          <Component {...pageProps} />
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp