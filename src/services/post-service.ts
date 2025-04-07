interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  user_id: number;
  show_updated?: boolean;
  csrfToken: string;
}

export async function createPost(postData: PostData, csrfToken: string) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(postData),
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
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-csrf-token': csrfToken,
    },
    body: JSON.stringify(postData),
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
