import {
  Post,
  PostCreateInput,
  PostUpdateInput,
} from '@/lib/services/blog-service';

export const BlogClient = {
  async updatePost(
    postData: PostUpdateInput
  ): Promise<{ post: Post | null; error: string | null }> {
    try {
      const response = await fetch('/api/blog/post/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { post: null, error: data.message || 'Failed to update post' };
      }

      return { post: data.post, error: null };
    } catch (err) {
      return { post: null, error: (err as Error).message };
    }
  },

  async createPost(
    postData: PostCreateInput
  ): Promise<{ post: Post | null; error: string | null }> {
    try {
      const response = await fetch('/api/blog/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (!response.ok) {
        return { post: null, error: data.message || 'Failed to create post' };
      }

      return { post: data.post, error: null };
    } catch (err) {
      return { post: null, error: (err as Error).message };
    }
  },

  async deletePost(
    id: string,
    userId: string
  ): Promise<{ success: boolean; error: string | null }> {
    try {
      const response = await fetch(`/api/blog/post/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Failed to delete post',
        };
      }

      return { success: true, error: null };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    }
  },

  async revalidatePost(slug: string): Promise<boolean> {
    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-token': process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || '',
        },
        body: JSON.stringify({ tag: `post-${slug}` }),
      });

      return response.ok;
    } catch (err) {
      console.error('Revalidation error:', err);
      return false;
    }
  },

  async revalidateBlogIndex(): Promise<boolean> {
    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-revalidate-token': process.env.NEXT_PUBLIC_REVALIDATE_TOKEN || '',
        },
        body: JSON.stringify({ tag: 'blog-index' }),
      });

      return response.ok;
    } catch (err) {
      console.error('Revalidation error:', err);
      return false;
    }
  },
};
