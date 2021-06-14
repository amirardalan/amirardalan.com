import Link from 'next/link'
import { css } from '@emotion/react'

export default function LatestPost({ latestPost, data }) {

  // Latest Post Styles
  const styleLatestPost = css({
    paddingLeft: '1.2rem',
    borderLeft: '7px solid var(--color-accent)',
    fontWeight: 'normal',
    lineHeight: '1.4rem',
    h3: {
      marginBottom: '.3rem',
      color: 'var(--color-gray)',
      fontFamily: 'var(--font-primary)',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1.3rem',
    },
    'a': {
      fontFamily: 'var(--font-secondary)',
    },
    'h4 a': {
      fontSize: 18,
      fontWeight: 'normal',
      textDecoration: 'underline',
      cursor: 'pointer',
      '@media(max-width: 480px)': {
        fontSize: 16,
      }
    },
    p: {
      color: 'var(--color-gray)',
      fontSize: 15,
    },
  })
  
  // Latest Post UI
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