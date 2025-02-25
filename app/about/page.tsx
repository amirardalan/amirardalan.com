'use client';
import Tooltip from '@/components/util/tooltip';

export default function About() {
  return (
    <main>
      <div className="mt-8">
        <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
          About
        </h2>
        <p className="text-dark dark:text-light">
          A Next.js App Router starter project with TypeScript, Tailwind,
          NextAuth, Prettier, and Dark Mode.
        </p>
        <span className="mt-2 flex flex-row">
          <p className="text-dark dark:text-light">Built and maintained by</p>
          <Tooltip text="x.com" pos="b">
            <a
              href="https://x.com/amirardalan"
              rel="noopener noreferrer"
              target="_blank"
              className="ml-1"
            >
              @amirardalan
            </a>
          </Tooltip>
          <p className="text-dark dark:text-light">.</p>
        </span>
      </div>
    </main>
  );
}
