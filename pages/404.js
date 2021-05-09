// pages/404.js
import { css, useTheme } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {

  const theme = useTheme()

  return(
    <div css={css`
      background-color: ${theme.page.bg};
      padding: 6rem 1.5rem;
    `}>
      <div css={css`
        display: flex;
        justify-content: row;
        justify-content: center;
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
        <h1>404</h1>
        <h2>This page could not be found.</h2>
      </div>
      <div css={css`
        margin-top: 1.5rem;
        text-align: center;
      `}>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  )
}