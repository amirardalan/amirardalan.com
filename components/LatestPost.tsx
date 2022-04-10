import Link from 'next/link'
import { css } from '@emotion/react'


export default function LatestPost({ latestPost, data }) {

  const styleLatestPost = css({
    h2: {
      margin: '2rem 0 .5rem',
      fontFamily: 'var(--font-primary)',
      fontSize: 12,
      fontWeight: 'normal',
      textTransform: 'uppercase',
      '&:before': {
        content: '""',
        display: 'inline-block',
        background: 'var(--icon-arrow) no-repeat',
        backgroundSize: 'contain',
        height: 10,
        width: 10,
        marginRight: '.5rem',
      }
    },
    'h3 a' : {
      fontFamily: 'var(--font-secondary)',
      fontSize: 18,
      fontWeight: 700,
    },
    p: {
      marginTop: '.5rem',
      lineHeight: '1rem',
      fontSize: 11,
      color: 'var(--color-neutral)',
      '@media(max-width: 480px)': {
        display: 'none'
      }
    },
  })
  
  const renderLatestPost = !latestPost ? {} : latestPost[0]
  
  const ShowLatestPost = ({ data }) => (
    latestPost ?
    <div css={styleLatestPost}>
      <h2 aria-label={data.latestPost.title}>
        {data.latestPost.title}
      </h2>
      <article>
        <h3>
          <Link
            href={`/blog/${encodeURIComponent(renderLatestPost?.slug)}`}
            aria-label={renderLatestPost?.title}>
            {renderLatestPost?.title}
          </Link>
        </h3>
        <p>{renderLatestPost?.teaser}</p>
      </article>
    </div> : null
  )

  return <ShowLatestPost data={data} />
}