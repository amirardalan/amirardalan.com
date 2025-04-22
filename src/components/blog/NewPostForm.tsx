'use client';

import { useState, useRef, useEffect, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/services/post-service';
import { getCategories } from '@/services/category-service';
import { useToast } from '@/components/ui/ToastContext';
import { useImageInsertion } from '@/hooks/useImageInsertion';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { Category } from '@/types/blog';

import PostFormFields from '@/components/blog/PostFormFields';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import MediaGallery from '@/components/blog/MediaGallery';
import PostFormControls from '@/components/blog/PostFormControls';

// Define state shape for the form fields
interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: number | null;
  published: boolean;
  featured: boolean;
}

// Define action types for the reducer
type FormAction =
  | { type: 'UPDATE_FIELD'; field: keyof FormState; value: any }
  | { type: 'CLEAR_FORM' };

// Initial state for the form
const initialState: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  categoryId: null,
  published: false,
  featured: false,
};

// Reducer function to manage form state
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'CLEAR_FORM':
      return initialState;
    default:
      return state;
  }
}

interface NewPostFormProps {
  userId: number;
  categories?: Category[];
}

export default function NewPostForm({
  userId,
  categories: propCategories = [],
}: NewPostFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { title, slug, excerpt, content, categoryId, published, featured } =
    state;

  const [categories, setCategories] = useState<Category[]>(propCategories);
  const [categoriesLoading, setCategoriesLoading] = useState(
    !propCategories.length
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(
    null!
  ) as React.RefObject<HTMLInputElement>;

  useEffect(() => {
    if (!propCategories.length && categoriesLoading) {
      const fetchCategoriesOnce = async () => {
        try {
          const data = await getCategories();
          setCategories(data);
        } catch (err) {
          console.error('Failed to fetch categories:', err);
        } finally {
          setCategoriesLoading(false);
        }
      };

      fetchCategoriesOnce();
    }
  }, [propCategories, categoriesLoading]);

  // Track form changes using reducer state
  useEffect(() => {
    const formChanged =
      state.title !== initialState.title ||
      state.slug !== initialState.slug ||
      state.excerpt !== initialState.excerpt ||
      state.content !== initialState.content ||
      state.categoryId !== initialState.categoryId ||
      state.featured !== initialState.featured ||
      state.published !== initialState.published;

    setHasUnsavedChanges(formChanged);
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...state,
        category_id: state.categoryId,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await createPost(payload);

      showToast('Post created successfully!', 'success');
      setHasUnsavedChanges(false);
      router.push(
        state.published ? `/blog/${state.slug}` : '/admin/blog/drafts'
      );
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = useCallback(() => {
    dispatch({ type: 'CLEAR_FORM' });
  }, []);

  const discardChanges = useCallback(() => {
    clearForm();
  }, [clearForm]);

  const {
    showUnsavedChangesModal,
    handleConfirmNavigation,
    handleCancelNavigation,
  } = useUnsavedChanges({
    hasUnsavedChanges,
    onDiscard: discardChanges,
  });

  // Update useImageInsertion to use dispatch
  const {
    textareaRef,
    cursorPosition,
    handleTextAreaSelect,
    insertImageAtCursor,
  } = useImageInsertion(
    content,
    (newContent) =>
      dispatch({ type: 'UPDATE_FIELD', field: 'content', value: newContent }),
    () => setShowGallery(false)
  );

  // Helper function to create dispatchers for specific fields
  const createFieldDispatcher = useCallback(
    (field: keyof FormState) => (value: any) => {
      dispatch({ type: 'UPDATE_FIELD', field, value });
    },
    []
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="font-mono text-dark dark:text-light"
      >
        <PostFormFields
          title={title}
          setTitle={createFieldDispatcher('title')}
          slug={slug}
          setSlug={createFieldDispatcher('slug')}
          excerpt={excerpt}
          setExcerpt={createFieldDispatcher('excerpt')}
          content={content}
          setContent={createFieldDispatcher('content')}
          published={published}
          setPublished={createFieldDispatcher('published')}
          featured={featured}
          setFeatured={createFieldDispatcher('featured')}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
          textareaRef={textareaRef}
          onTextAreaSelect={handleTextAreaSelect}
          categories={categories}
          categoryId={categoryId}
          setCategoryId={createFieldDispatcher('categoryId')}
          categoriesLoading={categoriesLoading}
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

      <Modal
        isOpen={showUnsavedChangesModal}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave this page?"
        onCancel={handleCancelNavigation}
        onConfirm={handleConfirmNavigation}
        confirmText="Leave Page"
      />
    </>
  );
}
