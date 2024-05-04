import Router from 'next/router';
import revalidateChanges from '@/lib/revalidate';

// Publish/Unpublish Post
export async function publishPost(
  id: number,
  published: boolean,
  featured: boolean,
  latestPost: boolean,
  deleted: boolean,
  setFetchStatus: (active: boolean) => void
): Promise<void> {
  setFetchStatus(true);
  await fetch(
    `/api/publish/${id}?published=${published}&featured=${featured}`,
    { method: 'PUT' }
  ).then(() => {
    revalidateChanges(
      'blog',
      setFetchStatus,
      published,
      latestPost,
      featured,
      deleted
    );
  });
}

// Open Edit Page
export async function editPost(
  slug: string,
  setFetchStatus: (active: boolean) => void
): Promise<void> {
  setFetchStatus(true);
  await fetch(`/blog/edit/${slug}`, { method: 'PUT' }).then(() => {
    Router.push(`/blog/edit/${slug}`);
  });
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

  await fetch(`/api/post/${id}`, { method: 'DELETE' }).then(() => {
    revalidateChanges(
      'blog',
      setFetchStatus,
      published,
      latestPost,
      featured,
      deleted
    );
  });
}

// Like Post
export async function likePost(id: number, liked: boolean): Promise<void> {
  const method = liked ? 'PUT' : 'DELETE';
  await fetch(`/api/likes/update/${id}`, { method });
}
