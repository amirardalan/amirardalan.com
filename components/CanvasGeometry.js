import React, { Suspense } from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import { Loader,  OrbitControls } from '@react-three/drei'
import { useMediaQuery } from '../utils/useMediaQuery'
import CanvasText from '../components/CanvasText'
import CanvasIcosahedron from '../components/CanvasIcosahedron'

// Three.js Canvas Component
export default function CanvasGeometry() {

  const theme = useTheme()
  const isBreakpoint = useMediaQuery(1024)

  return (
    <>
      <CanvasText />
      <Canvas colorManagement={false}>
        <Suspense fallback={<Loader />}>
          <CanvasIcosahedron theme={theme} />
        </Suspense>
      { ( isBreakpoint ) ? null : <OrbitControls enablePan={false} enableRotate={true} zoomSpeed={0.5} /> }
      </Canvas>
      <Loader />
    </>
  )
}