import Router from 'next/router';
import { revalidateBlog } from '@/lib/revalidate';
import { handlePostRouting } from '@/lib/blog-routing';

// Publish/Unpublish Post
export async function publishPost(
  id: number,
  slug: string,
  published: boolean,
  featured: boolean,
  latestPost: boolean,
  deleted: boolean,
  setFetchStatus: (active: boolean) => void
): Promise<void> {
  setFetchStatus(true);
  const postPath = `/blog/${slug}`;
  const revalidateHome = featured || latestPost;
  try {
    await fetch(
      `/api/publish/${id}?published=${published}&featured=${featured}`,
      { method: 'PUT' }
    ).then(async () => {
      try {
        await revalidateBlog(postPath, revalidateHome);
        await handlePostRouting(postPath, published, deleted);
      } catch (error) {
        console.error('Revalidation failed:', error);
      }
    });
  } catch (error) {
    console.error(error);
  } finally {
    setFetchStatus(false);
  }
}

// Edit Post
export async function editPost(
  slug: string,
  setFetchStatus: (active: boolean) => void
): Promise<void> {
  setFetchStatus(true);
  const postPath = `/blog/edit/${slug}`;
  try {
    await fetch(`/blog/edit/${slug}`, { method: 'PUT' });
    await Router.push(postPath);
  } catch (error) {
    console.error(error);
  } finally {
    setFetchStatus(false);
  }
}

// Delete Post
export async function deletePost(
  id: number,
  published: boolean,
  latestPost: boolean,
  featured: boolean,
  setFetchStatus: (active: boolean) => void
): Promise<void> {
  const deleted = true;
  setFetchStatus(true);
  const postPath = `/blog/${id}`;
  const revalidateHome = featured || latestPost;
  try {
    if (published) {
      await fetch(`/api/post/${id}`, { method: 'DELETE' }).then(async () => {
        try {
          await revalidateBlog(postPath, revalidateHome);
          await handlePostRouting(postPath, published, deleted);
        } catch (error) {
          console.error('Revalidation failed:', error);
        }
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    setFetchStatus(false);
  }
}

// Like Post
export async function likePost(id: number, liked: boolean): Promise<void> {
  const method = liked ? 'PUT' : 'DELETE';
  await fetch(`/api/likes/update/${id}`, { method });
}
