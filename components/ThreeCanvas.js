import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader,  OrbitControls, Cloud, Stars } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import { css, useTheme } from '@emotion/react'
import { useMediaQuery } from '../utils/mediaQuery'
import { Effects } from '../components/Effects'

// Three.js Canvas Component
export default function ThreeCanvas() {

  // Set the breakpoint for Orbital Controls rendering (disable on mobile)
  const isBreakpoint = useMediaQuery(1024)

  const theme = useTheme()

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
          {theme.canvas.text}
        </h3>
        <h4 className="canvasControls">
          Click + Drag / Zoom
        </h4>
      </>
    )
  }

  function Scene() {
    const props = useSpring({
      loop: { reverse: false },
      from: { position: [0, 0, 1] },
      to: { position: [0, 0, 3.8] },
      config: {
        duration: 10000,
        tension: 60
      }
    })
    return (
      <a.mesh {...props}>

        <sphereBufferGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={theme.canvas.sphere} opacity={50} />

        <Cloud position={[-4, -2, 0]} args={[3, 2,]} />
        <Cloud position={[-4, 2, 0]} args={[3, 2]} />
        <Cloud args={[3, 2]} />
        <Cloud position={[4, -2, 0]} args={[3, 2]} />
        <Cloud position={[4, 2, 0]} args={[3, 2]} />
        
        <Stars />
      </a.mesh>
    )
  }

  return (
    <>
      <CanvasText />
      <Canvas colorManagement={false}>
        <Suspense fallback={null}>
          <Scene />
          <Effects />
        </Suspense>
        {( isBreakpoint ) ? null : <OrbitControls enablePan={false} zoomSpeed={0.5} autoRotate={true} autoRotateSpeed={0.3} />}
      </Canvas>
      <Loader />
    </>
  )}