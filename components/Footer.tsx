import { css, useTheme } from '@emotion/react'

export default function Footer() {

  const theme : any = useTheme()

  return (
    <footer css={css`
      font-family: Menlo, Monaco, 'Courier New', monospace;
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
      line-height: 1.8em;
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
          text-decoration: none;
          padding: 0 .3em;
          &::after {
            content: '•';
            padding-left: .5rem;
            color: ${theme.colors.footer};
          }
          &:last-of-type::after {
            content: '';
          }
        }
        div { flex-direction: row; }
      `}>
        Made with <span>&hearts;</span> using Next.js + Prisma<br/>
        <a
          href="https://github.com/amirardalan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github">
          GitHub
        </a>
        <a
          href="https://twitter.com/amirardalan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter">
          Twitter
        </a>
        <a
          href="https://linkedin.com/in/amirardalan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn">
          LinkedIn
        </a>
        <a
          href="/amir-ardalan-resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Resume">
          Resume
        </a>
      </div>
    </footer>
  )
}