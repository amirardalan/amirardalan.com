import { useState } from 'react'
import { Leva, button, useControls } from 'leva'
import CanvasTerrain from '@/components/CanvasTerrain'
import { Global } from '@emotion/react'

const CanvasTerrainControls = ({ theme }) => {
  const [seed, setSeed] = useState(Date.now())

  const { resolution, height, levels, scale, rotate } = useControls({
    'Generate Terrain': button(() => setSeed(Date.now())),
    resolution: { value: 256, min: 10, max: 500, step: 1 },
    height: { value: .15, min: 0, max: .3 },
    levels: { value: 3, min: 1, max: 5, step: 1 },
    scale: { value: 3, min: 1, max: 5, step: 1 },
    rotate: { value: true },
  })


  return (
    <>
      <CanvasTerrain
        theme={theme}
        seed={seed}
        size={resolution}
        height={height}
        levels={levels}
        scale={scale}
        rotate={rotate}
      />
    </>
  )
}

export default CanvasTerrainControls