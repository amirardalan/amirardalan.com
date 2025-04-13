import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import {
  BufferAttribute,
  PlaneGeometry,
  Mesh,
  Material,
  BufferGeometry,
} from 'three';
import { createNoise2D } from 'simplex-noise';
import { useTheme } from '@/store/theme';
import TooltipCursor from '@/components/ui/TooltipCursor';

type Offset = { x: number; z: number };

type TerrainProps = {
  detail: number;
  height: number;
  texture: number;
  scale: number;
  rotation: number;
  offset: Offset;
};

type GenerateTerrainFn = (
  detail: number,
  height: number,
  texture: number,
  scale: number,
  offset: Offset
) => Float32Array;

// Randomizer
const MIN_DETAIL = 10;
const MAX_DETAIL = 200;
const MIN_HEIGHT = 0.05;
const MAX_HEIGHT = 0.25;
const MIN_TEXTURE = 1;
const MAX_TEXTURE = 3;

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Generator
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

// Mesh
function Terrain({
  detail,
  height,
  texture,
  scale,
  offset,
  rotation,
}: TerrainProps) {
  const theme = useTheme();
  const canvasColor = useMemo(() => {
    const lightColor = '#acacac';
    const darkColor = '#1f1f1f';
    return theme.effectiveTheme === 'dark' ? darkColor : lightColor;
  }, [theme.effectiveTheme]);

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
      <ambientLight intensity={3} />
      <directionalLight position={[10, 20, 5]} intensity={3} />
      <MeshDistortMaterial
        distort={0.8}
        speed={0.05}
        wireframe
        color={canvasColor}
      />
    </mesh>
  );
}

// Canvas
export default function TerrainCanvas() {
  const [pixelRatio, setPixelRatio] = useState(1);
  const [detail, setDetail] = useState(getRandomInt(MIN_DETAIL, MAX_DETAIL));
  const [height, setHeight] = useState(
    getRandomArbitrary(MIN_HEIGHT, MAX_HEIGHT)
  );
  const [texture, setTexture] = useState(
    getRandomInt(MIN_TEXTURE, MAX_TEXTURE)
  );

  const scale = 3;
  const rotation = 0.5;
  const offset = useMemo(() => ({ x: 0, z: 0 }), []);

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio);
  }, []);

  const randomizeTerrain = useCallback(() => {
    setDetail(getRandomInt(MIN_DETAIL, MAX_DETAIL));
    setHeight(getRandomArbitrary(MIN_HEIGHT, MAX_HEIGHT));
    setTexture(getRandomInt(MIN_TEXTURE, MAX_TEXTURE));
  }, []);

  // Memoize the terrain props to prevent unnecessary re-renders
  const terrainProps = useMemo(
    () => ({
      detail,
      height,
      texture,
      scale,
      rotation,
      offset,
    }),
    [detail, height, texture, scale, rotation, offset]
  );

  return (
    <TooltipCursor text="Randomize terrain">
      <button
        id="three-canvas"
        onClick={randomizeTerrain}
        className="animate-fade-in-bottom absolute z-0 m-0 block h-screen w-screen cursor-pointer overflow-hidden border-none bg-transparent p-0 outline-none md:bottom-0"
      >
        <Canvas
          gl={{ antialias: true }}
          dpr={pixelRatio}
          onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
          camera={{ position: [0.1, 1, 0.8] }}
        >
          <Terrain {...terrainProps} />
        </Canvas>
      </button>
    </TooltipCursor>
  );
}
