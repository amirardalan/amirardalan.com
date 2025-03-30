'use client';

import { useEffect } from 'react';
import Typed from 'typed.js';

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

const data = {
  typed: [
    `cd amir.sh --hello`,
    `learn a bit <a href="/about" className="text-primary">about</a> me^3000`,
    `peruse my <a href="/blog" className="text-primary">blog</a> posts^3000`,
    `view my <a href="/uses" className="text-primary">toolbox</a>^3000`,
    `follow me on <a href="https://x.com/amirardalan" target="_blank" rel="noopener noreferrer" className="text-primary">x.com</a>^3000`,
    `explore my <a href="https://github.com/amirardalan" target="_blank" rel="noopener noreferrer" className="text-primary">github</a>^3000`,
  ],
};

export default function TypingAnimation() {
  useEffect(() => {
    const options: Options = {
      strings: [...data.typed],
      cursorChar: '▌',
      startDelay: 500,
      typeSpeed: 90,
      backSpeed: 0,
      fadeOut: true,
      backDelay: 1500,
      loop: true,
    };
    const typed = new Typed('.typed', options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <style>{`
        .typed-cursor {
          color: var(--color-primary);
        }
        .typed a {
          color: var(--color-primary);
          text-decoration: none;
        }
      `}</style>
      <h3 className="font-mono text-dark dark:text-light">
        <span className="mr-4 text-primary">{'> ~ %'}</span>
        <span className="typed" />
      </h3>
    </>
  );
}
