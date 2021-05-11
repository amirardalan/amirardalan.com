import React, { Suspense } from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import CanvasText from '../components/CanvasText'
import CanvasScene from '../components/CanvasScene'
import { CanvasEffects } from '../components/CanvasEffects'

// Three.js Canvas Component
export default function CanvasGeometry() {

  const theme = useTheme()

  return (
    <>
      <CanvasText />
      <Canvas colorManagement={false}>
        <Suspense fallback={null}>
          <CanvasScene theme={theme} />

        </Suspense>
      <CanvasEffects />
      </Canvas>
      <Loader />
    </>
  )
}