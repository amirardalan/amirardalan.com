import { css, useTheme } from '@emotion/react'
import ErrorAnimation from '../components/ErrorAnimation'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {

  const theme = useTheme()

  return(
    <>
      <Head>
        <title>Page Not Found | Amir Ardalan</title>
      </Head>

      <div css={css`
        padding: 4rem 1.5rem;
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: ${theme.page.bg};
      `}>
        <ErrorAnimation />
        <div css={css`
          display: flex;
          justify-content: row;
          justify-content: center;
          animation: fade-in .5s forwards;
          animation: slide-up .5s forwards;

          h1 {
            border-right: 1px solid #999;
            margin: 0 1rem 0 1rem;
            padding-right: 1rem;
          }
          h2 {
            font-size: 12px;
            font-weight: 400;
          }
          h1, h2 {
            align-self: center;
          }
        `}>
          <Image
            src={theme.logoError}
            alt="Error"
            aria-label="Error"
            width={40}
            height={40}
          />
          <h1 aria-label="404">
            404
          </h1>
          <h2 aria-label="This Page could not be found.">
            You seem to be lost in space...
          </h2>
        </div>
        <div css={css`
          margin-top: 1.5rem;
          text-align: center;
          animation: fade-in 1s forwards;
          animation: slide-up 1s forwards;
        `}>
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