'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/services/post-service';
import { useToast } from '@/components/ui/ToastContext';
import { useImageInsertion } from '@/hooks/useImageInsertion';

import PostFormFields from '@/components/blog/PostFormFields';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import MediaGallery from '@/components/blog/MediaGallery';
import PostFormControls from '@/components/blog/PostFormControls';
import UnsavedChangesHandler from '@/components/ui/UnsavedChangesHandler';

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
  const [featured, setFeatured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(
    null!
  ) as React.RefObject<HTMLInputElement>;

  // Track form changes
  useEffect(() => {
    const formChanged =
      title !== '' ||
      slug !== '' ||
      excerpt !== '' ||
      content !== '' ||
      category !== '' ||
      featured !== false ||
      published !== false;

    setHasUnsavedChanges(formChanged);
  }, [title, slug, excerpt, content, category, featured, published]);

  const handleFormChange = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

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
        featured,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await createPost(payload);

      showToast('Post created successfully!', 'success');
      setHasUnsavedChanges(false); // Mark changes as saved before navigation
      router.push(published ? `/blog/${slug}` : '/admin/blog/drafts');
    } catch (err) {
      setError((err as Error).message);
      showToast((err as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Also optimize the clear form functionality
  const clearForm = useCallback(() => {
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setCategory('');
    setFeatured(false);
    setPublished(false);
    setHasUnsavedChanges(false);
  }, []);

  const discardChanges = useCallback(() => {
    clearForm();
  }, [clearForm]);

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
          <div className="bg-red-50 p-4 px-10 font-sans text-red-700 dark:bg-red-900 dark:text-red-100">
            Error: {error}
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
          textareaRef={textareaRef}
          onTextAreaSelect={handleTextAreaSelect}
        />
        <PostFormControls
          isSubmitting={isSubmitting}
          showDiscard={true}
          onDiscard={() => setShowCancelModal(true)}
          onSubmitText="Create Post"
        />
      </form>

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

      <Modal
        isOpen={showCancelModal}
        title="Discard Changes"
        message="Are you sure you want to discard your changes? This action cannot be undone."
        onCancel={() => setShowCancelModal(false)}
        onConfirm={() => {
          clearForm();
          router.push('/admin/');
        }}
        confirmText="Discard"
      />

      {/* Handle navigation away from the page */}
      <UnsavedChangesHandler
        hasUnsavedChanges={hasUnsavedChanges}
        onDiscard={discardChanges}
      />
    </>
  );
}
