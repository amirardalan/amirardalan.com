import React from 'react'
import { Canvas } from '@react-three/fiber'
import CanvasTerrainManager from '@/components/CanvasTerrainManager'

const CanvasLoader =  React.memo(() => {

  return (
    <>
      <small className="canvasInfo">
        <a
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

        <CanvasTerrainManager />
        <ambientLight />
      </Canvas>
    </>
  )
})

export default CanvasLoader

