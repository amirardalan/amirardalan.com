import { useTheme } from '@emotion/react'
import Link from 'next/link'

export default function Footer() {

  const theme : any = useTheme()

  return (
    <footer
      css={{
      marginTop: '2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: '12px',
      padding: '1em',
      height: '100px',
      backgroundColor: theme.colors.background,
      color: theme.colors.grayscale,
      borderTop: '1px solid' + theme.colors.accent,
      lineHeight: '1.8em',
      animation: 'slideUp .25s forwards',
      transition: 'all 0.15s linear',
    }}>
      <div>
        Copyright &copy;
        {(new Date().getFullYear())}
        {' '}-{' '} Amir Ardalan
      </div>
      <div css={{
        'a': {
          textDecoration: 'none',
          padding: '0 .3em',
          '&::after': {
            content: '"•"',
            paddingLeft: '.5rem',
            color: theme.colors.grayscale,
          },
          '&:last-of-type::after': {
            content: '""',
          }
        },
        'div': { flexDirection: 'row'}
      }}>
        Made with <span>&hearts;</span> using Next.js + Prisma<br/>
        <Link href="/" aria-label="Home">
          Home
        </Link>
        <Link href="/blog" aria-label="Blog">
          Blog
        </Link>
        <Link href="/about" aria-label="About">
          About
        </Link>
        <Link href="/sitemap.xml" aria-label="Sitemap">
          Sitemap
        </Link>
      </div>
    </footer>
  )
}