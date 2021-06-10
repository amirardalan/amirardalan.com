import React from 'react'
import { GlobalStyles } from '@/styles/global'
import { ThemeProvider } from '@emotion/react'
import { useThemeContext } from '@/utils/useThemeContext'
import { themeLight, themeDark } from '@/styles/theme'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'



const App = ({ Component, pageProps }: AppProps) => {

  // Theme Context for non-CSS
  const [theme, toggleTheme] = useThemeContext()
  const themeMode = theme === 'light'
    ? themeLight
    : themeDark

  return (
    <React.StrictMode>
      <Provider session={pageProps.session}>
        <GlobalStyles />
        <ThemeProvider theme={themeMode}>
          <Component {...pageProps} toggleTheme={toggleTheme} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default App