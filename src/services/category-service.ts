interface CategoryData {
  name: string;
  slug: string;
}

// Create a new category
export async function createCategory(categoryData: CategoryData) {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer ? process.env.NEXT_PUBLIC_URL! : '';
  const url = `${baseUrl}/api/categories`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    let errorMessage = 'Failed to create category';
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData?.error || errorMessage;
    } else {
      errorMessage = (await response.text()) || errorMessage;
    }
    throw new Error(errorMessage);
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
