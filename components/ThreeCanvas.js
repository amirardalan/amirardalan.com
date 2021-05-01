import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei'

// Three.js Canvas
export default function ThreeCanvas() {

  // Soft Shadows
  softShadows();

  // Box Mesh
  function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (
      mesh.current.rotation.x += 0.01,
      mesh.current.rotation.y += 0.01
    ))

    return (
      <mesh
        {...props}
        ref={mesh}
        castShadow
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxBufferGeometry attach='geometry' />
        <meshStandardMaterial color={hovered ? 'darksalmon' : 'orange'} />
        <MeshWobbleMaterial
          color={hovered ? 'darksalmon' : 'orange'}
          speed='1'
          attach='material'
          factor={0.6}
        />
      </mesh>
    )
  }

  // Torus Mesh
  function Torus(props) {

    const mesh = useRef()

    useFrame(() => (
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

  return (
    <Canvas shadowMap shadows colorManagement camera={{ position: [-5, 2, 10], fov: 60 }}>
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
        {/* <meshStandardMaterial attach='material' color={'yellow'} /> */}
        <shadowMaterial attach='material' opacity={0.3} />
      </mesh>
      // Box Mesh
      <Box position={[2, 2, -1]} />
      <Box position={[1, 2, 3]} />
      <Torus position={[4, 1, 1]} />
    </group>
    <OrbitControls />
    </Canvas>
  )}