import { css, useTheme } from '@emotion/react'

export default function CanvasText() {

  const theme : any = useTheme()

  return (
    <>
      <small
        className="canvasControls"
        aria-label="${theme.canvas.textSmall}"
        css={css`
          color: ${theme.colors.footer};
          margin: 0 0 1rem 0;
          padding: 0;
          @media (max-width: 890px) {
            display: none;
          }
        `}>
        {theme.canvas.textSmall}
      </small>
    </>
  )
}