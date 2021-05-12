import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Portfolio of Amir Ardalan. Front-End Engineer and UI Designer with 6+ years professional experience crafting online experiences for top brands."
          />
          <meta property="og:title" content="Amir Ardalan | Portfolio" />
          <meta property="og:description" content="Portfolio of Front-End Engineer and UI Designer Amir Ardalan" />
          <meta property="og:url" content="https://amirardalan.com" />
          <meta property="og:site_name" content="Amir Ardalan" />
          <meta property="og:image" content="https://amirardalan.com/thumbnail.jpg" />
          <meta name="twitter:image:alt" content="Amir Ardalan Portfolio" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@amirardalan" />

          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/icon192.png" />
          <link rel="manifest" href="/manifest.json" />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}