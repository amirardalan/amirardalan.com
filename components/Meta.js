import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      <title>Amir Ardalan | Portfolio</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Portfolio of Amir Ardalan. Front-End Engineer and UI Designer with 6+ years professional experience crafting online experiences for top brands."
      />
      <meta property="og:title" content="Amir Ardalan – Portfolio" />
      <meta property="og:description" content="Portfolio of Front-End Engineer and UI Designer Amir Ardalan" />
      <meta property="og:url" content="https://amirardalan.com" />
      <meta property="og:site_name" content="Amir Ardalan" />
      <meta property="og:image" content="https://amirardalan.com/thumbnail.jpg" />
      <meta name="twitter:image:alt" content="Amir Ardalan Portfolio" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@amirardalan" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}