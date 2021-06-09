import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import SimplexNoise from 'simplex-noise'
import { BufferAttribute } from 'three'
import theme from '@/styles/theme'


const generateTerrain = (simplex, size, height, levels, scale, offset) => {
  const noise = (level, x, z) =>
    simplex.noise2D(
      offset.x * scale + scale * level * x,
      offset.z * scale + scale * level * z
    ) /
      level +
    (level > 1 ? noise(level / 2, x, z) : 0)
  return Float32Array.from({ length: size ** 2 * 3 }, (_, i) => {
    let v: number
    switch (i % 3) {
      case 0:
        v = i / 3
        return (offset.x + ((v % size) / size - 0.5)) * scale
      case 1:
        v = (i - 1) / 3
        return (
          noise(
            2 ** levels,
            (v % size) / size - 0.5,
            Math.floor(v / size) / size - 0.5
          ) * height
        )
      case 2:
        v = (i - 2) / 3;
        return (offset.z + Math.floor(v / size) / size - 0.5) * scale
    }
  })
}

const Terrain = ({
  seed,
  size,
  height,
  levels = 5,
  scale = 1,
  offset = { x: 0, z: 0 },
  rotate = true
}) => {
  const simplex = useMemo(() => new SimplexNoise(seed), [seed])
  const ref = useRef()

  const mesh : any = useRef()
  
  useFrame(() => (
    rotate?
    mesh.current.rotation.y += 0.002
    : null
  ))

  useLayoutEffect(() => {
    const node = ref.current as any
    node?.setAttribute(
      'position',
      new BufferAttribute(
        generateTerrain(simplex, size, height, levels, scale, offset),
        3
      )
    )
    node.elementsNeedUpdate = true
    node?.computeVertexNormals()
  }, [size, height, levels, scale, offset, simplex])

  return (
    <mesh ref={mesh}>
      <planeBufferGeometry
        args={[undefined, undefined, size - 1, size - 1]}
        ref={ref}
      />
      <meshBasicMaterial
        color={theme.canvas.mesh}
        wireframe
      />
    </mesh>
  )
}

export default Terrain