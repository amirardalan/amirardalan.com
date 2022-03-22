import Link from 'next/link'
import formatDate from '@/utils/formatDate'
import calculateReadTime from '@/utils/calculateReadTime'


const Post = ({ post }) => {

  const publishDate = formatDate(post.publishedAt)
  const postReadTime = calculateReadTime(post.content)

  return (
    <div className="blog postTeaser">
      <div className="blogListHeading">
        <Link
          href={`/blog/${post.slug}`}
          aria-label={post.title}
        >
          {post.title}
        </Link>
      </div>
      <div
        className="postDetails"
        aria-label={`${publishDate} • ${postReadTime}`}>
          <div className="postDetails">
            <time dateTime={post.publishedAt}>{publishDate}</time>
            <span className="readTime">• {postReadTime}</span>
          </div>
        </div>
      <p>{post.teaser}</p>
    </div>
  )
}

export default Post