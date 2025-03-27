'use client';

import { useState } from 'react';
import IconClose from '@/components/icons/IconClose';
import clsx from 'clsx';
import { formatDate } from '@/utils/format-date';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  editedAt: string;
}

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
            <li key={post.id} className="pb-4 text-2xl last:pb-0">
              <a href={`/blog/${post.slug}`}>
                <h2 className="hover:text-primary">{post.title}</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {post.excerpt}
                </p>
                <time className="text-dark dark:text-light">
                  {formatDate(post.publishedAt)}
                </time>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-dark dark:text-light">No posts match your search.</p>
      )}
    </div>
  );
}
