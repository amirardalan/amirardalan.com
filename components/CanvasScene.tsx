import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Icosahedron, MeshWobbleMaterial, OrbitControls } from '@react-three/drei'
import { useMediaQuery } from '../utils/useMediaQuery'
import { useTheme } from '@emotion/react'

export default function CanvasScene() {

  const isBreakpoint = useMediaQuery(890)
  const theme: any = useTheme()

  function SpinningGeometry() {

    const mesh = useRef<THREE.Mesh>(null!)
    useFrame(() => (
      mesh.current.rotation.x += 0.002,
      mesh.current.rotation.y += 0.002
    ))
  
    return (
      <mesh
        ref={mesh}
        scale={.2}
      >
      <Icosahedron args={[30, 6]}>
        <MeshWobbleMaterial
          color={theme.canvas.mesh}
          attach="material"
          factor={.8} // Strength, 0 disables the effect (default=1)
          speed={.5} // Speed (default=1)
          wireframe
        />
      </Icosahedron>
      </mesh>
    )
  }

  return (
    <>
      <small
        className="canvasControls"
        css={{
          zIndex: 3,
          margin: '0 0 1rem 0',
          padding: '0',
          position: 'absolute',
          bottom: 0,
          left: 20,
          color: theme.colors.grayscale,
          fontSize: 10,
          fontWeight: 'normal',
          textTransform: 'uppercase',
          animation: 'fadeOut .2s forwards',
          '@media(max-width: 890px)': {
            display: 'none',
          }
        }}
      >
        {theme.canvas.textSmall}
      </small>
      <Canvas css={{
        animation: 'fadeIn 2s forwards',
      }}>
        <ambientLight intensity={.2} />
        <pointLight position={[0, 0, 30]} />
        <directionalLight position={[0, 2, 0]} intensity={.1} />
        <SpinningGeometry />
        { ( isBreakpoint ) ? null : <OrbitControls enablePan={false} maxDistance={15} /> }
      </Canvas>
    </>
  )
}