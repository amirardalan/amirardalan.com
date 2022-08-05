import React, { useState, useEffect } from 'react'
import { useTheme, css } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasTerrain from '@/components/CanvasTerrain'

// Console Tag
console.log(`
 █████  ███    ███ ██ ██████  
██   ██ ████  ████ ██ ██   ██ 
███████ ██ ████ ██ ██ ██████  
██   ██ ██  ██  ██ ██ ██   ██ 
██   ██ ██      ██ ██ ██   ██ 
-----------------------------
Design & Code by Amir Ardalan
`)

const styleRandomizeButton = css({
  zIndex: 4,
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
})

const CanvasLoader = () => {

  const theme: any = useTheme()

  const [pixelRatio, setPixelRatio] = useState(null)

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio)
  }, [pixelRatio])

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const [seed, setSeed] = useState(Date.now())
  const [detail, setDetail] = useState(getRandomInt(50, 100))
  const [height, setHeight] = useState(getRandomArbitrary(.15, .3))
  const [texture, setTexture] = useState(getRandomInt(1, 4))
  const [scale, setScale] = useState(getRandomInt(2, 5))
  const rotation = 1

  function randomizeTerrain() {
    setSeed(Date.now())
    setDetail(getRandomInt(10, 500))
    setHeight(getRandomArbitrary(.05, .3))
    setTexture(getRandomInt(1, 5))
    setScale(getRandomInt(1, 5))
  }

  return (
    <>
      <span
        css={styleRandomizeButton}
        onClick={randomizeTerrain}>
      </span>

      <Canvas
        css={{animation: 'slideUpSection 1s forwards'}}
        gl={{antialias: true}}
        dpr={pixelRatio}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.35, 0.35, 0.35] }}
      >
        <CanvasTerrain
          theme={theme}
          seed={seed}
          detail={detail}
          height={height}
          texture={texture}
          scale={scale}
          rotation={rotation}
        />
        <ambientLight />
      </Canvas>
    </>
  )
}

export default CanvasLoader

