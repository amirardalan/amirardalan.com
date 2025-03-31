'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updatePost, deletePost } from '@/src/db/services/postService';
import { useToast } from '@/components/ui/ToastContext';

import PostFormFields from '@/components/blog/PostFormFields';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import MediaGallery from '@/components/blog/MediaGallery';

import { BlogPost } from '@/types/blog';

interface EditPostFormProps {
  post: BlogPost;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState(post.title || '');
  const [slug, setSlug] = useState(post.slug || '');
  const [excerpt, setExcerpt] = useState(post.excerpt || '');
  const [content, setContent] = useState(post.content || '');
  const [category, setCategory] = useState(post.category || '');
  const [published, setPublished] = useState(post.published || false);
  const [showUpdated, setShowUpdated] = useState(post.show_updated || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updatePost(post.id, {
        title,
        slug,
        excerpt,
        content,
        category,
        published,
        show_updated: showUpdated,
        user_id: post.user_id,
      });

      showToast('Post updated successfully!', 'success');
      router.push(published ? `/blog/${slug}` : '/admin/blog/drafts');
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
    }
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
      await deletePost(post.id);

      showToast('Post deleted successfully!', 'success');
      router.push(
        post.published ? '/admin/blog/published' : '/admin/blog/drafts'
      );
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
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
          showUpdated={showUpdated}
          setShowUpdated={setShowUpdated}
        />
        <div className="flex space-x-2">
          <Button
            type="button"
            onClick={handleDeleteClick}
            text={isDeleting ? 'Deleting...' : 'Delete'}
            disabled={isDeleting || isSubmitting}
            variant="danger"
          />
          <Button
            type="submit"
            text={isSubmitting ? 'Saving...' : 'Save Post'}
            disabled={isSubmitting || isDeleting}
          />
        </div>
      </form>

      <Modal
        isOpen={showDeleteModal}
        title="Confirm Deletion"
        message="Are you sure you want to delete this post? This action cannot be undone."
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        confirmText={isDeleting ? 'Deleting...' : 'Delete Post'}
        confirmDisabled={isDeleting}
      />

      <Modal
        isOpen={showGallery}
        title="Select an Image"
        message=""
        onCancel={() => setShowGallery(false)}
        buttons="cancel" // Only show the cancel button
      >
        <MediaGallery
          onSelect={(url) => {
            setContent(`${content}\n![Image](${url})`);
            setShowGallery(false);
          }}
        />
      </Modal>
    </>
  );
}
