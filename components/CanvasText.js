import { css, useTheme } from '@emotion/react'
import React, { useState, useEffect } from 'react'

export default function CanvasText() {

  const theme = useTheme()
  const [display, setDisplay] = useState('none')

  useEffect(() => {
    setTimeout(() => {
      setDisplay('block')
    }, 500)
  }, [])

  return (
    <>
      <h5
        className="canvasTitle"
        aria-label="${theme.canvas.text}"
        css={css` display: ${display}; `}>
        {theme.canvas.text}
      </h5>
      <h6
        className="canvasControls"
        aria-label="${theme.canvas.textSmall}"
        css={css` display: ${display}; `}>
        {theme.canvas.textSmall}
      </h6>
    </>
  )
}