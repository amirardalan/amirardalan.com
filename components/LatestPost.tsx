import Link from 'next/link'
import { useTheme, css } from '@emotion/react'

export default function LatestPost(props: any) {

  // Latest Post Styles
  const theme : any = useTheme()
  const styleLatestPost = css({
    paddingLeft: '1.2rem',
    borderLeft: '7px solid' + theme.colors.accent,
    fontWeight: 'normal',
    lineHeight: '1.8rem',
    h4: {
      color: theme.colors.grayscale,
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: '1.3rem',
    },
    'p, a': {
      fontFamily: theme.fonts.tertiary,
    },
    a: {
      color: theme.colors.text,
      fontSize: 18,
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
      },
      '@media(max-width: 480px)': {
        fontSize: 16,
      }
    },
    p: {
      color: theme.colors.grayscale,
      fontSize: 15,
    },
  })
  
  // Latest Post UI
  const latestPost = (!props.latestPost) ? {} : props.latestPost[0]
  const showLatestPost = (props.latestPost) ? true : false
  const ShowLatestPost = () => (
    <div css={styleLatestPost}>
      <h4 aria-label="Latest Post">
        Latest Post:
      </h4>
      <Link href={`/blog/${encodeURIComponent(latestPost.slug)}`}>
        <a aria-label={latestPost.title} tabIndex={0}>
          {latestPost.title} →
        </a>
      </Link>
      <p>
        {latestPost.teaser}
      </p>
    </div>
  )

  return (
    <>
      { showLatestPost ? <ShowLatestPost /> : null }
    </>
  )
}