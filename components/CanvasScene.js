import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Icosahedron, Stars, Cloud } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import BezierEasing from 'bezier-easing'

export default function CanvasScene(props) {

  const mesh = useRef()
  
  useFrame(() => (
    mesh.current.rotation.x += 0.001,
    mesh.current.rotation.y += 0.001
  ))

  function SpaceZoom() {

    let easing = BezierEasing(0.25, 0.1, 0.0, 1.0);

    const spring = useSpring({
      loop: { reverse: false },
      from: { position: [0, 0, props.theme.canvas.zoomFrom] },
      to: { position: [0, 0, props.theme.canvas.zoomTo] },
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
      <a.mesh {...spring}>

        <Cloud position={[-4, -2, 0]} args={[3, 2,]} />
        <Cloud position={[-4, 2, 0]} args={[3, 2]} />
        <Cloud args={[3, 2]} />
        <Cloud position={[4, -2, 0]} args={[3, 2]} />
        <Cloud position={[4, 2, 0]} args={[3, 2]} />
        
        <Stars
          radius={.5} // Radius of the inner sphere (default=100)
          depth={100} // Depth of area where stars should fit (default=50)
          count={props.theme.canvas.stars} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />

      </a.mesh>
    )
  }

  return (
    <>
        
      {/* Lighting */}
      <ambientLight intensity={.2} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 0, 5]} intensity={.2} />

      {/* Icosahedron Wireframe Mesh */}
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

      <SpaceZoom />

    </>
  )
}