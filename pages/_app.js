import Meta from '../components/Meta'
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
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
