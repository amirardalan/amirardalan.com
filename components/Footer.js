import Link from 'next/link'
import { css, useTheme } from '@emotion/react'

export default function Footer() {

  const theme = useTheme()

  return (
    <footer css={css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 1em;
      height: 100px;
      color: ${theme.colors.footer};
      font-size: .8rem;
      font-weight: 400;
      line-height: 2em;
      border-top: 1px solid ${theme.colors.divider};
      animation: fade-in 3s forwards;
    `}>
      <div>
        Copyright &copy;
        {(new Date().getFullYear())}
        {' '}-{' '} Amir Ardalan
      </div>
      <div css={css`
        font-size: 10px;
        a {
          color: ${theme.colors.footerLink};
          padding: 0 .3em;
          &:hover {
            text-decoration: underline;
          }
        }
        div {
          flex-direction: row;
        }
      `}>
        Made with <span>&hearts;</span> using: 
        <Link href="https://nextjs.org/"><a>Next.js</a></Link>+ 
        <Link href="https://emotion.sh/"><a>Emotion</a></Link>+ 
        <Link href="https://threejs.org/"><a>Three.js</a></Link>
      </div>
    </footer>
  )
}