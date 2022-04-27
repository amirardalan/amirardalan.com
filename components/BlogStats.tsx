import { css } from '@emotion/react'
import CountUp from 'react-countup'


export default function BlogStats({ feed, activeCategories, filteredPosts }) {

  const filterActive = filteredPosts.length < feed.length
  const postsNumber = filterActive ? filteredPosts.length : feed.length
  const categoriesNumber = activeCategories.length

  const styleBlogStatsWrapper = css({
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    ul: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    li: {
      lineHeight: '1rem',
      display: 'inline',
      '&.catsCount': {
        display: filterActive ? 'none' : 'inline-block'
      },
      '@media(max-width: 1024px)': {
        marginBottom: '.25rem'
      },
      '&:last-of-type': {
        marginLeft: '1rem',
      },
      '.number': {
        marginRight: '.3rem',
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
        <li className="postsCount">
          <CountUp
            start={0}
            end={postsNumber}
            delay={0}
            duration={.5}
            decimals={0}
          >
            {({ countUpRef }) => (
              <span className="number" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text">posts</span>
        </li>
        <li className="catsCount">
          <CountUp
            start={0}
            end={categoriesNumber}
            delay={0}
            duration={.5}
            decimals={0}
          >
            {({ countUpRef }) => (
              <span className="number" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text">categories</span>
        </li>
      </ul>
    </div>
  )
}