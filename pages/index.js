import React, { useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { container, main, mainLeft, mainRight, title, icon, footer } from './Home/styles'
import { Canvas, useFrame } from '@react-three/fiber'
import { softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei'

// Soft Shadows
softShadows();

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

export default function Home() {
  return (
    <div className={container}>

      <Head>
        <title>Amir Ardalan &mdash; Portfolio</title>
        <meta name="description"
          content="Portfolio of Amir Ardalan. Front-End Engineer and UI Designer with 6+
          years professional experience crafting online experiences for top brands." />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap" rel="stylesheet" />
      </Head>

      <main className={main}>

        <div className={mainLeft}>
          <div className={icon}>
              <Image
                src="/icon.svg"
                alt=""
                width={200}
                height={200}
              />
          </div>

          <h1 className={title}>
            Hi, 👋 I'm <a href="/">Amir Ardalan</a>,
            <br/> a designer & developer
            <br/> from Portland, OR.
            <br/>
            <br/> Check out my <a href="/">work</a>.
            <br/> Download my <a href="/">resume</a>.
          </h1>
        </div>

        <div className={mainRight}>
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
            <pointLight position={[0, -10, 0]} />
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
        </div>

      </main>

      <footer className={footer}>
        <div>
          Copyright &copy;
          {(new Date().getFullYear())}
          {' '}-{' '} Amir Ardalan
        </div>
        <div className="small">
          Made with <span>&hearts;</span> using <a href="https://nextjs.org/">Next.js</a> + <a href="https://emotion.sh/">Emotion</a> + <a href="https://threejs.org/">Three.js</a>
        </div>
      </footer>
    </div>
  )
}
