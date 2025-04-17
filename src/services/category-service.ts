interface CategoryData {
  name: string;
  slug: string;
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
    throw new Error(await response.text());
  }

  return response.json();
}

// Delete a category
export async function deleteCategory(categoryId: number) {
  const response = await fetch(`/api/categories/${categoryId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
