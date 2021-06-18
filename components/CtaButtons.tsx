import { useTheme } from '@emotion/react'
import Image from 'next/image'

export const generateCtaButtons = (items: Array<any>) => {
  const theme: any = useTheme()
  const isDarkTheme = theme.active === 'dark'

  return items.map((items, i) => {
    return (
      <a
        key={i}
        href={items.path}
        className="ctaButton"
        aria-label={items.title}
        target={items.target}
        rel={items.rel}
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
              alt={items.title}
              aria-label={items.title}
            />
          </span>
          : null}
      </a>
    )
  })
}