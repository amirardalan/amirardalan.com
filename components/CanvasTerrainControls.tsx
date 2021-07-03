import { useState } from 'react'
import { button, useControls } from 'leva'
import CanvasTerrain from '@/components/CanvasTerrain'


const CanvasTerrainControls = ({ theme }) => {
  const [seed, setSeed] = useState(Date.now())

  const { detail, height, texture, scale, rotation } = useControls({
    'Generate Terrain': button(() => setSeed(Date.now())),
    detail: { value: 256, min: 10, max: 500, step: 1 },
    height: { value: .15, min: 0, max: .3 },
    texture: { value: 3, min: 1, max: 5, step: 1 },
    scale: { value: 3, min: 1, max: 5, step: 1 },
    rotation: { value: 1, min: 0, max: 2 },
  })

  return (
    <CanvasTerrain
      theme={theme}
      seed={seed}
      size={detail}
      height={height}
      texture={texture}
      scale={scale}
      rotation={rotation}
    />
  )
}

export default CanvasTerrainControls