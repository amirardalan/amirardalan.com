'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import TypingAnimation from '@/components/content/TypingAnimation';

export default function HomeContent() {
  return (
    <div className="flex w-full flex-col">
      <div className="items-left mb-16 flex justify-start space-x-2 text-left text-3xl">
        <TypingAnimation />
      </div>
      <div className="mt-8 flex flex-col">
        <h1 className="text-8xl tracking-wide text-dark dark:text-light">
          Amir Ardalan
        </h1>
        <h2 className="my-5 text-2xl uppercase tracking-widest text-zinc-500">
          Frontend Engineer & UI/UX Designer
        </h2>
        <div className="mt-8 flex space-x-4">
          <Link href="/blog">
            <Button text="Blog" variant="primary" size="large" />
          </Link>
          <Link href="/about">
            <Button text="About" variant="secondary" size="large" />
          </Link>
        </div>
      </div>
    </div>
  );
}
