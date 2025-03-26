import { useLayoutEffect, useRef } from 'react';
import {
  BufferAttribute,
  PlaneGeometry,
  Mesh,
  Material,
  BufferGeometry,
} from 'three';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { createNoise2D } from 'simplex-noise';
import { useTheme } from '@/app/store/theme';

type CanvasTerrainProps = {
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

type Offset = { x: number; z: number };

type GenerateTerrainFn = (
  detail: number,
  height: number,
  texture: number,
  scale: number,
  offset: Offset
) => Float32Array;

const generateTerrain: GenerateTerrainFn = (
  detail,
  height,
  texture,
  scale,
  offset
) => {
  const noise2D = createNoise2D();
  const noise = (level: number, x: number, z: number): number =>
    noise2D(
      offset.x * scale + scale * level * x,
      offset.z * scale + scale * level * z
    ) /
      level +
    (level > 1 ? noise(level / 2, x, z) : 0);

  const arrayLength = detail ** 2 * 3;
  const result = new Float32Array(arrayLength);

  for (let i = 0; i < arrayLength; i++) {
    let v: number;
    switch (i % 3) {
      case 0:
        v = i / 3;
        result[i] = (offset.x + ((v % detail) / detail - 0.5)) * scale;
        break;
      case 1:
        v = (i - 1) / 3;
        result[i] =
          noise(
            2 ** texture,
            (v % detail) / detail - 0.5,
            Math.floor(v / detail) / detail - 0.5
          ) * height;
        break;
      case 2:
        v = (i - 2) / 3;
        result[i] = (offset.z + Math.floor(v / detail) / detail - 0.5) * scale;
        break;
    }
  }

  return result;
};

export default function CanvasTerrain({
  detail,
  height,
  texture,
  scale,
  offset = { x: 0, z: 0 },
  rotation,
}: CanvasTerrainProps) {
  const theme = useTheme();
  const lightColor = '#ACACAC'; // Hex code for light theme
  const darkColor = '#1F1F1F'; // Hex code for dark theme
  const canvasColor = theme.effectiveTheme === 'dark' ? darkColor : lightColor;

  interface PlaneGeometryRef extends PlaneGeometry {
    elementsNeedUpdate: boolean;
  }

  const ref = useRef<PlaneGeometryRef>(null);
  const mesh = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += rotation / 20000;
    }
  });

  useLayoutEffect(() => {
    if (ref.current) {
      const node = ref.current;
      node.setAttribute(
        'position',
        new BufferAttribute(
          generateTerrain(detail, height, texture, scale, offset),
          3
        )
      );
      node.elementsNeedUpdate = true;
      node?.computeVertexNormals();
    }
  }, [detail, height, texture, scale, offset]);

  return (
    <mesh ref={mesh}>
      <planeGeometry
        args={[undefined, undefined, detail - 1, detail - 1]}
        ref={ref}
      />
      <ambientLight intensity={3} /> {/* Increased intensity */}
      <directionalLight position={[10, 20, 5]} intensity={3} />{' '}
      <MeshDistortMaterial
        distort={0.8}
        speed={0.05}
        wireframe
        color={canvasColor}
      />
    </mesh>
  );
}
