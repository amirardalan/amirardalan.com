import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="content-type" content="text/html; charset=utf-8" />
          <meta
            name="description"
            content="Front-End Developer &amp; UI Designer in Portland, OR"
          />
          <meta property="og:title" content="Amir Ardalan – Developer, Designer, Writer" />
          <meta property="og:description" content="Front-End Developer &amp; UI Designer in Portland, OR" />
          <meta property="og:url" content="https://amirardalan.com" />
          <meta property="og:site_name" content="Amir Ardalan" />
          <meta property="og:image" content="https://amirardalan.com/thumbnail.jpg" />
          <meta name="twitter:image:alt" content="Amir Ardalan Blog" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@amirardalan" />

          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/icon192.png" />
          <link rel="manifest" href="/manifest.json" />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}