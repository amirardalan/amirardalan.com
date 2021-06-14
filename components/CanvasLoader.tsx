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
    background: 'transparent',
    border: 'none',
    color: 'var(--color-bg)',
    fontSize: 10,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    textAlign: 'left',
    cursor: 'pointer',
    animation: 'fadeOut .2s forwards',
    '@media(max-width: 890px)': {
      display: 'none',
    }
  })

  const [terrainControls, toggleTerrainControls] = useState(true)
  const terrainControlsOnClick = () => toggleTerrainControls(!terrainControls)

  return (
    <>
      <button
        onClick={terrainControlsOnClick}
        css={styleCanvasInfo}
        className="canvasInfo"
      >
        {terrainControls ? 'Hide Controls' : 'Show Controls'}
      </button>
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

