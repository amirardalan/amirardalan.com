import { FC, RefObject, useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { createNoise2D } from 'simplex-noise';
import { BufferAttribute, PlaneGeometry, Mesh } from 'three';

type CanvasTerrainProps = {
  theme: string;
  detail: number;
  height: number;
  texture: number;
  scale: number;
  rotation: number;
  offset: {
    x: number;
    z: number;
  };
};

interface Node {
  node: string;
  elementsNeedUpdate: boolean;
  setAttribute: Function;
  computeVertexNormals: Function;
}

const generateTerrain = (
  detail: number,
  height: number,
  texture: number,
  scale: number,
  offset: { x: number; z: number }
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
  detail,
  height,
  texture = 2,
  scale = 2,
  offset = { x: 0, z: 0 },
  rotation = 1,
}) => {
  const ref = useRef(null);
  const mesh: RefObject<Mesh<PlaneGeometry>> = useRef();
  useFrame(() => (mesh.current.rotation.y += rotation / 10000));

  useLayoutEffect(() => {
    const node: Node = ref.current;
    node?.setAttribute(
      'position',
      new BufferAttribute(
        generateTerrain(detail, height, texture, scale, offset),
        3
      )
    );
    node.elementsNeedUpdate = true;
    node?.computeVertexNormals();
  }, [detail, height, texture, scale, offset]);

  return (
    <mesh ref={mesh}>
      <planeGeometry
        args={[undefined, undefined, detail - 1, detail - 1]}
        ref={ref}
      />
      <MeshDistortMaterial distort={1} speed={0.1} wireframe color={theme} />
    </mesh>
  );
};

export default CanvasTerrain;
