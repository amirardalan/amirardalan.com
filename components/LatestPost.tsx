import Link from 'next/link'
import { css } from '@emotion/react'


export default function LatestPost({ latestPost, data }) {

  const styleLatestPost = css({
    fontWeight: 'normal',
    marginTop: '1rem',
    h4: {
      margin: '1.5rem 0 1rem',
      color: 'var(--color-text)',
      fontFamily: 'var(--font-primary)',
      fontSize: 15,
      fontWeight: 'normal',
      '&::before': {
        content: "'⮑ '",
      }
    },
    h5: {
      display: 'flex',
      a: {
        lineHeight: '1.2rem',
        fontFamily: 'var(--font-secondary)',
        fontSize: 18,
        fontWeight: 'normal',
        textDecoration: 'underline',
        cursor: 'pointer',
        '&:focus': {
          boxShadow: 'none',
        },
        '&:focus-visible': {
          boxShadow: '0 0 0 2px var(--color-accent-color)',
          outline: 'none',
        },
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
    latestPost ? 
    <div css={styleLatestPost}>
      <h4 aria-label={data.latestPost.title}>
        {data.latestPost.title}
      </h4>
      <h5>
        <Link
          href={`/blog/${encodeURIComponent(renderLatestPost?.slug)}`}
          aria-label={renderLatestPost?.title}>
          {renderLatestPost?.title}
        </Link>
      </h5>
      <p>
        {renderLatestPost?.teaser}
      </p>
    </div> : null
  )

  return <ShowLatestPost data={data} />
}