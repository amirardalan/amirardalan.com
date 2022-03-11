import { useTheme } from '@emotion/react'
import Image from 'next/image'
import { about } from '@/data/content'
import { Key } from 'react'

export default function SocialIcons() {

  const theme: any = useTheme()
  const isDarkTheme = theme.active === 'dark'

  const GenerateSocialIcons = (items: any[]) => {
    return items.map((items, i: Key) => {
      return (
        <a key={i}
          href={items.path}
          target="_blank"
          rel="noreferrer noopener"
          title={items.title}
          aria-label={items.title}
        >
          <Image
            src={isDarkTheme
              ? items.icon.dark
              : items.icon.light}
            height="48"
            width="48"
            alt={items.title}
            aria-label={items.title}
            priority
          />
        </a>
      )
    })
  }

  return <>{GenerateSocialIcons(about.social.items)}</>
}