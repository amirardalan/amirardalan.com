import type { NextPage } from 'next';
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

const Document: NextPage<DocumentProps> = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" href="/touch-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="content-type" content="text/html; charset=utf-8" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_ANALYTICS_ID}');
            `,
          }}
        />
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
            document.documentElement.dataset.theme = getUserPreference();
          `,
          }}
        />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
