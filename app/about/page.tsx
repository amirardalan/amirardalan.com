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
            Design Engineer with 10+ years of experience based in Portland, OR.
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
        <span className="mt-2 flex flex-row">
          <p className="text-zinc-400 dark:text-zinc-500">
            Built and maintained by
          </p>
          <Tooltip text="x.com" pos="b">
            <a
              href="https://x.com/amirardalan"
              rel="noopener noreferrer"
              target="_blank"
              className="ml-1 text-primary"
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
