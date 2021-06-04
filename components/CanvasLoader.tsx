import React from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasScene from './CanvasScene'

const CanvasLoader =  React.memo(() => {
  
  const theme: any = useTheme()

  return (
    <>
      <small className="canvasControls">
        {theme.canvas.textSmall}
      </small>
      <Canvas
        css={{ animation: 'slideUp 1s forwards' }}
        gl={{ antialias: true }}
      >
        <CanvasScene theme={theme} />
      </Canvas>
    </>
  )
})

export default CanvasLoader

