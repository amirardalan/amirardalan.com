import Link from 'next/link'
import { css } from '@emotion/react'


export default function featuredPost({ home, featuredPost, latestPost }) {

  const styleFeaturedPost = css({
    marginTop: '2.25rem',
    borderLeft: '6px solid var(--color-accent-gray)',
    paddingLeft: '1.25rem',
    width: 'fit-content',
    h2: {
      display: 'flex',
      alignItems: 'baseline',
      paddingBottom: '.25rem',
      fontFamily: 'var(--font-primary)',
      fontSize: 13,
      fontWeight: 400,
      color: 'var(--color-gray)',
      '&:before': {
        display: 'flex',
        alignSelf: 'center',
        content: '""',
        background: 'var(--icon-pin) no-repeat',
        backgroundSize: 'contain',
        height: 13,
        width: 13,
        marginRight: '.35rem',
      }
    },
    'h3 a' : {
      fontFamily: 'var(--font-secondary)',
      fontSize: 18,
      fontWeight: 700,
      '@media(max-width: 480px)': {
        fontSize: 16,
      }
    },
    p: {
      marginTop: '.25rem',
      lineHeight: '1.25rem',
      fontSize: 15,
      fontFamily: 'var(--font-tertiary)',
      fontStyle: 'italic',
      color: 'var(--color-gray)',
    },
  })

  const renderFeaturedPost = !featuredPost ? latestPost : featuredPost
  const componentTitle = featuredPost ? home.featured.title : home.latest.title
  
  if (latestPost || featuredPost) {
    return (
      <div css={styleFeaturedPost}>
        <h2 aria-label={componentTitle}>
          {componentTitle}
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
      </div>
    )
  } else return null
}