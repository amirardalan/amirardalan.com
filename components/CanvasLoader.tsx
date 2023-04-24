import React, { FC, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import CanvasTerrain from '@/components/CanvasTerrain';

const styleRandomizeButton = css({
  zIndex: 4,
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
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

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const [detail, setDetail] = useState(getRandomInt(10, 175));
  const [height, setHeight] = useState(getRandomArbitrary(0.05, 0.3));
  const [texture, setTexture] = useState(getRandomInt(1, 3.5));
  const [scale, setScale] = useState(getRandomInt(2, 5));
  const rotation = 1;
  const offset = { x: 0, z: 0 };

  const randomizeTerrain = () => {
    setDetail(getRandomInt(10, 175));
    setHeight(getRandomArbitrary(0.05, 0.3));
    setTexture(getRandomInt(1, 3.5));
    setScale(getRandomInt(2, 5));
  };

  return (
    <>
      <button css={styleRandomizeButton} onClick={randomizeTerrain} />

      <Canvas
        css={{ animation: 'fadeIn 3s forwards' }}
        gl={{ antialias: true }}
        dpr={pixelRatio}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.25, 0.25, 0.25] }}
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
    </>
  );
};

export default React.memo(CanvasLoader);
