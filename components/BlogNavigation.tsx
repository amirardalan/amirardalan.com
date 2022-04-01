import { css } from '@emotion/react'
import Link from 'next/link'
import compareID from '@/utils/compareID'


export default function BlogNavigation({ feed, post, isPublished }) {

  const total : number = feed?.length
  const current : number = post?.id

  const arr = feed ? feed : null
  const arrSorted = arr.sort(compareID)
    
  const first = arr[0].id === current && isPublished
  const last = arr[total - 1].id === current && isPublished
  const only = first && last
  const prevPost = isPublished && !first && !only
  const nextPost = isPublished && !last && !only

  const index = arrSorted.findIndex((x: { id: number }) => x.id === current)
  const prevTitle = prevPost ? arr[index - 1].title : null
  const nextTitle = nextPost ? arr[index + 1].title : null
  const prevLink = prevPost ? `/blog/${encodeURIComponent(arr[index - 1].slug)}` : '#'
  const nextLink = nextPost ? `/blog/${encodeURIComponent(arr[index + 1].slug)}` : '#'

  const ShowPrevLink = () =>
    <div css={stylePrevLink}>
      <Link href={prevLink} aria-label={prevTitle}>
        <a>← {prevTitle}</a>
      </Link>
    </div>
  const ShowNextLink = () =>
    <div css={styleNextLink}>
      <Link href={nextLink} aria-label={nextTitle}>
        <a>{nextTitle} →</a>
      </Link>
    </div>

  const styleBlogNavigation = css({
    marginTop: '4rem',
    paddingTop: '4rem',
    display: 'flex',
    justifyContent: first ? 'flex-end' : 'space-between',
    borderTop: '1px solid var(--color-accent-neutral)',
    fontFamily: 'var(--font-secondary)',
    fontSize: 18,
    lineHeight: '1.3rem',
    '@media(max-width: 768px)': {
      flexDirection: 'row',
      fontSize: 16
    },
  })
  const stylePrevLink = css({
    paddingRight: '1rem',
    textAlign: 'left',
  })
  const styleNextLink = css ({
    paddingLeft: '1rem',
    textAlign: 'right',
  })

  return (
    <div css={styleBlogNavigation}>
       { prevPost ? <ShowPrevLink /> : null }
       { nextPost ? <ShowNextLink /> : null }
    </div>
  )
}