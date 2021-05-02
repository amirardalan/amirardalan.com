import { globalStyles } from '../styles/global'

function MyApp({ Component, pageProps }) {

  return <>
    {globalStyles}
    <Component {...pageProps} />
  </>
}

export default MyApp
