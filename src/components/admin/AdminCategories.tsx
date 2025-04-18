'use client';

import { useState, useEffect } from 'react';
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

  // Fetch categories on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        const errorMessage =
          (err as Error).message || 'Error loading categories';
        setError(errorMessage);
        showToast(errorMessage, 'error');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [showToast]);

  async function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;

    if (!name) return;

    setLoading(true);
    try {
      const slug = generateSlug(name);
      const newCategory = await createCategory({ name, slug });
      setCategories((prev) => [newCategory, ...prev]);
      form.reset();
      showToast('Category added successfully', 'success');
    } catch (err) {
      const errorMessage = (err as Error).message || 'Failed to add category';
      setError(errorMessage);
      showToast(errorMessage, 'error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateCategory(id: number) {
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
            ? { ...cat, name: updatedCategory.name, slug: updatedCategory.slug }
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
  }

  async function handleDeleteCategory(id: number) {
    setIsDeleting(true);
    try {
      await deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      showToast('Category deleted successfully', 'success');
    } catch (err) {
      const error = err as Error;
      let errorMessage = error.message || 'Failed to delete category';

      // Check for specific error about category being in use
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
  }

  async function startDeleteConfirmation(category: Category) {
    setCheckingCategory(true);
    setError(null);

    try {
      const inUse = await isCategoryInUse(category.id);

      if (inUse) {
        // Show error in a modal instead of a toast
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
  }

  function closeErrorModal() {
    setShowErrorModal(false);
    setErrorModalMessage('');
  }

  function cancelDelete() {
    setShowDeleteModal(false);
    setCategoryToDelete(null);
  }

  function startEditing(category: Category) {
    setEditingId(category.id);
    setEditName(category.name);
  }

  return (
    <section className="p-8">
      <h2 className="mb-4 text-xl font-bold">Manage Categories</h2>

      {error && (
        <div className="mb-4 rounded bg-red-100 p-2 text-red-700">{error}</div>
      )}

      <form onSubmit={handleAddCategory} className="mb-4 flex gap-2">
        <input
          type="text"
          name="name"
          placeholder="Category name"
          required
          className="rounded border px-2 py-1"
          disabled={loading}
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-3 py-1 text-white disabled:bg-blue-300"
          disabled={loading}
        >
          Add
        </button>
      </form>

      {loading && <p className="text-zinc-500">Loading...</p>}

      {!loading && categories.length === 0 ? (
        <p className="text-zinc-500">
          No categories have been created yet. Try adding one.
        </p>
      ) : (
        <ul className="space-y-3 text-dark dark:text-light">
          {categories.map((cat) => (
            <li key={cat.id} className="flex items-center gap-2">
              {editingId === cat.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="rounded border px-2 py-1"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdateCategory(cat.id)}
                    className="rounded bg-green-600 px-2 py-1 text-xs text-white"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="rounded bg-zinc-300 px-2 py-1 text-xs"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="font-mono">{cat.name}</span>
                  <span className="text-xs text-zinc-500">({cat.slug})</span>
                  <div className="ml-auto flex gap-1">
                    <button
                      onClick={() => startEditing(cat)}
                      className="rounded bg-amber-500 px-2 py-1 text-xs text-white"
                      title="Edit category"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => startDeleteConfirmation(cat)}
                      className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                      title="Delete category"
                      disabled={checkingCategory}
                    >
                      {checkingCategory ? 'Checking...' : 'Delete'}
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

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
