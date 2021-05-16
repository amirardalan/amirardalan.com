import { css, useTheme } from '@emotion/react'

export default function CanvasText() {

  const theme : any = useTheme()

  return (
    <>
      <h5
        className="canvasTitle"
        aria-label="${theme.canvas.text}"
        css={{
          fontSize: '40px'
        }}>
        {theme.canvas.text}
      </h5>
      <h6
        className="canvasControls"
        aria-label="${theme.canvas.textSmall}"
        css={css`
          margin: 0 0 1rem 0;
          padding: 0;
          @media (max-width: 890px) {
            display: none;
          }
        `}>
        {theme.canvas.textSmall}
      </h6>
    </>
  )
}