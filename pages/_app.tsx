import React from 'react'
import { useDarkMode } from '@/utils/useDarkMode'
import { themeLight, themeDark } from '@/styles/theme'
import { ThemeProvider } from '@emotion/react'
import { GlobalStyles } from '@/styles/global'

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

const MyApp = ({Component, pageProps }: AppProps) => {

  const [theme, toggleTheme] = useDarkMode()
  const themeMode: any = theme === 'light' ? themeLight : themeDark

  return (
    <React.StrictMode>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <Component {...pageProps} toggleTheme={toggleTheme} />
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  )
}

export default MyApp