import { useEffect } from 'react'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { GlobalStyles } from '../styles/global'
import { useDarkMode } from '../utils/useDarkMode'

import ReactGA from 'react-ga'
import Meta from '../components/Meta'
import Toggle from '../components/Toggle'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {

  // Google Analytics
  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  console.log(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS)

  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? themeLight : themeDark;

  if (!componentMounted) {
    return <div />
  };
  
  return (
    <ThemeProvider theme={themeMode}>
      <Meta />
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
