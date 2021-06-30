import { css } from '@emotion/react'
import { timeline } from '@/data/content'
import Link from 'next/link'


export default function Timeline() {

  const styleTimelineWrapper = css({
    paddingTop: '4rem',
  })
  const styleTimeline = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridAutoRows: 'minmax(100px, auto)',
    '.timeline': {
      padding: '0 2rem',
      '&:nth-of-type(odd)': {
        zIndex: 2,
        position: 'relative',
        justifySelf: 'flex-end',
        borderRight: '2px solid var(--color-accent-gray)',
        '&:after': {
          position: 'absolute',
          top: -32,
          right: -19,
          content: '"•"',
          fontSize: 60,
          color: 'var(--color-accent-gray)',
        },
        '.date': {
          marginRight: '1rem'
        },
        '.event': {
          maxWidth: 400,
          '&:before': {
            right: -22,
            borderLeft: '12px solid transparent',
            borderRight: '20px solid var(--color-accent)',
            transform: 'rotateY(0deg) rotate(270deg)',
            '@media(max-width: 480px)': {
              border: 'none'
            }
          }
        }
      },
      '&:nth-of-type(even)': {
        zIndex: 1,
        justifySelf: 'flex-start',
        '.date': {
          marginLeft: '1rem'
        },
        '.event': {
          maxWidth: 400,
          '&:before': {
            left: -22,
            borderLeft: '20px solid var(--color-accent)',
            borderRight: '12px solid transparent',
            transform: 'rotateY(0deg) rotate(90deg)',
            '@media(max-width: 480px)': {
              border: 'none'
            }
          },
        }
      },
      '.date': {
        fontFamily: 'var(--font-secondary)',
        fontSize: 20,
        lineHeight: '1rem',
      },
      '.event': {
        position: 'relative',
        marginBottom: '3rem',
        padding: '2rem',
        background: 'var(--color-accent)',
        fontSize: 13,
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 10,
          width: 0,
          height: 0,
          borderBottom: '12px solid transparent',
        },
        '@media(max-width: 480px)': {
          fontSize: 12,
          padding: '1rem',
        }
      },
      '@media(max-width: 480px)': {
        padding: 0,
      }
    }
  })
  const styleReadMoreLink = ({
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'var(--font-secondary)',
  })

  const generateTimeline = (items: Array<any>) => {
    return items.map((items, i) => {
      return (
        <div className="timeline" key={i}>
          <div className={items.cName}>
            {items.content}
          </div>
        </div>
      )
    })
  }


  return (
    <div css={styleTimelineWrapper} id="timeline">
      <h3 className="pageHeading">
        {timeline.title}
      </h3>
      <div css={styleTimeline}>
        {generateTimeline(timeline.items)}
      </div>
      <div css={styleReadMoreLink}>
        <Link href="/blog/2021-a-dev-odyssey">
          Read the Full Story
        </Link>
      </div>
    </div>
  )
}