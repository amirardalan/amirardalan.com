import { useTheme, css } from '@emotion/react'
import Link from './Link'


export default function Navigation() {

  const theme : any = useTheme()

  const mainNav = css({
    display: 'flex',
    alignItems: 'center',
    marginRight: '1.5rem',
    a: {
      margin: '0 1.5rem',
      color: theme.colors.text,
      '&:hover': {
        color: theme.colors.footer,
      }
    }
  })

  return (
    <div css={mainNav}>
      <Link href="/" activeClassName="active" aria-label="Home">
        <a className="nav">Home</a>
      </Link>
      <Link href="/bio" activeClassName="active" aria-label="Bio">
        <a className="nav">Bio</a>
      </Link>
      <Link href="/blog" activeClassName="active" aria-label="Blog">
        <a className="nav">Blog</a>
      </Link>
    </div>
  )
}