import React from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasScene from './CanvasScene'

const CanvasLoader =  React.memo(() => {

  const theme : any = useTheme()

  return (
    <>
      <small
        className="canvasControls"
        css={{
          zIndex: 3,
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
          '@media(max-width: 890px)': {
            display: 'none',
          }
        }}
      >
        {theme.canvas.textSmall}
      </small>
      <Canvas>
        <CanvasScene theme={theme} />
      </Canvas>
    </>
  )
})

export default CanvasLoader

