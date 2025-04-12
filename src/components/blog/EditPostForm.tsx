'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { updatePost, deletePost } from '@/services/post-service';
import { useToast } from '@/components/ui/ToastContext';
import { generateCsrfToken } from '@/lib/csrf';
import { useImageInsertion } from '@/hooks/useImageInsertion';

import PostFormFields from '@/components/blog/PostFormFields';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import MediaGallery from '@/components/blog/MediaGallery';
import PostFormControls from '@/components/blog/PostFormControls';
import UnsavedChangesHandler from '@/components/ui/UnsavedChangesHandler';

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
  const [featured, setFeatured] = useState(post.featured || false);
  const [showUpdated, setShowUpdated] = useState(post.show_updated || false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const csrfToken = generateCsrfToken();

  // Track form changes to detect unsaved changes
  useEffect(() => {
    const formChanged =
      title !== (post.title || '') ||
      slug !== (post.slug || '') ||
      excerpt !== (post.excerpt || '') ||
      content !== (post.content || '') ||
      category !== (post.category || '') ||
      featured !== (post.featured || false) ||
      published !== (post.published || false) ||
      showUpdated !== (post.show_updated || false);

    setHasUnsavedChanges(formChanged);
  }, [
    title,
    slug,
    excerpt,
    content,
    category,
    featured,
    published,
    showUpdated,
    post,
  ]);

  const handleFormChange = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const csrfTokenValue = await csrfToken;
      await updatePost(
        post.id,
        {
          title,
          slug,
          excerpt,
          content,
          category,
          published,
          featured,
          show_updated: showUpdated,
          user_id: post.user_id,
          csrfToken: csrfTokenValue,
        },
        csrfTokenValue
      );

      showToast('Post updated successfully!', 'success');
      setHasUnsavedChanges(false); // Mark changes as saved
      // Always redirect to the post page after saving, whether draft or published
      router.push(`/blog/${slug}`);
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
      setHasUnsavedChanges(false); // No need to prompt about unsaved changes
      // Keep existing redirect logic for delete: published go to published list, drafts go to drafts list
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

  const discardChanges = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  // Use custom hook for image insertion
  const {
    textareaRef,
    cursorPosition,
    handleTextAreaSelect,
    insertImageAtCursor,
  } = useImageInsertion(content, setContent, () => setShowGallery(false));

  return (
    <>
      <form
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        className="font-mono text-dark dark:text-light"
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
          featured={featured}
          setFeatured={setFeatured}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
          showUpdated={showUpdated}
          setShowUpdated={setShowUpdated}
          textareaRef={textareaRef}
          onTextAreaSelect={handleTextAreaSelect}
        />
        <PostFormControls
          isSubmitting={isSubmitting}
          isDeleting={isDeleting}
          showDelete={true}
          onDelete={handleDeleteClick}
          onSubmitText="Save Post"
          onDeleteText="Delete"
        />
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
        title="Media Gallery"
        message=""
        onCancel={() => setShowGallery(false)}
        buttons="cancel"
        leftButton={
          <Button
            type="button"
            text="Upload"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          />
        }
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
        <MediaGallery
          onSelect={insertImageAtCursor}
          fileInputRef={fileInputRef}
          cursorPosition={cursorPosition}
        />
      </Modal>

      {/* Handle navigation away from the page */}
      <UnsavedChangesHandler
        hasUnsavedChanges={hasUnsavedChanges}
        onDiscard={discardChanges}
      />
    </>
  );
}
