import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars, Cloud, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useMediaQuery } from '../utils/mediaQuery'

// Three.js Canvas Component
export default function ThreeCanvas() {

   // Set the breakpoint for Orbital Controls rendering (disable on mobile)
   const isBreakpoint = useMediaQuery(1024)

  return (
    <>
      <h4 className="canvasTitle">Click + Drag / Zoom</h4>

      <Canvas cameraPosition={new Vector3(0, 0, 10)}>

        <Suspense fallback={null}>

          <Cloud position={[-4, -2, 0]} args={[3, 2,]} />
          <Cloud position={[-4, 2, 0]} args={[3, 2]} />
          <Cloud args={[3, 2]} />
          <Cloud position={[4, -2, 0]} args={[3, 2]} />
          <Cloud position={[4, 2, 0]} args={[3, 2]} />

          <Stars />

        </Suspense>

        {( isBreakpoint ) ? null : <OrbitControls enablePan={false} zoomSpeed={0.5} />}

      </Canvas>
    </>
  )}