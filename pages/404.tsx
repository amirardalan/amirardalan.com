import { useTheme } from '@emotion/react'
import ErrorAnimation from '@/components/ErrorAnimation'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {

  const theme : any = useTheme()

  return(
    <>
      <Head>
        <title>Page Not Found – Amir Ardalan</title>
        <meta name="robots" content="noindex"></meta>
      </Head>

      <div css={{
        padding: '4rem 1.5rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.page.bg,
      }}>
        <ErrorAnimation />
        <div css={{
          display: 'flex',
          justifyContent: 'center',
          animation: 'slideUp .5s forwards',

          h2: {
            margin: '0 1rem 0 1rem',
            paddingRight: '1rem',
            alignSelf: 'center',
            borderRight: '1px solid' + theme.colors.grayscale,
            fontFamily: theme.fonts.secondary,
            fontSize: '40px',
          },
          h3: {
            alignSelf: 'center',
            fontSize: '12px',
            fontWeight: 'normal',
          },
        }}>
          <Image
            src={theme.logoError}
            alt="Error"
            aria-label="Error"
            width={40}
            height={40}
          />
          <h2 aria-label="404">
            404
          </h2>
          <h3 aria-label="This Page could not be found.">
            You seem to be lost in space...
          </h3>
        </div>
        <div css={{
          marginTop: '1.5rem',
          textAlign: 'center',
          animation: 'slideUp 1s forwards',
        }}>
          <Link
            href="/"
            aria-label="Return Home"
          >
            Return Home
          </Link>
        </div>
      </div>
    </>
  )
}