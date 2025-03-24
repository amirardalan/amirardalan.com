'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import categories from '@/app/blog/categories.json';

interface EditPostFormProps {
  post: any;
  userId: string;
}

interface Category {
  id: string;
  name: string;
}

export default function EditPostForm({ post, userId }: EditPostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title || '');
  const [slug, setSlug] = useState(post.slug || '');
  const [excerpt, setExcerpt] = useState(post.excerpt || '');
  const [content, setContent] = useState(post.content || '');
  const [category, setCategory] = useState(post.category || '');
  const [published, setPublished] = useState(post.published || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/blog/post/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: post.id,
          title,
          slug,
          excerpt,
          content,
          category,
          userId,
          published,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update post');
      }

      // Trigger revalidation of blog pages
      await fetch('/api/revalidate/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-token': process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || '',
        },
        body: JSON.stringify({ slug }),
      });

      // Redirect to the appropriate location based on published status
      if (published) {
        router.push(`/blog/${slug}`);
      } else {
        router.push('/admin/blog/drafts');
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-dark dark:text-light"
    >
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-700 dark:bg-red-900 dark:text-red-100">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-row">
        <div className="w-full">
          <label htmlFor="slug" className="block font-medium">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block font-medium">
          Excerpt
        </label>
        <input
          type="text"
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="content" className="block font-medium">
          Content (MDX)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={15}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex w-full flex-row justify-between">
        <div className="flex items-center">
          <div className="flex items-center">
            <label htmlFor="category" className="mr-2 block font-medium">
              Category:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div className="mr-4 flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="published" className="ml-2 block font-medium">
              Publish
            </label>
          </div>

          <div>
            <Button
              type="submit"
              text={isSubmitting ? 'Saving...' : 'Save Post'}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
