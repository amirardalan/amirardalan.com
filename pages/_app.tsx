import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { GlobalStyles } from '../styles/global'
import { ThemeProvider } from '@emotion/react'
import { useDarkMode } from '../utils/useDarkMode'
import { themeLight, themeDark } from '../styles/theme'

import LoadingBar from '../components/LoadingBar'
import LoadingTriangle from '../components/LoadingTriangle'

import { Provider } from 'next-auth/client'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const BlogAdmin = dynamic(() => import('../components/BlogAdmin'), {
  loading: () => <LoadingTriangle />
})

const MyApp = ({Component, pageProps }: AppProps) => {

  const [theme, toggleTheme] = useDarkMode()
  const themeMode = (theme === 'light') ? themeLight : themeDark

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Head>
          <title>Amir Ardalan – Developer, Designer, Writer</title>
          <meta name="theme-color" content={themeMode.colors.background} />
        </Head>
        <LoadingBar />
        <div className="container">
          <Header toggleTheme={toggleTheme} />
          <BlogAdmin />
          <Component {...pageProps} />
          <Footer />
        </div>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp