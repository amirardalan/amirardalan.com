'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Category } from '@/types/blog';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  isCategoryInUse,
} from '@/services/category-service';
import { generateSlug } from '@/utils/generate-slug';
import { useToast } from '@/components/ui/ToastContext';
import Modal from '@/components/ui/Modal';
import IconEdit from '@/components/icons/IconEdit';
import IconDelete from '@/components/icons/IconDelete';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [checkingCategory, setCheckingCategory] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [dataVersion, setDataVersion] = useState(1);
  const editFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      if (!isMounted) return;

      try {
        setLoading(true);
        const data = await getCategories();
        if (isMounted) {
          setCategories(data);
          setError(null);
        }
      } catch (err) {
        if (!isMounted) return;

        const errorMessage =
          (err as Error).message || 'Error loading categories';
        setError(errorMessage);
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [dataVersion, showToast]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        editingId !== null &&
        editFormRef.current &&
        !editFormRef.current.contains(event.target as Node)
      ) {
        setEditingId(null);
      }
    }

    if (editingId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingId]);

  const handleAddCategory = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const name = newCategoryName.trim();

      if (!name) return;

      setLoading(true);
      try {
        const slug = generateSlug(name);
        const newCategory = await createCategory({ name, slug });
        setCategories((prev) => [newCategory, ...prev]);
        setNewCategoryName('');
        setShowAddForm(false);
        showToast('Category added successfully', 'success');
      } catch (err) {
        const errorMessage = (err as Error).message || 'Failed to add category';
        setError(errorMessage);
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [
      newCategoryName,
      setCategories,
      setNewCategoryName,
      setShowAddForm,
      setError,
      setLoading,
      showToast,
    ]
  );

  const handleUpdateCategory = useCallback(
    async (id: number) => {
      if (!editName) return;

      setLoading(true);
      try {
        const slug = generateSlug(editName);
        const updatedCategory = await updateCategory(id, {
          name: editName,
          slug,
        });
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === id
              ? {
                  ...cat,
                  name: updatedCategory.name,
                  slug: updatedCategory.slug,
                }
              : cat
          )
        );
        setEditingId(null);
        showToast('Category updated successfully', 'success');
      } catch (err) {
        const errorMessage =
          (err as Error).message || 'Failed to update category';
        setError(errorMessage);
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [editName, setCategories, setEditingId, setError, setLoading, showToast]
  );

  const handleDeleteCategory = useCallback(
    async (id: number) => {
      setIsDeleting(true);
      try {
        await deleteCategory(id);
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
        showToast('Category deleted successfully', 'success');
      } catch (err) {
        const error = err as Error;
        let errorMessage = error.message || 'Failed to delete category';

        if (errorMessage.includes('assigned to one or more posts')) {
          errorMessage = `This category can't be deleted because it's currently being used by one or more posts. Please update those posts first.`;
        }

        setError(errorMessage);
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        setIsDeleting(false);
        setShowDeleteModal(false);
        setCategoryToDelete(null);
      }
    },
    [
      setCategories,
      setError,
      setIsDeleting,
      setShowDeleteModal,
      setCategoryToDelete,
      showToast,
    ]
  );

  const startDeleteConfirmation = useCallback(
    async (category: Category) => {
      setCheckingCategory(true);
      setError(null);

      try {
        const inUse = await isCategoryInUse(category.id);

        if (inUse) {
          const errorMessage = `The category "${category.name}" cannot be deleted because it is assigned to one or more posts. Please update those posts first.`;
          setErrorModalMessage(errorMessage);
          setShowErrorModal(true);
        } else {
          setCategoryToDelete(category);
          setShowDeleteModal(true);
        }
      } catch (err) {
        const errorMessage =
          (err as Error).message || 'Failed to check category usage';
        setError(errorMessage);
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        setCheckingCategory(false);
      }
    },
    [
      setCheckingCategory,
      setError,
      setErrorModalMessage,
      setShowErrorModal,
      setCategoryToDelete,
      setShowDeleteModal,
      showToast,
    ]
  );

  const startEditing = useCallback((category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  }, []);

  const closeErrorModal = useCallback(() => {
    setShowErrorModal(false);
    setErrorModalMessage('');
  }, []);

  const cancelDelete = useCallback(() => {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  }, []);

  const categoriesList = useMemo(() => {
    if (loading && categories.length === 0) {
      return <p className="text-zinc-500">Loading...</p>;
    }

    if (categories.length === 0) {
      return (
        <p className="text-zinc-500">
          No categories have been created yet. Try adding one.
        </p>
      );
    }

    return (
      <ul className="text-dark dark:text-light">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="hover:bg:zinc-200 flex items-center gap-2 border-b border-zinc-200 py-2 dark:border-zinc-800 hover:dark:bg-zinc-900"
          >
            {editingId === cat.id ? (
              <div
                ref={editFormRef}
                className="flex flex-grow items-center gap-2"
              >
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="m-0 box-border h-[24px] min-w-[180px] flex-grow rounded border-none bg-transparent px-0 py-0 leading-normal text-dark outline-none dark:text-light"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleUpdateCategory(cat.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                />
                <button
                  onClick={() => handleUpdateCategory(cat.id)}
                  className="rounded bg-primary px-2 text-xxs uppercase text-dark"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="rounded bg-zinc-300 px-2 text-xxs uppercase dark:bg-zinc-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => startEditing(cat)}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-zinc-500">({cat.slug})</span>
                </div>
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => startEditing(cat)}
                    className="h-6 w-6"
                    title="Edit category"
                  >
                    <IconEdit className="text-zinc-600 duration-200 hover:text-primary" />
                  </button>
                  <button
                    onClick={() => startDeleteConfirmation(cat)}
                    className="h-6 w-6"
                    title="Delete category"
                    disabled={checkingCategory}
                  >
                    <IconDelete className="text-zinc-600 duration-200 hover:text-red-500" />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    );
  }, [
    categories,
    editingId,
    editName,
    loading,
    handleUpdateCategory,
    startEditing,
    startDeleteConfirmation,
    checkingCategory,
  ]);

  return (
    <section className="mt-8">
      {error && (
        <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{error}</div>
      )}

      {showAddForm ? (
        <form onSubmit={handleAddCategory} className="mb-4 flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            required
            className="rounded border border-none bg-transparent px-2 text-dark outline-none dark:text-light"
            disabled={loading}
            autoFocus
            onBlur={() => {
              if (!newCategoryName.trim()) {
                setShowAddForm(false);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setShowAddForm(false);
                setNewCategoryName('');
              }
            }}
          />
          <button
            type="submit"
            className="rounded bg-primary px-3 py-1 text-light disabled:bg-blue-300 dark:text-dark"
            disabled={loading}
          >
            Add
          </button>
          <button
            type="button"
            className="rounded bg-zinc-300 px-3 py-1 dark:bg-zinc-700"
            onClick={() => {
              setShowAddForm(false);
              setNewCategoryName('');
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <div className="mb-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="cursor-pointer border-b border-primary text-xs font-medium uppercase text-primary"
          >
            Create New Category +
          </button>
        </div>
      )}
      <div className="min-fit-content">{categoriesList}</div>

      <Modal
        isOpen={showDeleteModal}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the category "${categoryToDelete?.name}"? This action cannot be undone.`}
        onCancel={cancelDelete}
        onConfirm={() =>
          categoryToDelete && handleDeleteCategory(categoryToDelete.id)
        }
        confirmText={isDeleting ? 'Deleting...' : 'Delete Category'}
        confirmDisabled={isDeleting}
      />

      <Modal
        isOpen={showErrorModal}
        title="Cannot Delete Category"
        message={errorModalMessage}
        onCancel={closeErrorModal}
        confirmText="Close"
        buttons={'confirm'}
        onConfirm={closeErrorModal}
      />
    </section>
  );
}
