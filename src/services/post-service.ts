import sanitizeHtml from 'sanitize-html';

interface PostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  user_id: number;
  show_updated?: boolean;
}

function sanitizePostData(postData: Partial<PostData>): PostData {
  if (
    !postData.title ||
    !postData.slug ||
    !postData.content ||
    !postData.user_id
  ) {
    throw new Error(
      'Missing required fields: title, slug, content, or user_id.'
    );
  }

  return {
    title: sanitizeHtml(postData.title, {
      allowedTags: [],
      allowedAttributes: {},
    }),
    slug: sanitizeHtml(postData.slug, {
      allowedTags: [],
      allowedAttributes: {},
    }),
    excerpt: sanitizeHtml(postData.excerpt || '', {
      allowedTags: [],
      allowedAttributes: {},
    }),
    content: sanitizeHtml(postData.content, {
      allowedTags: [],
      allowedAttributes: {},
    }),
    category: sanitizeHtml(postData.category || '', {
      allowedTags: [],
      allowedAttributes: {},
    }),
    published: postData.published === true,
    user_id: postData.user_id,
    show_updated: postData.show_updated === true,
  };
}

export async function createPost(postData: PostData) {
  const sanitizedData = sanitizePostData(postData);

  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sanitizedData),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function updatePost(postId: number, postData: Partial<PostData>) {
  const sanitizedData = sanitizePostData(postData);

  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sanitizedData),
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
