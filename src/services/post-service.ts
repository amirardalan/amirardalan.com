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
  csrfToken?: string;
}

// Client-side API calls to interact with posts
export async function createPost(postData: PostData, csrfToken: string) {
  const dataToSend = {
    ...postData,
    featured: postData.featured === true, // Explicit boolean
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
  postData: Partial<PostData>,
  csrfToken: string
) {
  // Ensure the featured property is explicitly included
  const dataToSend = {
    ...postData,
    featured: postData.featured === true, // Explicit boolean
    csrfToken: postData.csrfToken || csrfToken,
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
