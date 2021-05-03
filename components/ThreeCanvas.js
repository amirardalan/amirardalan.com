import React, { useState, useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei'
import { useMediaQuery } from '../utils/mediaQuery'

// Three.js Canvas
export default function ThreeCanvas() {

  // Set the breakpoint for Orbital Controls rendering (disable on mobile)
  const isBreakpoint = useMediaQuery(1024)

  // Soft Shadows
  softShadows();

  // Torus Mesh
  function Torus(props) {

    const mesh = useRef()
    if(mesh.current) useFrame((state, delta) => (
      mesh.current.rotation.x += 0.002,
      mesh.current.rotation.y += 0.002
    ))

    return (
      <mesh
        {...props}
        ref={mesh}
        castShadow>
        <torusGeometry args={[3, 1, 20, 100]} />
        <meshStandardMaterial color='cyan' />
        <MeshWobbleMaterial
          color={'cyan'}
          speed='1'
          attach='material'
          factor={0.6}
        />
      </mesh>
    )
  }

  // Sphere Mesh
  function Sphere(props) {

    const mesh = useRef()

    return (
      <mesh
        {...props}
        ref={mesh}
        castShadow>
        <sphereGeometry args={[1, 100, 20, 100]} />
        <meshStandardMaterial color='hotpink' wireframe="true"/>
      </mesh>
    )
  }

  return (
    <Canvas
      shadowMap
      shadows
      colorManagement
      // Camera Config
      camera={{
        position: [-4, 2, 5],
        fov: 60
      }}>
      <Suspense fallback={null}>
        // Lighting
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} />
        <pointLight castShadow position={[0, -10, 0]} />
        <group>
          // Floor mesh
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach='material' opacity={0.3} />
          </mesh>
          // Models
          <Torus position={[2, 1, 1]} />
          <Sphere position={[1, 1, 1]} />
        </group>
        // If viewport is tablet or smaller, hide the Orbit Controls
        {( isBreakpoint ) ? null : <OrbitControls />}
      </Suspense>
    </Canvas>
  )}