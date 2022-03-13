import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import animateCount from '@/utils/animateCount'


export default function BlogStats({ feed, activeCategories }) {

  const [pageLoaded, setPageLoaded] = useState(false)

  useEffect(() => {
    setPageLoaded(true)
    animateCount()
  }, [pageLoaded])

  const postsNumber = pageLoaded ? feed.length : 0
  const categoriesNumber = pageLoaded ? activeCategories.length : 0


  const styleBlogStatsWrapper = css({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    '@media(max-width: 1024px)': {
      marginBottom: '.8rem',
      paddingBottom: '.8rem',
    },
    ul: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    li: {
      display: 'inline',
      marginRight: '1.5rem',
      '&:last-of-type': {
        marginRight: 0,
      },
      '.number': {
        marginRight: '.3rem',
        fontFamily: 'var(--font-secondary)',
        fontSize: 18,
      },
      '.text': {
        fontSize: 12,
        color: 'var(--color-gray)'
      }
    }
  })

  return (
    <div css={styleBlogStatsWrapper}>
      <h1 className="blogHeading">Blog</h1>
      <ul>
        <li>
          <span className="number countUp">
            {postsNumber}
          </span>
          <span className="text">articles</span>
        </li>
        <li>
          <span className="number countUp">
            {categoriesNumber}
          </span>
          <span className="text">categories</span>
        </li>
      </ul>
    </div>
  )
}