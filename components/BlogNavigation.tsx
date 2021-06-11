import { css } from '@emotion/react'
import sortBlogPosts from '@/utils/sortBlogPosts'
import Link from 'next/link'

export default function BlogNavigation({ props, isPublished }) {

  const total : number = props.feed.length
  const current : number = props.post.id

  // Sort Posts based on @/utils/sortBlogPosts
  const arr : Array<any> = props.feed ? props.feed : null
  const arrSorted = arr.sort(sortBlogPosts)
    
  // Error Handling
  const first = (arr[0].id == current && isPublished) ? true : false
  const last = (arr[total - 1].id == current && isPublished) ? true : false
  const only = (first && last)
  const errHandlePrev = (isPublished && !first && !only)
  const errHandleNext= (isPublished && !last && !only)

  // Generate next/prev paths based on the post slug and conditionally render the links
  const index = arrSorted.findIndex(x => x.id === current)
  const prevTitle = errHandlePrev ? arr[index - 1].title : null
  const nextTitle = errHandleNext ? arr[index + 1].title : null
  const prevLink = errHandlePrev ? `/blog/${encodeURIComponent(arr[index - 1].slug)}` : '#'
  const nextLink = errHandleNext ? `/blog/${encodeURIComponent(arr[index + 1].slug)}` : '#'

  const ShowPrevLink = () => 
    <Link href={prevLink} aria-label={prevTitle}><a>← {prevTitle}</a></Link>
  const ShowNextLink = () => 
    <Link href={nextLink} aria-label={nextTitle}><a>{nextTitle} →</a></Link>

  const styleBlogNavigation = css({
    marginTop: '4rem',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-tertiary)',
    fontSize: 18,
    a: {
      textDecoration: 'underline',
      '&:first-of-type': {
        textAlign: 'left',
        paddingRight: '1rem',
      },
      '&:last-of-type': {
        textAlign: 'right',
        paddingLeft: '1rem',
      },
      '&:hover': {
        textDecoration: 'none',
      },
    },
    '@media(max-width: 768px)': {
      flexDirection: 'row',
    },
  })

  return (
    <div css={styleBlogNavigation}>
       { errHandlePrev ? <ShowPrevLink /> : null }
       { errHandleNext ? <ShowNextLink /> : null }
    </div>
  )
}