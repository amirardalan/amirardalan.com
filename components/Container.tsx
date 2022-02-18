import Head from 'next/head'
import { useRouter } from 'next/router'
import { useThemeContext } from '@/utils/useThemeContext'
import { themeLight, themeDark } from '@/styles/theme'
import { GlobalStyles } from '@/styles/global'
import { ThemeProvider } from '@emotion/react'
import LoadingBar from '@/components/LoadingBar'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

import dynamic from 'next/dynamic'
const BlogAdmin = dynamic(() => import('@/components/BlogAdmin'),{
  ssr: false
})

export default function Container(props: any) {

  const { children, ...customMeta } = props;
  const router = useRouter()
  const meta = {
    title: 'Amir Ardalan – Code, design, and ideas from Portland, OR.',
    description: `Front-end developer, UI designer &amp; React enthusiast.`,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/thumbnail.jpg`,
    type: 'website',
    ...customMeta
  }

  const [theme, toggleTheme] = useThemeContext()
  const themeMode = theme === 'light' ? themeLight : themeDark

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}${router.asPath}`} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Amir Ardalan" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="thumbnail" property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@amirardalan" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:image:alt" content={meta.title} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>

      <GlobalStyles />
        <ThemeProvider theme={themeMode}>
          <BlogAdmin />
          <LoadingBar />

          <Header toggleTheme={toggleTheme} />

          <main className="container">
            {children}
          </main>
          <Footer />
      </ThemeProvider>
    </>
  )
}
