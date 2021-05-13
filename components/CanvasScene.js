import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, Stars, Cloud, MeshWobbleMaterial } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import BezierEasing from 'bezier-easing'

export default function CanvasScene(props) {

  const mesh = useRef()
  
  useFrame(() => (
    mesh.current.rotation.x += 0.002,
    mesh.current.rotation.y += 0.002
  ))

  function SpaceZoom() {

    let easing = BezierEasing(0.8, 0.1, 0.0, 1.0)

    const spring = useSpring({
      loop: { reverse: false },
      from: { position: [0, 0, props.theme.canvas.zoomFrom] },
      to: { position: [0, 0, props.theme.canvas.zoomTo] },
      config: {
        duration: props.theme.canvas.duration,
        tension: 150,
        mass: 3,
        friction: 5,
        velocity: 1,
        precision: 0.001,
        easing: easing
      }
    })
    return (
      <a.mesh {...spring}>
        <Cloud position={[-4, -2, 0]} args={[3, 2]} />
        <Cloud position={[-4, 2, 0]} args={[3, 2]} />
        <Cloud args={[3, 2]} />
        <Cloud position={[4, -2, 0]} args={[3, 2]} />
        <Cloud position={[4, 2, 0]} args={[3, 2]} />
        
        <Stars
          radius={5} // Radius of the inner sphere (default=100)
          depth={150} // Depth of area where stars should fit (default=50)
          count={props.theme.canvas.stars} // Amount of stars (default=5000)
          factor={2} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
      </a.mesh>
    )
  }

  return (
    <>
      <ambientLight intensity={.2} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 0, 5]} intensity={.1} />
      <mesh
        ref={mesh}
        scale={.2}
        {...props}>
        <Icosahedron args={[10, 3]}>
          <MeshWobbleMaterial
            color={props.theme.canvas.meshA}
            attach="material"
            factor={.2} // Strength, 0 disables the effect (default=1)
            speed={1} // Speed (default=1)
            wireframe
          />
        </Icosahedron>
      </mesh>
      <SpaceZoom />
    </>
  )
}