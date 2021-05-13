import React, { Suspense } from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasText from '../components/CanvasText'
import CanvasScene from '../components/CanvasScene'

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
      </Canvas>
    </>
  )
})

export default function CanvasLoader() {
  
  return(
    <CanvasLoaderMemoized />
  )
}