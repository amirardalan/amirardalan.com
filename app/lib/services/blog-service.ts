import { createClient } from '@/utils/supabase/server';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  published: boolean;
  authorId: string;
  publishedAt: string;
  editedAt: string;
  author: {
    name: string;
  };
}

export interface PostCreateInput {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  userId: string;
  published: boolean;
}

export interface PostUpdateInput extends PostCreateInput {
  id: string;
}

export const BlogService = {
  async getPostBySlug(slug: string): Promise<Post | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('post')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Post;
  },

  async getPostById(id: string): Promise<Post | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('post')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Post;
  },

  async getDrafts(): Promise<Post[]> {
    const supabase = await createClient();
    const { data } = await supabase
      .from('post')
      .select('id, title, slug')
      .eq('published', false)
      .order('editedAt', { ascending: false });

    return (data as Post[]) || [];
  },

  async getPublishedPosts(): Promise<Post[]> {
    const supabase = await createClient();
    const { data } = await supabase
      .from('post')
      .select('id, publishedAt, editedAt, title, excerpt, slug, content')
      .eq('published', true)
      .order('publishedAt', { ascending: false });

    return (data as Post[]) || [];
  },

  async createPost(
    postData: PostCreateInput
  ): Promise<{ post: Post | null; error: string | null }> {
    const supabase = await createClient();

    const now = new Date().toISOString();
    const newPost = {
      ...postData,
      authorId: postData.userId,
      editedAt: now,
      publishedAt: postData.published ? now : null,
    };

    const { data, error } = await supabase
      .from('post')
      .insert([newPost])
      .select()
      .single();

    if (error) {
      return { post: null, error: error.message };
    }

    return { post: data as Post, error: null };
  },

  async updatePost(
    postData: PostUpdateInput
  ): Promise<{ post: Post | null; error: string | null }> {
    const supabase = await createClient();

    // Check if post exists and user is authorized
    const { data: existingPost } = await supabase
      .from('post')
      .select('authorId, published, publishedAt')
      .eq('id', postData.id)
      .single();

    if (!existingPost) {
      return { post: null, error: 'Post not found' };
    }

    if (existingPost.authorId !== postData.userId) {
      return { post: null, error: 'Unauthorized' };
    }

    const now = new Date().toISOString();
    const updates = {
      ...postData,
      authorId: existingPost.authorId,
      editedAt: now,
      // Only set publishedAt if transitioning from unpublished to published
      publishedAt:
        postData.published && !existingPost.published
          ? now
          : existingPost.publishedAt,
    };

    const { data, error } = await supabase
      .from('post')
      .update(updates)
      .eq('id', postData.id)
      .select()
      .single();

    if (error) {
      return { post: null, error: error.message };
    }

    return { post: data as Post, error: null };
  },

  async deletePost(
    id: string,
    userId: string
  ): Promise<{ success: boolean; error: string | null }> {
    const supabase = await createClient();

    // Fetch the post to verify it exists and check authorization
    const { data: post, error: fetchError } = await supabase
      .from('post')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !post) {
      return { success: false, error: 'Post not found' };
    }

    // Verify the user is the author
    if (post.authorId !== userId) {
      return { success: false, error: 'Unauthorized' };
    }

    // Only allow deletion of draft posts
    if (post.published) {
      return { success: false, error: 'Cannot delete published posts' };
    }

    // Delete the post
    const { error: deleteError } = await supabase
      .from('post')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return { success: false, error: deleteError.message };
    }

    return { success: true, error: null };
  },

  async verifyAuthor(postId: string, userId: string): Promise<boolean> {
    const supabase = await createClient();
    const { data } = await supabase
      .from('post')
      .select('authorId')
      .eq('id', postId)
      .single();

    return data?.authorId === userId;
  },

  async getPostBySlugWithAuthor(slug: string): Promise<Post | null> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('post')
      .select('*, author:users(name)')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Post;
  },
};
