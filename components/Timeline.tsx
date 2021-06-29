import { css } from '@emotion/react'
import { timeline } from '@/data/content'


export default function Timeline() {

  const styleTimelineWrapper = css({
    marginTop: '3rem',
    textAlign: 'center'
  })
  const styleTimeline = css({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridAutoRows: 'minmax(100px, auto)',
    '.timeline': {
      padding: '0 2rem',
      '&:nth-of-type(odd)': {
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
        '.event:before': {
          right: -20,
          borderLeft: '12px solid transparent',
          borderRight: '20px solid var(--color-accent)',
          transform: 'rotateY(0deg) rotate(270deg)',
        }
      },
      '&:nth-of-type(even)': {
        justifySelf: 'flex-start',
        '.event:before': {
          left: -20,
          borderLeft: '20px solid var(--color-accent)',
          borderRight: '12px solid transparent',
          transform: 'rotateY(0deg) rotate(90deg)',
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
        }
      }
    }
  })

  return (
    <div css={styleTimelineWrapper}>
      <h3 className="pageHeading">
        {timeline.title}
      </h3>
      <div css={styleTimeline}>
        <div className="timeline">
          <div className="date">
            2004
          </div>
        </div>
        <div className="timeline">
          <div className="event">
            Zipppity Do Da, some stuff and things.
          </div>
        </div>
        <div className="timeline">
          <div className="event">
            Zipppity Do Da, some stuff and things.
          </div>
        </div>
        <div className="timeline">
          <div className="date">
            2005
          </div>
        </div>
        <div className="timeline">
          <div className="date">
            2007
          </div>
        </div>
        <div className="timeline">
          <div className="event">
            Zipppity Do Da, some stuff and things.
          </div>
        </div>
      </div>
    </div>
  )
}