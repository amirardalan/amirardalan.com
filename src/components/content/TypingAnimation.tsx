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
    `learn a bit <a href="/about" aria-label="learn a bit about me" className="text-primary">about</a> me^3000`,
    `peruse my <a href="/blog" aria-label="peruse my blog posts" className="text-primary">blog</a> posts^3000`,
    `view my <a href="/uses" aria-label="view my toolbox" className="text-primary">toolbox</a>^3000`,
    `follow me on <a href="https://x.com/amirardalan" aria-label="follow me on X" target="_blank" rel="noopener noreferrer" className="text-primary">x.com</a>^3000`,
    `explore my <a href="https://github.com/amirardalan" aria-label="explore my GitHub" target="_blank" rel="noopener noreferrer" className="text-primary">github</a>^3000`,
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
    <h3 className="mt-8 font-mono text-lg text-xs text-dark md:text-xl lg:text-2xl dark:text-light">
      <span className="mr-4 text-primary">{'> ~ %'}</span>
      <span className="typed text-dark dark:text-light [&_a]:text-primary" />
    </h3>
  );
}
