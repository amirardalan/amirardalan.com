import React, { useState } from 'react'
import Meta from '../components/Meta'
import Head from 'next/head'
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
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={ themeMode }>
        <GlobalStyles />
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
