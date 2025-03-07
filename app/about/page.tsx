'use client';
import Tooltip from '@/components/util/tooltip';

export default function About() {
  return (
    <main>
      <div className="mt-8">
        <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
          About
        </h2>
        <p className="mb-4 text-dark dark:text-light">
          Design Engineer with 10+ years of experience based in Portland, OR.
        </p>
        <p className="mb-4 text-dark dark:text-light">
          I&apos;ve collaborated with renowned brands including Nike,
          BASIC/DEPT®, Columbia Sportswear, SOREL, and KEEN Footwear.
        </p>
        <p className="mb-10 text-dark dark:text-light">
          I combine form and function to create innovative digital products that
          delight users and drive results.
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
