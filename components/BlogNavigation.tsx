import { css } from '@emotion/react'
import sortBlogPosts from '@/utils/sortBlogPosts'
import Link from 'next/link'

export default function BlogNavigation({ props, isPublished }) {

  const total : number = props?.feed?.length
  const current : number = props?.post?.id

  // Sort Posts based on @/utils/sortBlogPosts
  const arr : Array<any> = props.feed ? props.feed : null
  const arrSorted = arr.sort(sortBlogPosts)
    
  // Error Handling
  const first = arr[0].id == current && isPublished
  const last = arr[total - 1].id == current && isPublished
  const only = first && last
  const prevPost = isPublished && !first && !only
  const nextPost = isPublished && !last && !only

  // Generate next/prev paths based on the post slug and conditionally render the links
  const index = arrSorted.findIndex(x => x.id === current)
  const prevTitle = prevPost ? arr[index - 1].title : null
  const nextTitle = nextPost ? arr[index + 1].title : null
  const prevLink = prevPost ? `/blog/${encodeURIComponent(arr[index - 1].slug)}` : '#'
  const nextLink = nextPost ? `/blog/${encodeURIComponent(arr[index + 1].slug)}` : '#'

  const ShowPrevLink = () => 
    <Link href={prevLink} aria-label={prevTitle}><a>← {prevTitle}</a></Link>
  const ShowNextLink = () => 
    <Link href={nextLink} aria-label={nextTitle}><a>{nextTitle} →</a></Link>

  // Style next/prev Links
  const styleBlogNavigation = css({
    marginTop: '4rem',
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: 'var(--font-tertiary)',
    fontSize: 16,
    a: {
      textDecoration: 'underline',
      '&:hover': {
        textDecoration: 'none',
      },
      '&:first-of-type': {
        textAlign: 'left',
        paddingRight: '1rem',
      },
      '&:last-of-type': {
        textAlign: 'right',
        paddingLeft: '1rem',
      },
    },
    '@media(max-width: 768px)': {
      flexDirection: 'row',
    },
  })

  return (
    <div css={styleBlogNavigation}>
       { prevPost ? <ShowPrevLink /> : null }
       { nextPost ? <ShowNextLink /> : null }
    </div>
  )
}