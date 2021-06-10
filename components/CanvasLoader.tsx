import React, { Suspense } from 'react'
import LoadingTriangle from '@/components/LoadingTriangle'
import { Canvas } from '@react-three/fiber'
import CanvasTerrainControls from '@/components/CanvasTerrainControls'

const CanvasLoader =  React.memo(() => {

  return (
    <>
      <small className="canvasInfo">
        <a
          href="https://github.com/Mozzius/terrain-fiber"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Credit: @Mozzius https://github.com/Mozzius/terrain-fiber">
          @Mozzius
        </a>
      </small>
      <Suspense fallback={<LoadingTriangle />}>
        <Canvas
          css={{ animation: 'slideUp 1s forwards' }}
          gl={{ antialias: true }}
          onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
          camera={{ position: [0.35, 0.35, 0.35] }}
        >

          <CanvasTerrainControls />
          <ambientLight />
        </Canvas>
      </Suspense>
    </>
  )
})

export default CanvasLoader

