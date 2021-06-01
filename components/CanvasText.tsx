import { css, useTheme } from '@emotion/react'

export default function CanvasText() {

  const theme : any = useTheme()

  // Large Text Over Canvas - Currently Unused
  const canvasTitle = css({
    margin: 0,
    padding: '0 2rem',
    minHeight: '0vw',
    position: 'absolute',
    display: 'flex',
    color: theme.colors.text,
    fontSize: 'calc(2.8vw + 2.8vh)',
    lineHeight: '7rem',
    animation: theme.canvas.textAnim,
    transition: 'color 3s linear',
  })

  return (
    <small
      className="canvasControls"
      css={{
        margin: '0 0 1rem 0',
        padding: '0',
        position: 'absolute',
        bottom: 0,
        left: 20,
        color: theme.colors.grayscale,
        fontSize: 10,
        fontWeight: 'normal',
        textTransform: 'uppercase',
        animation: 'fadeOut .2s forwards',

        '.mainRight:hover &': {
          animation: 'fadeIn .2s forwards',
        },
        '@media(max-width: 890px)': {
          display: 'none',
        }
      }}
      aria-label="${theme.canvas.textSmall}"
    >
      {theme.canvas.textSmall}
  </small>
  )
}