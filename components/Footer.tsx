import { css, useTheme } from '@emotion/react'
import { footer } from '@/data/content'
import { nav } from '@/data/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const theme: any = useTheme()

  const styleFooterWrapper = css({
    marginTop: '6rem',
    padding: '4rem 4rem 1rem 4rem',
    backgroundColor: 'var(--color-accent-color)',
    '@media(max-width: 1024px)': {
      marginTop: '4rem',
      padding: '3.5rem 2.5rem 1rem 2.5rem',
    },
    '@media(max-width: 480px)': {
      padding: '3rem 1.5rem 1rem 1.5rem',
    }
  })
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
    flexDirection: 'column',
    fontFamily: 'var(--font-secondary)',
    fontSize: 20,
    color: 'var(--color-bg)',
    lineHeight: '1.8em',
    '.grid': {
      marginBottom: '2rem',
    },
    'a': {
      textDecoration: 'none',
      color: 'var(--color-bg)',
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
      '@media(max-width: 600px)': {
        width: '100%',
      }
    },
    '.small': {
      fontSize: 14,
      '@media(max-width: 1024px)': {
        fontSize: 10,
      },
      '@media(max-width: 480px)': {
        fontSize: 14,
      },
    },
  })
  const styleFooterLogo = css({
    display: 'flex',
    justifyContent: 'center',
    padding: '3rem 0',
    '@media(max-width: 1024px)': {
      padding: '1rem 0 3rem'
    }
  })
  const styleCopyright = css({
    fontFamily: 'var(--font-secondary)',
    fontSize: 10,
    color: 'var(--color-bg)',
    lineHeight: '1.2rem',
    display: 'flex',
    alignSelf: 'end',
  })
  const styleFooterNav= css({
    display: 'flex',
    flexDirection: 'column',
  })

  const generateFooterLinks = (items: Array<any>) => {
    return items.map((items, i) => {
      return (
        <li>
          <a
            key={i}
            href={items.path}
            aria-label={items.title}
            target={items.target}
            rel={items.rel}
            className={items?.cName}
          >
            {items.title}
          </a>
        </li>
      )
    })
  }

  return (
    <>
      <footer css={styleFooterWrapper}>
        <div css={styleFooter}>
          <div css={styleFooterNav} className="grid">
            <h5>{footer.headings.nav}</h5>
            <ul>
              {nav.map((item: any, index: number) => {
                return (
                  <li>
                    <Link
                      href={item.path}
                      aria-label={item.title}
                      key={index}
                    >
                      <a
                        className={item.cName}
                      >
                      {item.title}
                      </a>
                    </Link>
                  </li>
                )}
              )}
            </ul>
          </div>
          <div className="grid">
            <h5>{footer.headings.social}</h5>
            <ul>
              {generateFooterLinks(footer.social)}
            </ul>
          </div>
          <div className="grid">
            <h5>{footer.headings.poweredby}</h5>
            <ul>
              {generateFooterLinks(footer.poweredby)}
            </ul>
          </div>
          <div className="grid">
            <h5>{footer.headings.contact}</h5>
            <ul>
              {generateFooterLinks(footer.contact)}
            </ul>
          </div>
        </div>
        <div css={styleFooterLogo}>
          <Image
            src={theme.logoFooter}
            height={75}
            width={75}
            alt="Logo"
          />
        </div>
        <div css={styleCopyright}>
          <div>
            {footer.copyright.text} {(new Date().getFullYear())} – {footer.copyright.name}
          </div>
        </div>
      </footer>
    </>
  )
}