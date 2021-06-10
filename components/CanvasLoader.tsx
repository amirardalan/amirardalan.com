import React from 'react'
import { css, useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasTerrainControls from '@/components/CanvasTerrainControls'

const CanvasLoader =  React.memo((props: any) => {
  const theme: any = useTheme()

  const styleCanvasInfo = css({
    zIndex: 3,
    margin: '0 0 1rem 0',
    padding: '0',
    position: 'absolute',
    bottom: 0,
    left: 20,
    color: 'var(--color-bg)',
    fontSize: 10,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    animation: 'fadeOut .2s forwards',
    a: {
      color: 'var(--color-bg)',
    },
    '@media(max-width: 890px)': {
      display: 'none',
    }
  })

  return (
    <>
      <small
        css={styleCanvasInfo}
        className="canvasInfo"
      >
        <a
          href="https://github.com/Mozzius/terrain-fiber"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Credit: @Mozzius https://github.com/Mozzius/terrain-fiber">
          @Mozzius
        </a>
      </small>
      <Canvas
        css={{ animation: 'slideUp 1s forwards' }}
        gl={{ antialias: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.35, 0.35, 0.35] }}
      >

        <CanvasTerrainControls theme={theme} />
        <ambientLight />
      </Canvas>
    </>
  )
})

export default CanvasLoader

