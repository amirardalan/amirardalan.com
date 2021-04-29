import Image from 'next/image'
import { globalStyles } from '../shared/styles'

function MyApp({ Component, pageProps }) {

  return <>
    {globalStyles}
    <Component {...pageProps} />
    <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={globalStyles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
  </>
}

export default MyApp
