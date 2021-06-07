import React from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasTerrainManager from '@/components/CanvasTerrainManager'

const CanvasLoader =  React.memo(() => {
  
  const theme: any = useTheme()

  return (
    <>
      <small className="canvasInfo">
        Credit: <a
          href="https://github.com/Mozzius/terrain-fiber"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Credit: https://github.com/Mozzius/terrain-fiber">
          @Mozzius
        </a>
      </small>
      <Canvas
        css={{ animation: 'slideUp 1s forwards' }}
        gl={{ antialias: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.35, 0.35, 0.35] }}
      >

        <CanvasTerrainManager theme={theme} />
        <ambientLight />
      </Canvas>
    </>
  )
})

export default CanvasLoader

