import * as THREE from 'three'
import { useMemo, useEffect, useRef } from 'react'
import { useThree, useFrame, extend } from '@react-three/fiber'
import { EffectComposer, ShaderPass, SavePass, RenderPass, CopyShader, GlitchPass } from 'three-stdlib'
extend({ EffectComposer, ShaderPass, SavePass, RenderPass, CopyShader, GlitchPass })

export function CanvasEffects() {
  const composer = useRef()
  const savePass = useRef()
  const swap = useRef(false) // Whether to swap the delay buffers
  const { scene, gl, size, camera } = useThree()
  const { rtA, rtB } = useMemo(() => {
    const rtA = new THREE.WebGLRenderTarget(size.width, size.height)
    const rtB = new THREE.WebGLRenderTarget(size.width, size.height)
    return { rtA, rtB }
  }, [size])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => {
    // Swap render targets and update dependencies
    let delay1 = swap.current ? rtB : rtA
    let delay2 = swap.current ? rtA : rtB
    savePass.current.renderTarget = delay2
    swap.current = !swap.current
    composer.current.render()
  }, 1)
  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <savePass attachArray="passes" ref={savePass} needsSwap={true} />
      <shaderPass attachArray="passes" args={[CopyShader]} />
      <glitchPass attachArray="passes" curF={0} randX={0} renderToScreen />
    </effectComposer>
  )
}