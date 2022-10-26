import { css, useTheme } from '@emotion/react'
import { footer } from '@/data/content'
import { nav } from '@/data/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Key } from 'react'


export default function Footer() {
  
  const theme: any = useTheme()
  const isDarkTheme = theme.active === 'dark'

  const styleFooterWrapper = css({
    position: 'relative',
    marginTop: '6rem',
    padding: '4rem 4rem 1rem 4rem',
    backgroundColor: 'var(--color-primary)',
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
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '3rem',
    gridAutoRows: 'minmax(100px, auto)',
    flexDirection: 'column',
    fontFamily: 'var(--font-secondary)',
    fontSize: 16,
    color: 'var(--color-bg)',
    '@media(max-width: 890px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    '@media(max-width: 480px)': {
      gap: '1.5rem',
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
    '.grid': {
      marginBottom: '1rem',
      '@media(max-width: 890px)': {
        marginBottom: 0,
      },
    },
    'a': {
      marginBottom: '.8rem',
      display: 'flex',
      flexDirection: 'row',
      width: 'fit-content',
      fontSize: 16,
      alignItems: 'center',
      textDecoration: 'none',
      color: 'var(--color-bg)',
      '&:focus': {
        boxShadow: '0 0 0 2px var(--color-accent-gray)',
        '&:focus:not(:focus-visible)': { boxShadow: 'none' },
      },
      '.icon': {
        marginLeft: '.2rem',
        lineHeight: 0,
        alignSelf: 'center'
      },
      '@media(max-width: 480px)': {
        marginBottom: '1.5rem',
      },
    },
    h4: {
      marginBottom: '1rem',
      paddingBottom: '1rem',
      lineHeight: '1rem',
      borderBottom: '2px solid var(--color-bg)',
      textTransform: 'uppercase',
      fontSize: 12,
      fontWeight: 800,
      '@media(max-width: 600px)': {
        width: '100%',
      }
    },
  })
  const styleFooterLogo = css({
    display: 'flex',
    padding: '4rem 0 3rem 0',
    background: 'var(--logo-footer) no-repeat',
    backgroundSize: 'contain',
    height: 75,
    width: 75,
    '@media(max-width: 768px)': {
      padding: 0,
    }
  })
  const styleCopyright = css({
    marginTop: '2rem',
    fontFamily: 'var(--font-primary)',
    fontSize: 10,
    color: 'var(--color-bg)',
    lineHeight: '1.2rem',
    display: 'flex',
    alignSelf: 'end',
    a: {
      color: 'var(--color-bg)'
    },
    '@media(max-width: 768px)': {
      marginTop: '1.5rem',
    }
  })
  const styleFooterNav= css({
    display: 'flex',
    flexDirection: 'column',
  })

  const generateFooterLinks = (items: any[]) => {
    return items.map((item, i: Key) => {
      return (
        <li key={i}>
          <a
            key={item.title}
            href={item.path}
            aria-label={item.title}
            target="_blank"
            rel="noopener noreferrer"
            className={item?.cName}
          >
            {item.title}
            <span className="icon">
              <Image
                src={isDarkTheme
                  ? item.icon?.dark
                  : item.icon?.light}
                height="15"
                width="15"
                alt={item.title}
                aria-label={item.title}
              />
            </span>
          </a>
        </li>
      )
    })
  }

  return (
    <footer css={styleFooterWrapper}>
      <div css={styleFooter}>
        <div className="grid">
          <div css={styleFooterLogo} />
        </div>
        <div css={styleFooterNav} className="grid">
          <h4>{footer.headings.nav}</h4>
          <ul>
            {nav.map((item: any, i: number) => {
              return (
                <li key={i}>
                  <Link href={item.path} aria-label={item.title}>
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
          <h4>{footer.headings.social}</h4>
          <ul>
            {generateFooterLinks(footer.social)}
          </ul>
        </div>
        <div className="grid">
          <h4>{footer.headings.poweredby}</h4>
          <ul>
            {generateFooterLinks(footer.poweredby)}
          </ul>
        </div>
      </div>
      <div css={styleCopyright}>
        <div>
        {footer.copyright.text}
        {(new Date().getFullYear()) + ' '}
        {footer.copyright.name + ' '} &mdash; All rights reserved
        </div>
        
      </div>
    </footer>
  )
}