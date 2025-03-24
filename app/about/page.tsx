'use client';
import PageHeading from '../components/ui/PageHeading';
import Tooltip from '@/components/ui/Tooltip';

export default function About() {
  return (
    <main>
      <div className="mt-8">
        <PageHeading title={'About'} />
        <div className="my-10 max-w-7xl font-serif text-3xl leading-relaxed">
          <p className="mb-6 text-dark dark:text-light">
            Frontend Engineer with 10+ years of experience based in Portland,
            OR.
          </p>
          <p className="mb-6 text-dark dark:text-light">
            I&apos;ve collaborated with renowned brands including Nike,
            BASIC/DEPT®, Columbia Sportswear, SOREL, and KEEN Footwear.
          </p>
          <p className="mb-6 text-dark dark:text-light">
            I combine form and function to create innovative digital products
            that delight users and drive results.
          </p>
        </div>
        <div className="mt-2 flex flex-col">
          <div className="flex flex-row">
            <p className="text-zinc-400 dark:text-zinc-500">x:</p>
            <Tooltip text="x.com" pos="r">
              <a
                href="https://x.com/amirardalan"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-1 text-primary"
              >
                @amirardalan
              </a>
            </Tooltip>
          </div>
          <div className="flex flex-row">
            <p className="text-zinc-400 dark:text-zinc-500">github:</p>
            <Tooltip text="github.com" pos="r">
              <a
                href="https://github.com/amirardalan"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-1 text-primary"
              >
                @amirardalan
              </a>
            </Tooltip>
          </div>
          <div className="flex flex-row">
            <p className="text-zinc-400 dark:text-zinc-500">linkedin:</p>
            <Tooltip text="linkedin.com" pos="r">
              <a
                href="https://linkedin.com/in/amirardalan"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-1 text-primary"
              >
                /in/amirardalan
              </a>
            </Tooltip>
          </div>
          <div className="flex flex-row">
            <p className="text-zinc-400 dark:text-zinc-500">resume:</p>
            <Tooltip text="resume" pos="r">
              <a
                href="https://amir.sh/resume"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-1 text-primary"
              >
                download
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </main>
  );
}
