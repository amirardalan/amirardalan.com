'use client';

import { useState } from 'react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
}

export default function SearchableBlogList({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-8 w-full rounded-lg bg-zinc-300 p-2 text-dark outline-none dark:bg-zinc-800 dark:text-light"
      />
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
