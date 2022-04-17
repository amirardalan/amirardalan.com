import Router from 'next/router'
import revalidateChanges from '@/lib/revalidate'

// Publish/Unpublish Post
export async function publishPost(
    id: number,
    published: boolean,
    featured: boolean,
    latestPost: boolean,
    setFetchStatus: (active: boolean) => void
  ): Promise<void> {

  await fetch(`/api/publish/${id}?published=${published}&featured=${featured}`, { method: 'PUT',}).then(()=> {
    revalidateChanges(published, latestPost, featured, setFetchStatus)
  })
}

// Open Edit Page
export async function editPost(slug: string): Promise<void> {
  await fetch(`/blog/edit/${slug}`, { method: 'PUT' }).then(()=> {
    Router.push(`/blog/edit/${slug}`)
  })
}

// Delete Post
export async function deletePost(
  id: number,
  slug: string,
  published: boolean,
  latestPost: boolean,
  featured: boolean,
  setFetchStatus: (active: boolean) => void
  ): Promise<void> {

  await fetch(`/api/post/${id}`, { method: 'DELETE', }).then(()=> {
    Router.push(`/blog/${slug}?delete`, undefined, { shallow: true }).then(()=> {
      revalidateChanges(published, latestPost, featured, setFetchStatus)
    })
  })
}