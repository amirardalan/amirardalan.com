import Link from 'next/link'
import { css, useTheme } from '@emotion/react'
import * as gtag from '../lib/gtag'

export default function Footer() {

  const LinkNextjsGA = () => {
    gtag.event({
        category: 'Link',
        action: 'Next.js Link Clicked'
    })
  }

  const LinkEmotionGA = () => {
    gtag.event({
        category: 'Link',
        action: 'Emotion Link Clicked'
    })
  }

  const LinkThreejsGA = () => {
    gtag.event({
        category: 'Link',
        action: 'Three.js Link Clicked'
    })
  }

  const theme = useTheme()

  return (
    <footer css={css`
      margin-top: 2rem;
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
        <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" onClick={LinkNextjsGA} aria-label="Next.js">Next.js</Link>+ 
        <Link href="https://emotion.sh/" target="_blank" rel="noopener noreferrer" onClick={LinkEmotionGA} aria-label="Emotion CSS">Emotion</Link>+ 
        <Link href="https://threejs.org/" target="_blank" rel="noopener noreferrer" onClick={LinkThreejsGA} aria-label="Three.js">Three.js</Link>
      </div>
    </footer>
  )
}