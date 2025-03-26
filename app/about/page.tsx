'use client';

import PageHeading from '@/app/components/ui/PageHeading';
import Container from '@/components/content/Container';
import Tooltip from '@/components/ui/Tooltip';
import IconWave from '@/components/icons/IconWave';

export default function About() {
  return (
    <Container>
      <div className="mt-8">
        <PageHeading title={'About'} />
        <div className="mb-10 max-w-7xl font-serif text-3xl leading-relaxed">
          <p className="mb-6 text-dark dark:text-light">
            Based in Portland, OR.
          </p>
          <p className="mb-6 text-dark dark:text-light">
            I&apos;ve shaped digital solutions blending code and design for
            Nike&apos;s LeBron James Innovation Center, Columbia Sportswear, and
            KEEN Footwear with BASIC/DEPT®.
          </p>
          <p className="mb-6 text-dark dark:text-light">
            I craft intuitive, innovative products that elevate user experiences
            and drive results.
          </p>
        </div>

        <div className="my-4 flex justify-center">
          <IconWave />
        </div>

        <div className="mt-2 flex flex-col">
          <div className="flex flex-row">
            <p className="text-zinc-600 dark:text-zinc-500">x:</p>
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
            <p className="text-zinc-600 dark:text-zinc-500">github:</p>
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
            <p className="text-zinc-600 dark:text-zinc-500">linkedin:</p>
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
            <p className="text-zinc-600 dark:text-zinc-500">resume:</p>
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
    </Container>
  );
}
