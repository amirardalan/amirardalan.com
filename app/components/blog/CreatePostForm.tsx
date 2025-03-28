'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import categories from '@/data/categories.json';
import { useToast } from '@/components/ui/ToastContext';
import { db } from '@/db';
import { posts } from '@/schema';

interface CreatePostFormProps {
  userId: string;
}

interface Category {
  id: string;
  name: string;
}

export default function CreatePostForm({ userId }: CreatePostFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await db.insert(posts).values({
        title,
        slug,
        excerpt,
        content,
        category,
        authorId: parseInt(userId, 10),
        published,
        created_at: new Date(),
        updated_at: new Date(),
      });

      showToast('Post created successfully!', 'success');

      setTimeout(() => {
        router.push(published ? `/blog/${slug}` : '/admin/blog/drafts');
      }, 1500);
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

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
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
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
            className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block font-medium">
          Excerpt
        </label>
        <input
          type="text"
          id="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
        />
      </div>

      <div>
        <label htmlFor="content" className="block font-medium">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={15}
          className="mt-1 block w-full rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
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
              className="mt-1 block rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2 text-zinc-950 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-500 dark:bg-zinc-800 dark:text-light"
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
              className="h-4 w-4 cursor-pointer rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="published"
              className="ml-2 block cursor-pointer font-medium"
            >
              Publish
            </label>
          </div>

          <div>
            <Button
              type="submit"
              text={isSubmitting ? 'Creating...' : 'Create Post'}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
