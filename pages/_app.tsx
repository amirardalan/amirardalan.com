import React from 'react'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import GtagRoutes from '@/lib/GtagRoutes'


const App = ({ Component, pageProps }: AppProps) => {

  GtagRoutes()

  return (
    <React.StrictMode>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </React.StrictMode>
  )
}

export default App