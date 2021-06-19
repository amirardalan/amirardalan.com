import { Global, useTheme } from '@emotion/react'
import Image from 'next/image'

export const generateCtaButtons = (items: Array<any>) => {
  const theme: any = useTheme()
  const isDarkTheme = theme.active === 'dark'

  return items.map((items, i) => {
    return (
      <>
        <a
          key={i}
          href={items.path}
          className="ctaButton"
          aria-label={items.title}
          target={items?.target}
          rel={items?.rel}
          data-screen-name={items?.screenname}
        >
          {items.title}
          {items.icon ?
          <span className="icon">
            <Image
              src={isDarkTheme
                ? items.icon?.dark
                : items.icon?.light}
              height="18"
              width="18"
              alt={items?.title}
              aria-label={items?.title}
            />
          </span>
          : null}
        </a>
        <Global styles={{
          '.ctaButton': {
            minWidth: 128,
            minHeight: 45,
            marginRight: '.8rem',
            marginBottom: '.8rem',
            padding: '.5rem 1rem',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--color-text)',
            border: '1px solid transparent',
            borderRadius: 8,
            color: 'var(--color-bg)',
            fontSize: 15,
            fontWeight: 400,
            textDecoration: 'none',
            cursor: 'pointer',
            '&:first-of-type': {
              marginLeft: 0,
            },
            '&:last-of-type': {
              marginRight: 0,
            },
            '&:only-of-type': {
              margin: 0,
            },
            'span.none': {
              display: 'none',
            },
            '&:hover': {
              background: 'var(--color-accent-color)',
              border: '1px solid var(--color-accent-color)',
            },
            '&.disabled': {
              cursor: 'pointer',
              background: 'transparent',
              color: 'var(--color-text)',
              border: '1px solid var(--color-accent-gray)',
              '&:hover': {
                background: 'transparent',
                border: '1px solid var(--color-accent-gray)'
              },
              '&:active': {
                border: '1px solid var(--color-accent-color)'
              },
            },
            '.icon': {
              marginLeft: '.4rem',
              lineHeight: 0,
            },
            '@media(max-width: 1024px)': {
              '&:hover': {
                background: 'var(--color-text)',
                border: '1px solid transparent',
              },
            },
            '@media(max-width: 360px)': {
              marginRight: 0,
              width: '100%',
            }
          }
        }}/>
      </>
    )
  })
}