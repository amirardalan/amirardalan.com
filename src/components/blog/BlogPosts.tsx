'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { formatDate } from '@/src/utils/format-date';
import IconClose from '@/components/icons/IconClose';
import calculateReadTime from '@/src/utils/calculate-readtime';
import { BlogPost } from '@/src/types/blog';

export default function BlogPosts({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearFilters = () => {
    setSearchTerm('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-2 w-full rounded-lg border-2 border-zinc-300 bg-zinc-100 p-2 text-dark outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-light"
      />
      <div className="flex items-center justify-between">
        {searchTerm && (
          <p className="text-sm text-dark dark:text-light">
            {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
          </p>
        )}
        {searchTerm && (
          <button
            onClick={handleClearFilters}
            title="Clear Search"
            className="flex items-center"
          >
            <IconClose />
            <span className="pl-1">Clear Search</span>
          </button>
        )}
      </div>
      {filteredPosts.length > 0 ? (
        <ul className={clsx('pt-6', searchTerm && 'pt-2')}>
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              className="flex w-full justify-between pb-8 text-2xl last:pb-0"
            >
              <a className="w-full" href={`/blog/${post.slug}`}>
                <h2 className="hover:text-primary">{post.title}</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              </a>
              <div className="flex min-w-fit flex-col items-end text-xs">
                <time className="text-zinc-500 dark:text-zinc-400">
                  {formatDate(post.created_at)}
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
    </div>
  );
}
