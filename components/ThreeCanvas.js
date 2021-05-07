import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader,  OrbitControls, Cloud } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { css } from '@emotion/react'
import { useMediaQuery } from '../utils/mediaQuery'
import { Effects } from '../components/Effects'

// Three.js Canvas Component
export default function ThreeCanvas() {

  // Set the breakpoint for Orbital Controls rendering (disable on mobile)
  const isBreakpoint = useMediaQuery(1024)

  // Canvas Text Overlay
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

  function Dot() {
    const props = useSpring({
      loop: { reverse: true },
      from: { position: [-1, 0, 0] },
      to: { position: [1, 0, 0] }
    })
    return (
      <a.mesh {...props}>
        <sphereBufferGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={'white'} />
      </a.mesh>
    )
  }

  return (
    <>
      <CanvasText />
      <Canvas colorManagement={false}>
        <Suspense fallback={null}>
          <Dot />
          <Cloud position={[-4, -2, 0]} args={[3, 2,]} />
          <Cloud position={[-4, 2, 0]} args={[3, 2]} />
          <Cloud args={[3, 2]} />
          <Cloud position={[4, -2, 0]} args={[3, 2]} />
          <Cloud position={[4, 2, 0]} args={[3, 2]} />
          <Effects />
        </Suspense>
        {( isBreakpoint ) ? null : <OrbitControls enablePan={false} zoomSpeed={0.5} autoRotate={false} autoRotateSpeed={0.9} />}
      </Canvas>
      <Loader />
    </>
  )}