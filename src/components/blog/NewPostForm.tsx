'use client';

import { useToast } from '@/components/ui/ToastContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/src/db/services/postService';

import Button from '@/components/ui/Button';
import PostFormFields from './PostFormFields';

interface NewPostFormProps {
  userId: number;
}

export default function NewPostForm({ userId }: NewPostFormProps) {
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
  const [showGallery, setShowGallery] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        title,
        slug,
        excerpt,
        content,
        category,
        user_id: userId,
        published,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await createPost(payload);

      showToast('Post created successfully!', 'success');
      router.push(published ? `/blog/${slug}` : '/admin/blog/drafts');
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
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
      <PostFormFields
        title={title}
        setTitle={setTitle}
        slug={slug}
        setSlug={setSlug}
        excerpt={excerpt}
        setExcerpt={setExcerpt}
        content={content}
        setContent={setContent}
        category={category}
        setCategory={setCategory}
        published={published}
        setPublished={setPublished}
        showGallery={showGallery}
        setShowGallery={setShowGallery}
      />
      <Button
        type="submit"
        text={isSubmitting ? 'Creating...' : 'Create Post'}
        disabled={isSubmitting}
      />
    </form>
  );
}
