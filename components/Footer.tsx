import { css } from '@emotion/react'
import { footer } from '@/data/content'
import { nav } from '@/data/navigation'
import Link from 'next/link'

export default function Footer() {

  const styleFooter = css({
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
    gap: 10,
    gridAutoRows: 'minmax(100px, auto)',
    '@media(max-width: 600px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media(max-width: 480px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    marginTop: '6rem',
    flexDirection: 'column',
    fontFamily: 'var(--font-secondary)',
    fontSize: 20,
    padding: '3em',
    color: 'var(--color-bg)',
    backgroundColor: 'var(--color-accent-color)',
    lineHeight: '1.8em',
    'a': {
      textDecoration: 'none',
      color: 'var(--color-bg)',
      '&:hover': {
        textDecoration: 'underline',
      },
      '&:last-of-type::after': {
        content: '""',
      },
      '&.spotify': {
        display: 'flex',
        height: 20,
        width: 20,
        marginTop: '.5rem',
        background: 'var(--icon-spotify-footer) no-repeat',
        backgroundSize: 20,
      }
    },
    h5: {
      width: '90%',
      marginBottom: '1rem',
      paddingBottom: '1rem',
      lineHeight: '1rem',
      borderBottom: '2px solid var(--color-bg)',
      textTransform: 'uppercase',
      fontSize: 10,
      '&.shortBorder': {
        width: 'max-content',
      },
      '@media(max-width: 600px)': {
        width: '100%',
      }
    },
    '@media(max-width: 1024px)': {
      padding: '2rem 2.5rem',
    },
    '@media (max-width: 600px)': {
      padding: '2rem 1.5rem',
    },
    '.grid': {
      marginBottom: '1rem',
    },
  })
  const styleCopyright = css({
    fontSize: 14,
    lineHeight: '1.2rem',
  })
  const styleFooterNav= css({
    display: 'flex',
    flexDirection: 'column',
  })

  const generateNavCol = (items: Array<any>) => {
    return items.map((items, i) => {
      return (
        <li>
          <Link
            key={i}
            href={items.path}
            aria-label={items.title}>
            {items.title}
          </Link>
        </li>
      )
    })
  }

  return (
    <footer css={styleFooter}>
      <div className="grid">
        <ul css={styleCopyright}>
          <h5 className="shortBorder">hi@amirardalan.com</h5>
          <li>{footer.copyright.text} {(new Date().getFullYear())}</li>
          <li>{footer.copyright.name}</li>
        </ul>
      </div>
      <div css={styleFooterNav} className="grid">
        <h5>Explore</h5>
        <ul>
          {nav.map((item: any, index: number) => {
            return (
              <li>
                <Link href={item.path} aria-label={item.title} key={index}>
                  <a className={item.cName}>
                  {item.title}
                  </a>
                </Link>
              </li>
            )}
          )}
        </ul>
      </div>
      <div className="grid">
        <h5>Connect</h5>
        <ul>
          {generateNavCol(footer.social)}
        </ul>
      </div>
      <div className="grid">
        <h5>Powered By</h5>
        <ul>
          {generateNavCol(footer.poweredby)}
        </ul>
      </div>
    </footer>
  )
}