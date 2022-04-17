import { css, useTheme } from '@emotion/react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'


export default function Profile() {

  const theme: any = useTheme()
  
  const { data } = useSWR('/api/spotify/profile', fetcher)

  if (!data) {
    return null
  }

  const styleProfileWrapper = css({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '.profileInfo': {
      marginLeft: '1rem',
      'span.strong': {
        fontFamily: 'var(--font-secondary)',
        fontSize: 20,
        '@media(max-width: 768px)': {
          fontSize: 17
        }
      }
    },
    '.profileLink': {
      fontSize: 12,
      textTransform: 'uppercase',
      '&::after': {
        content: '""',
        marginLeft: 5,
        display: 'inline-block',
        background: `url('${theme.icons.externalAlt}')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: 15,
        height: 15,
      }
    }
  })

  return (
    <div css={styleProfileWrapper}>
      <Image
        src={data?.image}
        width={80}
        height={80}
        alt={data.name}
        css={{clipPath:`circle(40px at center)`}}
        priority
      />
      <div className="profileInfo">
        <div>
          <span className="strong">{data.id}</span>
        </div>
        <div aria-label={data.followers + 'Followers'}>
          <span className="strong">{data.followers}</span> followers
        </div>
        <a
          href={`https://open.spotify.com/user/`+`${data.id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${data.name}'s Spotify Profile`}
          className="profileLink">
          View Profile
        </a>
      </div>
    </div>
  )
}