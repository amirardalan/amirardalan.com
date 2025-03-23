'use client';
import Image from 'next/image';
import Tooltip from '@/components/util/Tooltip';

export default function PageContent() {
  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="mb-6 flex w-full justify-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={125}
          height={125}
          className="flex justify-center rounded-full"
          priority={true}
        />
      </div>
      <div className="text-s mt-5 font-sans text-gray-600 dark:text-gray-500">
        Portfolio of
        <Tooltip text="GitHub" pos="b">
          <a
            href="https://github.com/amirardalan"
            rel="noopener noreferrer"
            target="_blank"
            className="ml-1"
          >
            @amirardalan
          </a>
        </Tooltip>
      </div>
    </div>
  );
}
