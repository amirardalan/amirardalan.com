import { ThemeProvider, css } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { GlobalStyles } from '../styles/global'
import { useDarkMode } from '../utils/useDarkMode'

import Meta from '../components/Meta'
import Toggle from '../components/Toggle'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ThreeCanvas from '../components/ThreeCanvas'

function MyApp({ Component, pageProps }) {

  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? themeLight : themeDark;

  if (!componentMounted) {
    return <div />
  };
  
  return (
    <ThemeProvider theme={ themeMode }>
      <Meta />
      <GlobalStyles />
        <div className="container">
          <div className="header">
            <Header />
            <Toggle theme={theme} toggleTheme={toggleTheme} />
          </div>
          <main>
            <div className="mainLeft">
              <Component {...pageProps} />
            </div>
            <div className="mainRight">
              <ThreeCanvas />
            </div>
          </main>
          <Footer />
        </div>
    </ThemeProvider>
  )
}

export default MyApp
