import React from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasText from './CanvasText'
import CanvasScene from './CanvasScene'

const CanvasLoader =  React.memo(() => {

  const theme : any = useTheme()

  return (
    <>
      <CanvasText />
      <Canvas>
        <CanvasScene theme={theme} />
      </Canvas>
    </>
  )
})

export default CanvasLoader