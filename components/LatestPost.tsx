import Link from 'next/link'
import { css } from '@emotion/react'


export default function LatestPost({ latestPost, data }) {

  const styleLatestPost = css({
    fontWeight: 'normal',
    h3: {
      marginBottom: '.6rem',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-primary)',
      fontSize: 12,
      fontWeight: 'normal',
      '&::before': {
        content: "'> '"
      }
    },
    h4: {
      display: 'flex',
      a: {
        lineHeight: '1.2rem',
        fontFamily: 'var(--font-secondary)',
        fontSize: 18,
        fontWeight: 'normal',
        textDecoration: 'underline',
        cursor: 'pointer',
        '@media(max-width: 480px)': {
          fontSize: 16,
        }
      }
    },
    p: {
      marginTop: '.5rem',
      lineHeight: '1.2rem',
      color: 'var(--color-gray)',
      fontSize: 14,
    },
  })
  
  const renderLatestPost = !latestPost ? {} : latestPost[0]
  const ShowLatestPost = ({ data }) => (
    <div css={styleLatestPost}>
      <h3 aria-label={data.latestPost.title}>
        {data.latestPost.title}
      </h3>
      <h4>
        <Link href={`/blog/${encodeURIComponent(renderLatestPost?.slug)}`}>
          <a aria-label={renderLatestPost?.title} tabIndex={0}>
            {renderLatestPost?.title} →
          </a>
        </Link>
      </h4>
      <p>
        {renderLatestPost?.teaser}
      </p>
    </div>
  )

  return (
    <>{ latestPost ? <ShowLatestPost data={data} /> : null }</>
  )
}