import { css } from '@emotion/react'
import Link from 'next/link'
import { error } from '@/data/content'

export default function BlogError() {

  const styleBlogError = css({
    a: { fontFamily: 'var(--font-secondary)' }
  })

  return (
    <div css={styleBlogError}>
      <div>
        <div className="blogErrorHeading">
          <h1 className="pageHeading">
            {error.blogPostError.title}
          </h1>
        </div>
        <p>{error.blogPostError.text}</p>
        <Link
          href={error.blogPostError.link.title}
          aria-label={error.blogPostError.link.title}
        >
          {error.blogPostError.link.title}
        </Link>
      </div>
    </div>
  )
}