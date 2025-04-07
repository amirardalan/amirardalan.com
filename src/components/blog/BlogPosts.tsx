'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import IconClose from '@/components/icons/IconClose';
import ClientLikeCount from '@/components/blog/ClientLikeCount';

import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';

import { BlogPost } from '@/types/blog';

export default function BlogPosts({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const postsPerPage = 8;

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? post.category === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleClearFilters = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const categories = Array.from(
    new Set(posts.map((post) => post.category ?? 'uncategorized'))
  );
  const allCategories = ['all', ...categories];

  return (
    <div>
      <div className="scrollbar-hide mb-3 flex space-x-4 overflow-x-auto text-xxs uppercase text-primary">
        {allCategories.map((category) => (
          <Link
            key={category}
            href={
              category === 'all'
                ? '/blog'
                : `/blog?category=${encodeURIComponent(category)}`
            }
            className={clsx(
              categoryFilter === category ||
                (!categoryFilter && category === 'all')
                ? 'border-b-2 border-primary pb-0.5'
                : ''
            )}
          >
            #{category}
          </Link>
        ))}
      </div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2 w-full rounded-lg border-2 border-zinc-300 bg-zinc-100 p-2 text-dark outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-light"
      />
      <div className="mb-4 flex items-center justify-between">
        <div>
          {searchTerm && (
            <p className="text-sm text-dark dark:text-light">
              {filteredPosts.length} result
              {filteredPosts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          {searchTerm && (
            <button
              onClick={handleClearFilters}
              title="Clear Search"
              className="flex items-center"
            >
              <IconClose />
              <span className="pl-1 text-sm text-dark dark:text-light">
                Clear Search
              </span>
            </button>
          )}
        </div>
      </div>
      {paginatedPosts.length > 0 ? (
        <ul className={clsx('pt-6', searchTerm && 'pt-2')}>
          {paginatedPosts.map((post) => (
            <li
              key={post.id}
              className="mb-10 flex w-full justify-between text-xl last:mb-0"
            >
              <a className="w-full" href={`/blog/${post.slug}`}>
                <h2 className="hover:text-primary">{post.title}</h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              </a>
              <div className="flex min-w-fit flex-col items-end text-xs">
                <time className="text-zinc-500 dark:text-zinc-400">
                  {formatDate(
                    post.show_updated
                      ? post.updated_at ?? post.created_at
                      : post.created_at
                  )}
                </time>
                <span className="text-zinc-400 dark:text-zinc-500">
                  {calculateReadTime(post.content)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-6 text-dark dark:text-light">
          No posts match your search.
        </p>
      )}
      {totalPages > 1 && (
        <div className="my-20 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={clsx(
                'rounded px-3 py-1 font-mono text-xs',
                currentPage === index + 1
                  ? 'bg-zinc-400 text-light dark:text-dark'
                  : 'bg-zinc-200 text-dark dark:bg-zinc-700 dark:text-light'
              )}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
