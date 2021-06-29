import { css } from '@emotion/react'
import { timeline } from '@/data/content'


export default function Timeline() {

  const styleTimelineWrapper = css({
    marginTop: '3rem',
    textAlign: 'center'
  })
  const styleTimeline = css({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    '.timeline': {
      padding: '0 2rem',
      '&:first-of-type': {
        borderRight: '3px solid var(--color-accent-gray)',
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
          Timeline Left
        </div>
        <div className="timeline">
          Timeline Right
        </div>
      </div>
    </div>
  )
}