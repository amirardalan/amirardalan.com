import React, { FC, useEffect } from 'react';
import Typed from 'typed.js';

type TypingAnimationProps = {
  data: string;
};

interface Options {
  strings: string[];
  cursorChar: string;
  startDelay: number;
  typeSpeed: number;
  backSpeed: number;
  backDelay: number;
  loop: boolean;
  fadeOut: boolean;
}

const TypingAnimation: FC<TypingAnimationProps> = ({ data }) => {
  useEffect(() => {
    const options: Options = {
      strings: [...data],
      cursorChar: '▌',
      startDelay: 500,
      typeSpeed: 90,
      backSpeed: 0,
      fadeOut: true,
      backDelay: 1000,
      loop: true,
    };
    const typed = new Typed('.typingAnimation', options);

    return () => {
      typed.destroy();
    };
  }, [data]);

  return <span className="typingAnimation" />;
};

export default React.memo(TypingAnimation);
