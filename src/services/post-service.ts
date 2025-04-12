interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  featured?: boolean;
  user_id: number;
  show_updated?: boolean;
  // Remove csrfToken from the interface as it's passed separately
}

export async function createPost(postData: PostData, csrfToken: string) {
  // Ensure the featured property is explicitly included
  const dataToSend = {
    ...postData,
    featured: postData.featured === true, // Make it explicit boolean
  };

  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function updatePost(
  postId: number,
  postData: Partial<Omit<PostData, 'csrfToken'>>,
  csrfToken: string
) {
  // Ensure the featured property is explicitly included
  const dataToSend = {
    ...postData,
    featured: postData.featured === true, // Make it explicit boolean
  };

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function deletePost(postId: number) {
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
