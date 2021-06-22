import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/fira-code-latin-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins-latin-700.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/poppins-latin-900.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/lora-latin-500.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/lora-latin-500-italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta
            name="description"
            content="Fullstack developer, UI designer &amp; React enthusiast based in Portland, OR"
          />
          <meta property="og:title" content="Amir Ardalan – Developer, Designer, Writer" />
          <meta property="og:description" content="Fullstack developer, UI designer &amp; React enthusiast based in Portland, OR" />
          <meta property="og:url" content="https://amirardalan.com" />
          <meta property="og:site_name" content="Amir Ardalan" />
          <meta property="og:image" content="https://amirardalan.com/thumbnail.jpg" />
          <meta name="twitter:image" content="https://amirardalan.com/thumbnail.jpg" />
          <meta name="twitter:image:alt" content="Amir Ardalan Blog" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@amirardalan" />

          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/touch-192.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              function getUserPreference() {
                if(window.localStorage.getItem('theme')) {
                  return window.localStorage.getItem('theme')
                }
                return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light'
              }
              document.body.dataset.theme = getUserPreference();
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}