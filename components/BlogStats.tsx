import { css } from '@emotion/react'
import CountUp from 'react-countup'


export default function BlogStats({ feed, activeCategories }) {

  const postsNumber = feed.length
  const categoriesNumber = activeCategories.length

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
      '@media(max-width: 1024px)': {
        marginBottom: '.25rem'
      },
      '&:last-of-type': {
        marginRight: 0,
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
        <li>
          <CountUp
            start={0}
            end={postsNumber}
            delay={0}
            duration={1}
            decimals={0}
          >
            {({ countUpRef }) => (
              <span className="number" ref={countUpRef} />
            )}
          </CountUp>
          <span className="text">articles</span>
        </li>
        <li>
          <CountUp
            start={0}
            end={categoriesNumber}
            delay={0}
            duration={1}
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