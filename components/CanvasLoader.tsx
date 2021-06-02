import React from 'react'
import { useTheme } from '@emotion/react'
import { Canvas } from '@react-three/fiber'
import CanvasText from './CanvasText'
import LoadingTriangle from '../components/LoadingTriangle'
import dynamic from 'next/dynamic'

const CanvasScene = dynamic(() => import('../components/CanvasScene'), {
  loading: () => <LoadingTriangle />,
  ssr: false
})

const CanvasLoader =  React.memo(() => {

  const theme : any = useTheme()

  return (
    <>
      <CanvasText />
      <Canvas>
        <CanvasScene theme={theme} />
      </Canvas>
    </>
  )
})

export default CanvasLoader