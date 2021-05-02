import Meta from '../components/Meta'
import { globalStyles } from '../styles/stylesGlobal'

function MyApp({ Component, pageProps }) {

  return <>
    <Meta />
    {globalStyles}
    <Component {...pageProps} />
  </>
}

export default MyApp
