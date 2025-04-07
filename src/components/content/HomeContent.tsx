'use client';

import TypingAnimation from '@/components/content/TypingAnimation';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function HomeContent() {
  return (
    <section
      className="animate-fade-in pointer-events-none z-20 ml-10 mt-[10%] flex w-full flex-col items-start p-20"
      aria-label="Home page introduction"
      role="region"
    >
      <div
        className="items-left pointer-events-auto mb-8 flex justify-start space-x-2 text-left text-2xl"
        aria-live="polite"
      >
        <TypingAnimation />
      </div>
      <div className="pointer-events-auto mt-8 flex flex-col">
        <h1
          className="text-8xl tracking-wide text-dark dark:text-light"
          id="page-title"
        >
          Amir Ardalan
        </h1>
        <h2
          className="my-5 text-2xl uppercase tracking-widest text-zinc-600 dark:text-zinc-400"
          id="page-subtitle"
        >
          Fullstack Engineer & UI/UX Designer
        </h2>
        <nav className="mt-8 flex space-x-4" aria-label="Main navigation">
          <Link href="/blog" aria-label="Read my blog posts">
            <Button text="Blog" variant="primary" size="large" />
          </Link>
          <Link href="/about" aria-label="Learn more about me">
            <Button text="About" variant="secondary" size="large" />
          </Link>
        </nav>
      </div>
    </section>
  );
}
