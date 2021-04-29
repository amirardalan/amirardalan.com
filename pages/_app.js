import { globalStyles } from '../shared/styles'

function MyApp({ Component, pageProps }) {

  return <>
    {globalStyles}
    <Component {...pageProps} />
  </>
}

export default MyApp
