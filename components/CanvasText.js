import { css, useTheme } from '@emotion/react'
import React, { useState, useEffect } from 'react'

export default function CanvasText() {

  const theme = useTheme()
  const [display, setDisplay] = useState('none');

  useEffect(() => {
    setTimeout(() => {
      setDisplay('block');
    }, 500);
  }, [])

  return (
    <>
      <h3
        className="canvasTitle"
        aria-label="${theme.canvas.text}"
        css={css`
          display: ${display}; `}>
        {theme.canvas.text}
      </h3>
      <h4
        className="canvasControls"
        aria-label="${theme.canvas.textSmall}">
        {theme.canvas.textSmall}
      </h4>
    </>
  )
}