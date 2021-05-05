import Meta from '../components/Meta'
import Footer from '../components/Footer'
import ThreeCanvas from '../components/ThreeCanvas'
import { ThemeProvider } from '@emotion/react'
import { themeLight, themeDark } from '../styles/theme'
import { GlobalStyles } from '../styles/global'
import { useDarkMode } from '../utils/useDarkMode'
import Toggle from '../components/Toggle'

function MyApp({ Component, pageProps }) {

  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? themeLight : themeDark;

  if (!componentMounted) {
    return <div />
  };
  
  return (
    <>
      <Meta />
      <ThemeProvider theme={ themeMode }>
        <GlobalStyles />
          <div className="container">
            <div className="header">
              <Toggle theme={theme} toggleTheme={toggleTheme} />
            </div>
            <main>
              <div className="mainLeft"> 
                <h2 className="content">
                  <Component {...pageProps} />
                </h2>
              </div>
              <div className="mainRight">
                <h4>
                  Infinite Chill
                </h4>
                <ThreeCanvas />
              </div>
            </main>
            <Footer />
          </div>
      </ThemeProvider>
    </>
  )
}

export default MyApp
