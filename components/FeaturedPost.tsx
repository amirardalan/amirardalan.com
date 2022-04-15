import Link from 'next/link'
import { css } from '@emotion/react'


export default function featuredPost({ featuredPost, data }) {

  const styleFeaturedPost = css({
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
  
  const renderFeaturedPost = !featuredPost ? {} : featuredPost[0]
  
  const ShowFeaturedPost = ({ data }) => (
    featuredPost ?
    <div css={styleFeaturedPost}>
      <h2 aria-label={data?.featured?.title}>
        {data?.featured?.title}
      </h2>
      <article>
        <h3>
          {renderFeaturedPost ?
          <Link
            href={`/blog/${encodeURIComponent(renderFeaturedPost?.slug)}`}
            aria-label={renderFeaturedPost?.title}>
            {renderFeaturedPost?.title}
          </Link>
          : null}
        </h3>
        <p>{renderFeaturedPost?.teaser}</p>
      </article>
    </div> : null
  )

  return <ShowFeaturedPost data={data} />
}