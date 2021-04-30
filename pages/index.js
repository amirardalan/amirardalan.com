import React, { useRef, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { container, main, mainLeft, mainRight, title, icon, footer } from './Home/styles'
import { Canvas, useFrame } from '@react-three/fiber'

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
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={hovered ? 'darksalmon' : 'orange'} />
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
      ref={mesh}>
      <torusGeometry args={[8, 4, 20, 100]} />
      <meshStandardMaterial color='cyan' />
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
          <Canvas>
            <ambientLight />
            <pointLight position={[-10, 3, 5]} />
            {/* <Box position={[2, 2, -1]} /> */}
            <Torus position={[1, 1, 1]} />
            <Torus position={[3, 2, 4]} />
            <Torus position={[1, 1.5, 3]} />
            <mesh visible position={[2, -4, -3]} rotation={[Math.PI / 2, 0, 0]}>
              <sphereGeometry args={[3, 100, 1, 100]} />
              <meshStandardMaterial color="hotpink" transparent />
            </mesh>
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
