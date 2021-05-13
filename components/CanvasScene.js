import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, MeshWobbleMaterial, TrackballControls } from '@react-three/drei'

export default function CanvasScene(props) {

  const mesh = useRef()
  
  useFrame(() => (
    mesh.current.rotation.x += 0.002,
    mesh.current.rotation.y += 0.002
  ))

  return (
    <>
      <ambientLight intensity={.2} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 0, 5]} intensity={.1} />
      <mesh
        ref={mesh}
        scale={.2}
        {...props}>
        <Icosahedron args={[30, 3]}>
          <MeshWobbleMaterial
            color={props.theme.canvas.meshA}
            attach="material"
            factor={.8} // Strength, 0 disables the effect (default=1)
            speed={.5} // Speed (default=1)
            wireframe
          />
        </Icosahedron>
        <TrackballControls enablePan={false} maxDistance={-600} />
      </mesh>
    </>
  )
}