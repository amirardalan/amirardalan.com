'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import IconClose from '@/components/icons/IconClose';

import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';

import { BlogPost } from '@/types/blog';

interface ClientPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function ClientPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: ClientPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className={`flex justify-center space-x-2 ${className}`}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
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
  );
}

export default function BlogPosts({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const postsPerPage = 8;

  // Find the featured post, if any
  const featuredPost = posts.find((post) => post.featured);

  // Filter the remaining posts
  const regularPosts = posts.filter((post) => !post.featured);

  const filteredPosts = regularPosts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter
      ? (post.category ?? '').toLowerCase() === categoryFilter.toLowerCase()
      : true;
    return matchesSearch && matchesCategory;
  });

  // Filter the featured post as well (if it exists)
  const showFeaturedPost =
    featuredPost &&
    (!searchTerm ||
      featuredPost.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!categoryFilter ||
      (featuredPost.category ?? '').toLowerCase() ===
        categoryFilter.toLowerCase());

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
  const allCategories = ['all', ...categories.sort()];

  return (
    <div>
      <div className="scrollbar-hide mb-3 flex space-x-4 overflow-x-auto text-xxs uppercase text-dark dark:text-light">
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
                ? 'pb-0.5 text-primary'
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
        className="mb-2 w-full rounded-lg border-[1px] border-zinc-300 bg-zinc-100 p-2 text-dark outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-light"
      />
      <div className="mb-4 flex items-center justify-between">
        <div>
          {searchTerm && (
            <p className="text-sm text-dark dark:text-light">
              {filteredPosts.length + (showFeaturedPost ? 1 : 0)} result
              {filteredPosts.length + (showFeaturedPost ? 1 : 0) !== 1
                ? 's'
                : ''}
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
      {paginatedPosts.length > 0 || showFeaturedPost ? (
        <ul className={clsx('pb-8 pt-6', searchTerm && 'pt-2')}>
          {/* Featured post at the top */}
          {showFeaturedPost && (
            <li
              key={featuredPost.id}
              className="mb-10 flex w-full justify-between border-l-4 border-primary pl-4 text-xl last:mb-0"
            >
              <a className="w-full" href={`/blog/${featuredPost.slug}`}>
                <div className="flex items-center space-x-2">
                  <div className="flex flex-col">
                    <span className="mb-1 text-xxs uppercase leading-none text-primary">
                      Featured
                    </span>
                    <h2 className="pr-12 text-2xl">{featuredPost.title}</h2>
                  </div>
                </div>
                <p className="mt-2 font-serif text-sm italic leading-none text-zinc-500 dark:text-zinc-400">
                  {featuredPost.excerpt}
                </p>
              </a>
              <div className="flex min-w-fit flex-col items-end text-xs">
                <time className="text-zinc-500 dark:text-zinc-400">
                  {formatDate(
                    featuredPost.show_updated
                      ? featuredPost.updated_at ?? featuredPost.created_at
                      : featuredPost.created_at
                  )}
                </time>
                <span className="text-zinc-400 dark:text-zinc-500">
                  {calculateReadTime(featuredPost.content)}
                </span>
              </div>
            </li>
          )}

          {/* Regular posts */}
          {paginatedPosts.map((post) => (
            <li
              key={post.id}
              className="relative mb-10 flex w-full justify-between text-xl last:mb-0"
            >
              <a className="w-full" href={`/blog/${post.slug}`}>
                <h2 className="relative pr-12 text-2xl">{post.title}</h2>
                <p className="mt-2 font-serif text-sm italic text-zinc-500 dark:text-zinc-400">
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
      <ClientPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="my-16"
      />
    </div>
  );
}
