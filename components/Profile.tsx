import { css } from '@emotion/react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import Image from 'next/image'


export default function Profile() {
  
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
      'span.em': {
        fontFamily: 'var(--font-secondary)',
        fontSize: 20,
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
          <span className="em">{data.id}</span>
        </div>
        <div aria-label={data.followers + 'Followers'}>
          <span className="em">{data.followers}</span> Followers
        </div>
        <a
          href={`https://open.spotify.com/user/`+`${data.id}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${data.name}'s Spotify Profile`}>
          View Profile
        </a>
      </div>
    </div>
  )
}