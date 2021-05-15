import { css, useTheme } from '@emotion/react'

export default function Footer() {

  const theme : any = useTheme()

  return (
    <footer css={css`
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 12px;
      padding: 1em;
      height: 100px;
      background-color: ${theme.colors.background};
      color: ${theme.colors.footer};
      border-top: 1px solid ${theme.colors.divider};
      font-weight: 400;
      line-height: 1.5em;
      animation: slide-up .25s forwards;
      transition: all 0.25s linear;
    `}>
      <div>
        Copyright &copy;
        {(new Date().getFullYear())}
        {' '}-{' '} Amir Ardalan
      </div>
      <div css={css`
        a {
          color: ${theme.colors.footerLink};
          padding: 0 .3em;
          &:hover {
            text-decoration: underline;
          }
        }
        div { flex-direction: row; }
      `}>
        Made with <span>&hearts;</span> using: <br/>
        <a
          href="https://nextjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Next.js">
          Next.js
        </a>+ 
        <a
          href="https://emotion.sh/docs/introduction"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Emotion CSS">
          Emotion
        </a>+ 
        <a
          href="https://threejs.org/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Three.js">
          Three.js
        </a>
      </div>
    </footer>
  )
}