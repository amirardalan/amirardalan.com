'use client';

import { usePathname } from 'next/navigation';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin'); // Check if the path includes '/admin'

  return (
    <div className="text-md mb-6 flex pb-4 text-dark dark:border-zinc-500 dark:text-light">
      <h1>{title}</h1>
      {!isAdmin && <span className="ml-1"> — Amir Ardalan</span>}
    </div>
  );
}
