import React, { Suspense, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import { Loader, Cloud, OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import { useMediaQuery } from '../utils/mediaQuery'

// Three.js Canvas Component
export default function ThreeCanvas() {

  // Set the breakpoint for Orbital Controls rendering (disable on mobile)
  const isBreakpoint = useMediaQuery(1024)


  const CanvasText = function() {
    const [display, setDisplay] = useState('none');

    useEffect(() => {
      setTimeout(() => {
        setDisplay('block');
      }, 1000);
    }, [])

    return (
      <>
        <h3 className="canvasTitle" css={css`
          display: ${display};
        `}>
          Dream Big.
        </h3>
        <h4 className="canvasControls">Click + Drag / Zoom</h4>
      </>
    )
  }


  return (
    <>

      <CanvasText />

      <Canvas cameraPosition={new Vector3(0, 0, 10)}>

        <Suspense fallback={null}>


          <Cloud position={[-4, -2, 0]} args={[3, 2,]} />
          <Cloud position={[-4, 2, 0]} args={[3, 2]} />
          <Cloud args={[3, 2]} />
          <Cloud position={[4, -2, 0]} args={[3, 2]} />
          <Cloud position={[4, 2, 0]} args={[3, 2]} />

        </Suspense>

        {( isBreakpoint ) ? null : <OrbitControls enablePan={false} zoomSpeed={0.5} autoRotate={true} autoRotateSpeed={0.9} />}

      </Canvas>
      <Loader />
    </>
  )}