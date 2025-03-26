'use client';

import { usePathname } from 'next/navigation';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  const pathname = usePathname();

  return (
    <div className="text-md mb-6 flex w-full border-b-2 border-zinc-400 pb-4 text-dark dark:border-zinc-600 dark:text-light">
      <h1>{title}</h1> <span className="ml-1"> — Amir Ardalan</span>
    </div>
  );
}
