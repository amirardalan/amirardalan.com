import { css } from '@emotion/react'
import Link from 'next/link'

export default function BlogError() {

  const styleBlogError = css({
    a: {
      fontFamily: 'var(--font-secondary)'
    }
  })

  return (
    <div css={styleBlogError}>
      <div>
        <div className="blogErrorHeading">
          <h1 className="pageHeading">Oops...</h1>
        </div>
        <p>That post doesn't seem to exist.</p>
        <Link
          href="/blog"
          aria-label="Blog"
        >
          Return to Blog
        </Link>
      </div>
    </div>
  )
}