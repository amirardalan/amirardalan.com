import Link from 'next/link'
import Image from 'next/image'
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
              <Link href="/">
                <a className="title">
                  <h1>Amir Ardalan Portfolio</h1>
                </a>
              </Link>
              <Toggle theme={theme} toggleTheme={toggleTheme} />
            </div>
            <main>
              <div className="mainLeft">
                <div className="profileImage">
                  <Image
                    src="/photo.png"
                    alt="Picture Amir Ardalan"
                    width={100}
                    height={100}
                  />
                </div>   
                <h2 className="content">
                  <Component {...pageProps} />
                </h2>
              </div>
              <div className="mainRight">
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
