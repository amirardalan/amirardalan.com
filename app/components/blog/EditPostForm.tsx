'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import categories from '@/data/categories.json';
import { useToast } from '@/components/ui/ToastContext';
import { db } from '@/db';
import { posts } from '@/schema';
import { eq } from 'drizzle-orm';

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
  const { showToast } = useToast();
  const [title, setTitle] = useState(post.title || '');
  const [slug, setSlug] = useState(post.slug || '');
  const [excerpt, setExcerpt] = useState(post.excerpt || '');
  const [content, setContent] = useState(post.content || '');
  const [category, setCategory] = useState(post.category || '');
  const [published, setPublished] = useState(post.published || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await db
        .update(posts)
        .set({
          title,
          slug,
          excerpt,
          content,
          category,
          published,
          updated_at: new Date(),
        })
        .where(eq(posts.id, post.id));

      showToast('Post updated successfully!', 'success');

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
    setTitle(e.target.value);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await db.delete(posts).where(eq(posts.id, post.id));

      showToast('Post deleted successfully!', 'success');

      setTimeout(() => {
        router.push('/admin/blog/drafts');
      }, 1500);
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    } finally {
      setIsDeleting(false);
    }
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
          id="excerpt"
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

        <div className="flex flex-row items-center"></div>
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

        <div className="flex space-x-2">
          {/* Only show delete button for draft posts */}
          {!post.published && (
            <Button
              type="button"
              onClick={handleDeleteClick}
              text={isDeleting ? 'Deleting...' : 'Delete'}
              disabled={isDeleting || isSubmitting}
              variant="danger"
              color={'red-500'}
            />
          )}
          <Button
            type="submit"
            text={isSubmitting ? 'Saving...' : 'Save Post'}
            disabled={isSubmitting || isDeleting}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">
              Confirm Deletion
            </h3>
            <p className="mb-6 text-sm text-zinc-700 dark:text-zinc-300">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                onClick={handleCancelDelete}
                text="Cancel"
                variant="secondary"
              />
              <Button
                type="button"
                onClick={handleConfirmDelete}
                text={isDeleting ? 'Deleting...' : 'Delete Post'}
                disabled={isDeleting}
                variant="danger"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
