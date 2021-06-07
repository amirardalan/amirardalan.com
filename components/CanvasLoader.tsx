import React from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasTerrainManager from '@/components/CanvasTerrainManager'
import CanvasIcosohedron from '@/components/CanvasIcosahedron'
import { OrbitControls} from '@react-three/drei'
import { useMediaQuery } from '../utils/useMediaQuery'

const CanvasLoader =  React.memo(() => {
  
  const theme: any = useTheme()
  const isBreakpoint = useMediaQuery(890)

  return (
    <>
      <Canvas
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.75, 0.75, 0.75] }}
      >
        { ( isBreakpoint ) ? null : <OrbitControls enablePan={false} maxDistance={15} /> }
        <CanvasTerrainManager theme={theme} />
        <ambientLight />
      </Canvas>
    </>
  )
})

export default CanvasLoader

