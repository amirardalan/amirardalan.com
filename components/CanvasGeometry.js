import { css, useTheme } from '@emotion/react'
import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader,  OrbitControls, Cloud, Stars, Detailed, Icosahedron } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import BezierEasing from 'bezier-easing'
import { Effects } from './Effects'
import CanvasText from '../components/CanvasText'

// Three.js Canvas Component
export default function CanvasGeometry() {

  const theme = useTheme()

  function Scene() {
    let easing = BezierEasing(0.25, 0.1, 0.0, 1.0);

    const props = useSpring({
      loop: { reverse: false },
      from: { position: [0, 0, theme.canvas.zoomFrom] },
      to: { position: [0, 0, theme.canvas.zoomTo] },
      config: {
        duration: 5000,
        tension: 150,
        mass: 3,
        friction: 5,
        velocity: 1,
        precision: 0.001,
        easing: easing
      }
    })

    return (
      <>
       <Detailed distances={[0, 50, 150]}>
            <Icosahedron args={[10, 3]}>
              <meshBasicMaterial attach="material" color={theme.canvas.meshA} wireframe />
            </Icosahedron>
            <Icosahedron args={[10, 2]}>
              <meshBasicMaterial attach="material" color={theme.canvas.meshB} wireframe />
            </Icosahedron>
            <Icosahedron args={[10, 1]}>
              <meshBasicMaterial attach="material" color={theme.canvas.meshC} wireframe />
            </Icosahedron>
          </Detailed>
          <OrbitControls enablePan={false} enableRotate={true} zoomSpeed={0.5} />
      </>
    )
  }

  return (
    <>
      <CanvasText />
      <Canvas colorManagement={false}>

        <ambientLight intensity={.2} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 0, 5]} intensity={.2} />

        <Suspense fallback={null}>
          <Scene />
          {/* <Effects /> */}
        </Suspense>

      </Canvas>
      <Loader />
    </>
  )
}