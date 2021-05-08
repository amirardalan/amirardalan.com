import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader,  OrbitControls, Cloud, Stars, Sky } from '@react-three/drei'
import { a, useSpring } from '@react-spring/three'
import BezierEasing from 'bezier-easing'
import { css, useTheme } from '@emotion/react'
import { useMediaQuery } from '../utils/mediaQuery'
import { Effects } from '../components/Effects'

// Three.js Canvas Component
export default function ThreeCanvas() {

  // Set the breakpoint for Orbital Controls rendering (disable on mobile)
  // const isBreakpoint = useMediaQuery(1024)

  const theme = useTheme()

  // Canvas Text Overlay
  const CanvasText = function() {
    const [display, setDisplay] = useState('none');

    useEffect(() => {
      setTimeout(() => {
        setDisplay('block');
      }, 500);
    }, [])

    return (
      <>
        <h3 className="canvasTitle" css={css`
          display: ${display};
        `}>
          {theme.canvas.text}
        </h3>
        <h4 className="canvasControls">
        {theme.canvas.textSmall}
        </h4>
      </>
    )
  }

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
      <a.mesh {...props}>

        {/* <sphereBufferGeometry args={[1, 100, 100]} /> */}
        <meshBasicMaterial color={theme.canvas.sphere} opacity={99} />

        <Cloud position={[-4, -2, 0]} args={[3, 2,]} />
        <Cloud position={[-4, 2, 0]} args={[3, 2]} />
        <Cloud args={[3, 2]} />
        <Cloud position={[4, -2, 0]} args={[3, 2]} />
        <Cloud position={[4, 2, 0]} args={[3, 2]} />
        
        <Stars
          radius={.5} // Radius of the inner sphere (default=100)
          depth={100} // Depth of area where stars should fit (default=50)
          count={theme.canvas.stars} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />

        <Sky
          distance={500} // Camera distance (default=450000)
          sunPosition={[0, 1, 0]} // Sun position normal (defaults to inclination and azimuth if not set)
          inclination={0} // Sun elevation angle from 0 to 1 (default=0)
          azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
          {...props} // All three-stdlib/objects/Sky props are valid
        />
      </a.mesh>
    )
  }

  return (
    <>
      <CanvasText />
      <Canvas colorManagement={false}>
      <ambientLight intensity={.5} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 0, 5]} intensity={.5} />
        <Suspense fallback={null}>
          <Scene />
          <Effects />
        </Suspense>
        {/* {( isBreakpoint ) ? null : <OrbitControls enablePan={false} zoomSpeed={0.5} autoRotate={true} autoRotateSpeed={0.3} />} */}
      </Canvas>
      <Loader />
    </>
  )
}