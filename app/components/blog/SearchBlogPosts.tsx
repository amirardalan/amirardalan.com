'use client';

import { useState } from 'react';
import IconClose from '@/components/icons/IconClose';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
}

export default function SearchBlogList({ posts }: { posts: BlogPost[] }) {
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
      <div className="mb-4 flex items-center justify-between">
        {searchTerm && (
          <p className="text-sm text-dark dark:text-light">
            {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''}
          </p>
        )}
        {searchTerm && (
          <button
            onClick={handleClearFilters}
            title="Clear filters"
            className="flex items-center"
          >
            <IconClose />
            <span className="pl-1">Clear Filters</span>
          </button>
        )}
      </div>
      {filteredPosts.length > 0 ? (
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-dark dark:text-light">No posts match your search.</p>
      )}
    </div>
  );
}
