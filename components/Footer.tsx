import { css } from '@emotion/react'
import Link from 'next/link'

export default function Footer() {

  const styleFooter = css({
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '12px',
    padding: '1em',
    height: '100px',
    color: 'var(--color-gray)',
    borderTop: '1px solid var(--color-accent)',
    lineHeight: '1.8em',
  })
  const styleFooterCopy = css({
    'a': {
      textDecoration: 'none',
      padding: '0 .3em',
      '&::after': {
        content: '"•"',
        paddingLeft: '.5rem',
        color: 'var(--color-gray)',
      },
      '&:last-of-type::after': {
        content: '""',
      }
    },
    'div': { flexDirection: 'row'}
  })

  return (
    <footer css={styleFooter}>
      <div>
        Copyright &copy; {(new Date().getFullYear()) + ' – '} Amir Ardalan &hearts;
      </div>
      <div css={styleFooterCopy}>
        Next.js + Prisma + Three.js<br/>
        <Link href="/" aria-label="Home">
          Home
        </Link>
        <Link href="/blog" aria-label="Blog">
          Blog
        </Link>
        <Link href="/about" aria-label="About">
          About
        </Link>
      </div>
    </footer>
  )
}