import React from 'react'
import Meta from '../components/Meta'
import { globalStyles } from '../styles/global'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Meta />
      {globalStyles}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
