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
    '.timeline': {
      '&:nth-of-type(even), &:nth-of-type(odd)': {
        '.event': {
          maxWidth: 400,
          h4: {
            marginBottom: '.5rem',
            fontFamily: 'var(--font-secondary)',
            fontSize: 14,
            lineHeight: '1rem',
          },
        },
        '.date': {
          lineHeight: '1rem',
        }
      },
      '&:nth-of-type(odd)': {
        padding: '0 2rem 0 0',
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
          marginRight: '1rem',
        },
        '.event': {
          '&:before': {
            right: -22,
            borderLeft: '12px solid transparent',
            borderRight: '20px solid var(--color-accent)',
            transform: 'rotateY(0deg) rotate(270deg)',
            '@media(max-width: 480px)': {
              border: 'none'
            }
          }
        },
        '@media(max-width: 480px)': {
          padding: 0,
        }
      },
      '&:nth-of-type(even)': {
        padding: '0 0 0 2rem',
        zIndex: 1,
        justifySelf: 'flex-start',
        '.date': {
          marginLeft: '1rem',
        },
        '.event': {
          '&:before': {
            left: -22,
            borderLeft: '20px solid var(--color-accent)',
            borderRight: '12px solid transparent',
            transform: 'rotateY(0deg) rotate(90deg)',
            '@media(max-width: 480px)': {
              border: 'none'
            }
          },
        },
        '@media(max-width: 480px)': {
          padding: 0,
        }
      },
      '.date': {
        fontFamily: 'var(--font-secondary)',
        fontSize: 20,
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
          padding: '1.5rem 1rem',
        }
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
            <h4>{items.title}</h4>
            <span>{items.content}</span>
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