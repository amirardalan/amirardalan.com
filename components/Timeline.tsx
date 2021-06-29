import { css } from '@emotion/react'
import { timeline } from '@/data/content'


export default function Timeline() {

  const styleTimeline = css({
    marginTop: '3rem',
    textAlign: 'center'
  })

  return (
    <div css={styleTimeline}>
      <h3 className="pageHeading">
        {timeline.title}
      </h3>
      <div>Timeline Goes Here</div>
    </div>
  )
}