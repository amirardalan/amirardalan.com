import { type FC, useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { createNoise2D } from 'simplex-noise';
import alea from 'alea';
import { BufferAttribute } from 'three';

type CanvasTerrainProps = {
  theme: {
    canvas: string;
  };
  seed: Date;
  detail: number;
  height: number;
  texture: number;
  scale: number;
  offset: { x: number; z: number };
  rotation: number;
};

const generateTerrain = (
  detail: number,
  height: number,
  texture: number,
  scale: number,
  offset: { x: any; z: any }
) => {
  const noise2D = createNoise2D();
  const noise = (level: number, x: number, z: number) =>
    noise2D(
      offset.x * scale + scale * level * x,
      offset.z * scale + scale * level * z
    ) /
      level +
    (level > 1 ? noise(level / 2, x, z) : 0);
  return Float32Array.from({ length: detail ** 2 * 3 }, (_, i) => {
    let v: number;
    switch (i % 3) {
      case 0:
        v = i / 3;
        return (offset.x + ((v % detail) / detail - 0.5)) * scale;
      case 1:
        v = (i - 1) / 3;
        return (
          noise(
            2 ** texture,
            (v % detail) / detail - 0.5,
            Math.floor(v / detail) / detail - 0.5
          ) * height
        );
      case 2:
        v = (i - 2) / 3;
        return (offset.z + Math.floor(v / detail) / detail - 0.5) * scale;
    }
  });
};

const CanvasTerrain: FC<CanvasTerrainProps> = ({
  theme,
  seed,
  detail,
  height,
  texture = 5,
  scale = 1,
  offset = { x: 0, z: 0 },
  rotation = 1,
}) => {
  const simplex = createNoise2D(alea(seed));
  const ref = useRef();
  const mesh: any = useRef();

  useFrame(() => (mesh.current.rotation.y += rotation / 2000));

  useLayoutEffect(() => {
    const node = ref.current as any;
    node?.setAttribute(
      'position',
      new BufferAttribute(
        generateTerrain(detail, height, texture, scale, offset),
        3
      )
    );
    node.elementsNeedUpdate = true;
    node?.computeVertexNormals();
  }, [detail, height, texture, scale, offset, simplex]);

  return (
    <mesh ref={mesh}>
      <planeBufferGeometry
        args={[undefined, undefined, detail - 1, detail - 1]}
        ref={ref}
      />
      <meshBasicMaterial color={theme.canvas} wireframe />
    </mesh>
  );
};

export default CanvasTerrain;
