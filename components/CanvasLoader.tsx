import React, { FC, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import CanvasTerrain from '@/components/CanvasTerrain';

const styleRandomizeButton = css({
  zIndex: 0,
  position: 'absolute',
  height: '100vh',
  width: '100vw',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
});

const CanvasLoader: FC = () => {
  const [pixelRatio, setPixelRatio] = useState(1);

  useEffect(() => {
    setPixelRatio(window.devicePixelRatio);
  }, [setPixelRatio]);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  const getRandomArbitrary = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const MIN_DETAIL = 10;
  const MAX_DETAIL = 200;
  const MIN_HEIGHT = 0.05;
  const MAX_HEIGHT = 0.25;
  const MIN_TEXTURE = 1;
  const MAX_TEXTURE = 3;

  const [detail, setDetail] = useState(getRandomInt(MIN_DETAIL, MAX_DETAIL));
  const [height, setHeight] = useState(
    getRandomArbitrary(MIN_HEIGHT, MAX_HEIGHT)
  );
  const [texture, setTexture] = useState(
    getRandomInt(MIN_TEXTURE, MAX_TEXTURE)
  );
  const scale = 3;
  const rotation = 0.5;
  const offset = { x: 0, z: 0 };

  const randomizeTerrain = () => {
    setDetail(getRandomInt(MIN_DETAIL, MAX_DETAIL));
    setHeight(getRandomArbitrary(MIN_HEIGHT, MAX_HEIGHT));
    setTexture(getRandomInt(MIN_TEXTURE, MAX_TEXTURE));
  };

  return (
    <button onClick={randomizeTerrain} css={styleRandomizeButton}>
      <Canvas
        css={{ animation: 'fadeIn 3s forwards' }}
        gl={{ antialias: true }}
        dpr={pixelRatio}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.4, 0.4, 0.4] }}
      >
        <CanvasTerrain
          detail={detail}
          height={height}
          texture={texture}
          scale={scale}
          rotation={rotation}
          offset={offset}
        />
      </Canvas>
    </button>
  );
};

export default React.memo(CanvasLoader);
