import React, { Suspense } from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import LoadingTriangle from '../components/LoadingTriangle'
import CanvasText from '../components/CanvasText'
import CanvasScene from '../components/CanvasScene'
import { CanvasEffects } from '../components/CanvasEffects'

// Three.js Canvas Component
const CanvasLoaderMemoized =  React.memo(() => {

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
    </>
  )
})

export default function CanvasLoader() {
  
  return(
    <CanvasLoaderMemoized />
  )
}