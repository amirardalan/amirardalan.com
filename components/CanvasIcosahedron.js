import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron } from '@react-three/drei'

export default function CanvasIcosahedron(props) {

  const mesh = useRef()
  
  useFrame(() => (
    mesh.current.rotation.x += 0.001,
    mesh.current.rotation.y += 0.001
  ))

  return (
    <mesh
      ref={mesh}
      scale={.2}
      {...props}>
      <Icosahedron args={[10, 3]}>
        <meshBasicMaterial
          attach="material"
          color={props.theme.canvas.meshA}
          wireframe />
      </Icosahedron>
    </mesh>
  )
}