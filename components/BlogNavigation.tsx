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

  return (
    <div className="nextPrevControls">
    <div className="prevLink">
      { errHandlePrev ? <ShowPrevLink /> : null }
    </div>
    <div className="nextLink">
      { errHandleNext ? <ShowNextLink /> : null }
    </div>
  </div>
  )
}