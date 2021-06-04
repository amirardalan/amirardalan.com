import { GlobalStyles } from '@/styles/global'
import { ThemeProvider } from '@emotion/react'
import { useDarkMode } from '@/utils/useDarkMode'
import { themeLight, themeDark } from '@/styles/theme'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingBar from '@/components/LoadingBar'

import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

import dynamic from 'next/dynamic'
const BlogAdmin = dynamic(() => import('../components/BlogAdmin'))


const MyApp = ({Component, pageProps }: AppProps) => {

  const [theme, toggleTheme] = useDarkMode()
  const themeMode = (theme === 'light') ? themeLight : themeDark

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
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