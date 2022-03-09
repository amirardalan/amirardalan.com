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
      div: {
        marginBottom: '.2rem'
      },
      'span.strong': {
        fontFamily: 'var(--font-secondary)',
        fontSize: 20,
      }
    },
    '.profileLink': {
      fontSize: 12,
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
        width={100}
        height={100}
        alt={data.name}
        css={{clipPath:`circle(50px at center)`}}
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