import { css } from '@emotion/react'
import { footer } from '@/data/content'
import { nav } from '@/data/navigation'
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
      },
      '&.spotify': {
        marginLeft: '.4rem',
        background: 'var(--icon-spotify) no-repeat',
        backgroundSize: '100%',
      }
    },
    'div': { flexDirection: 'row'}
  })

  return (
    <footer css={styleFooter}>
      <div>
        {footer.copyright.text} {(new Date().getFullYear()) + ' – '} {footer.copyright.name}
      </div>
      <div css={styleFooterCopy}>
        {footer.poweredby}<br/>
        {nav.map((item: any, index: number) => {
          return (
            <Link href={item.path} aria-label={item.title} key={index}>
              <a className={item.cName}>
              {item.title}
              </a>
            </Link>
          )}
        )}
      </div>
    </footer>
  )
}