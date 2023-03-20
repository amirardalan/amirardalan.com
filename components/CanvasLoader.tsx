import React, { FC, useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import CanvasTerrain from '@/components/CanvasTerrain';

// Console Tag
console.log(`
 █████  ███    ███ ██ ██████  
██   ██ ████  ████ ██ ██   ██ 
███████ ██ ████ ██ ██ ██████  
██   ██ ██  ██  ██ ██ ██   ██ 
██   ██ ██      ██ ██ ██   ██ 
-----------------------------
Design & Code by Amir Ardalan
`);

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
  const [pixelRatio, setPixelRatio] = useState(null);

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

  const [detail, setDetail] = useState(getRandomInt(50, 100));
  const [height, setHeight] = useState(getRandomArbitrary(0.15, 0.3));
  const [texture, setTexture] = useState(getRandomInt(1, 4));
  const [scale, setScale] = useState(getRandomInt(0, 5));
  const rotation = 1;
  const offset = { x: 0, z: 0 };

  const randomizeTerrain = () => {
    setDetail(getRandomInt(25, 175));
    setHeight(getRandomArbitrary(0.05, 0.3));
    setTexture(getRandomInt(1, 6));
    setScale(getRandomInt(3, 9));
  };

  return (
    <>
      <button css={styleRandomizeButton} onClick={randomizeTerrain} />

      <Canvas
        css={{ animation: 'slideUpSection 1s forwards' }}
        gl={{ antialias: true }}
        dpr={pixelRatio}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
        camera={{ position: [0.35, 0.35, 0.35] }}
      >
        <CanvasTerrain
          theme="#a1a4b0"
          detail={detail}
          height={height}
          texture={texture}
          scale={scale}
          rotation={rotation}
          offset={offset}
        />
        <ambientLight />
      </Canvas>
    </>
  );
};

export default React.memo(CanvasLoader);
