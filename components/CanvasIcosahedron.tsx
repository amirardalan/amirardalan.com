import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, MeshWobbleMaterial } from '@react-three/drei'

export default function CanvasScene(props: any) {

  const mesh : any = useRef()
  
  useFrame(() => (
    mesh.current.rotation.x += 0.002,
    mesh.current.rotation.y += 0.002
  ))

  return (
    <>
      <ambientLight intensity={.2} />
      <pointLight position={[0, 0, 30]} />
      <directionalLight position={[0, 2, 0]} intensity={.1} />
      <mesh
        ref={mesh}
        scale={.2}>
        <Icosahedron args={[30, 6]}>
          <MeshWobbleMaterial
            color={props.theme.canvas.mesh}
            attach="material"
            factor={.8} // Strength, 0 disables the effect (default=1)
            speed={.5} // Speed (default=1)
            wireframe
          />
        </Icosahedron>
      </mesh>
    </>
  )
}