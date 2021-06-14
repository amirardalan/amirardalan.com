import React, { useState } from 'react'
import { css, useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasTerrainControls from '@/components/CanvasTerrainControls'

const CanvasLoader =  React.memo(() => {
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
  const styleCanvasControls = css({
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
    a: {
      color: 'var(--color-bg)',
    },
    '@media(max-width: 890px)': {
      display: 'none',
    }
  })

  const [terrainControls, toggleTerrainControls] = useState(true)
  const terrainControlsOnClick = () => toggleTerrainControls(!terrainControls)

  return (
    <>
      <small
        css={styleCanvasInfo}
        className="canvasInfo"
      >
                <a onClick={terrainControlsOnClick}>
          {terrainControls ? 'Hide Controls' : 'Show Controls'}
        </a>
      </small>
      <Canvas
        css={{ animation: 'slideUp 1s forwards' }}
        gl={{ antialias: true }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.35, 0.35, 0.35] }}
      >
        <CanvasTerrainControls theme={theme} terrainControls={terrainControls} />
        <ambientLight />
      </Canvas>
    </>
  )
})

export default CanvasLoader

