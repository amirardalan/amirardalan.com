import { Category } from '@/types/blog';

interface CategoryData {
  name: string;
  slug: string;
}

// Client-side API calls to interact with categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/categories');

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; // Re-throw to let the component handle the error
  }
}

// Create a new category
export async function createCategory(categoryData: CategoryData) {
  const response = await fetch('/api/categories', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error || (await response.text()) || 'Failed to create category'
    );
  }

  return response.json();
}

// Update an existing category
export async function updateCategory(
  categoryId: number,
  categoryData: Partial<CategoryData>
) {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.error || (await response.text()) || 'Failed to update category'
    );
  }

  return response.json();
}

// Delete a category
export async function deleteCategory(categoryId: number) {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    // Pass along the specific error message from the server
    if (errorData?.error) {
      throw new Error(errorData.error);
    }

    throw new Error('Failed to delete category');
  }

  return response.json();
}

// Check if a category is used by posts
export async function isCategoryInUse(categoryId: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/categories/${categoryId}/check-usage`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Failed to check category usage');
    }

    const data = await response.json();
    return data.inUse;
  } catch (error) {
    console.error('Error checking category usage:', error);
    throw error;
  }
}
