'use client';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import Tooltip from '@/components/ui/Tooltip';
import IconWave from '@/components/icons/IconWave';

export default function About() {
  return (
    <Container>
      <main className="mt-8" aria-labelledby="about-heading">
        <div id="about-heading">
          <PageHeading title={'About'} />
        </div>
        <section className="mb-10 max-w-7xl font-serif text-3xl leading-relaxed">
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
        </section>

        <div className="flex justify-center py-4" aria-hidden="true">
          <IconWave />
        </div>

        <section className="mt-2 flex flex-col" aria-label="Contact links">
          <div className="mb-2 flex flex-row items-center">
            <p className="text-zinc-600 dark:text-zinc-500" id="x-link">
              X:
            </p>
            <Tooltip text="Visit my X profile" pos="r">
              <a
                href="https://x.com/amirardalan"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-1 text-primary"
                aria-labelledby="x-link"
              >
                @amirardalan
              </a>
            </Tooltip>
          </div>
          <div className="mb-2 flex flex-row items-center">
            <p className="text-zinc-600 dark:text-zinc-500" id="github-link">
              GitHub:
            </p>
            <Tooltip text="Visit my GitHub profile" pos="r">
              <a
                href="https://github.com/amirardalan"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-1 text-primary"
                aria-labelledby="github-link"
              >
                @amirardalan
              </a>
            </Tooltip>
          </div>
          <div className="mb-2 flex flex-row items-center">
            <p className="text-zinc-600 dark:text-zinc-500" id="linkedin-link">
              LinkedIn:
            </p>
            <Tooltip text="Visit my LinkedIn profile" pos="r">
              <a
                href="https://linkedin.com/in/amirardalan"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-1 text-primary"
                aria-labelledby="linkedin-link"
              >
                /in/amirardalan
              </a>
            </Tooltip>
          </div>
          <div className="mb-2 flex flex-row items-center">
            <p className="text-zinc-600 dark:text-zinc-500" id="resume-link">
              Resume:
            </p>
            <Tooltip text="Download my resume" pos="r">
              <a
                href="https://amir.sh/resume"
                rel="noopener noreferrer"
                target="_blank"
                className="ml-1 text-primary"
                aria-labelledby="resume-link"
              >
                download
              </a>
            </Tooltip>
          </div>
        </section>
        {/* Remove the CldImage test */}
      </main>
    </Container>
  );
}
