'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
  className?: string;
}

export default function Pagination({
  totalPages,
  className = '',
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  if (totalPages <= 1) return null;

  // Create new URLSearchParams instance to manipulate
  function createPageURL(pageNumber: number): string {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {Array.from({ length: totalPages }, (_, index) => (
        <Link
          key={index}
          href={createPageURL(index + 1)}
          className={clsx(
            'rounded border border-zinc-300 px-3 py-0.5 font-mono text-xs hover:bg-zinc-200 dark:border-zinc-500 dark:hover:bg-zinc-800',
            currentPage === index + 1
              ? 'bg-zinc-200 text-dark dark:bg-zinc-800 dark:text-light'
              : 'text-zinc-400 dark:text-zinc-500'
          )}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
}
