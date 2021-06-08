import React from 'react'
import { GlobalStyles } from '@/styles/global'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'


const App = ({ Component, pageProps }: AppProps) => {

  return (
    <React.StrictMode>
      <Provider session={pageProps.session}>
        <GlobalStyles />
          <Component {...pageProps} />
        </Provider>
    </React.StrictMode>
  )
}

export default App