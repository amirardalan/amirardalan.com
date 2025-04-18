import { BlogPost } from '@/types/blog';

interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category_id: number | null;
  published: boolean;
  featured?: boolean;
  user_id: number;
  show_updated?: boolean;
}

export async function createPost(postData: PostData) {
  const dataToSend = {
    ...postData,
    featured: postData.featured === true,
  };

  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (errorData?.error?.includes('posts_slug_unique')) {
      throw new Error(
        `A post with the slug "${postData.slug}" already exists. Please try a different title or modify the slug.`
      );
    }

    throw new Error(
      errorData?.error || (await response.text()) || 'Failed to create post'
    );
  }

  return response.json();
}

export async function checkSlugExists(slug: string): Promise<boolean> {
  const response = await fetch(
    `/api/posts/check-slug?slug=${encodeURIComponent(slug)}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.exists;
}

export async function getSuggestedSlugs(baseSlug: string): Promise<string[]> {
  const response = await fetch(
    `/api/posts/suggest-slugs?slug=${encodeURIComponent(baseSlug)}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    return [
      `${baseSlug}-1`,
      `${baseSlug}-2`,
      `${baseSlug}-${new Date().getFullYear()}`,
    ];
  }

  const data = await response.json();
  return data.suggestions;
}

export async function updatePost(
  id: number,
  postData: Partial<BlogPost>
): Promise<any> {
  const finalPostData = {
    ...postData,
    category_id:
      postData.category_id !== null && postData.category_id !== undefined
        ? postData.category_id
        : null,
  };

  const response = await fetch('/api/posts', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      ...finalPostData,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update post');
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
