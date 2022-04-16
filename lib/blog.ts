import Router from 'next/router'
import revalidateChanges from '@/lib/revalidate'

export async function publishPost(id: number, published: boolean, featured: boolean, latestPost: number): Promise<void> {
  await fetch(`/api/publish/${id}?published=${published}?featured=${featured}?latestPost${latestPost}`, {
    method: 'PUT',
  })
  revalidateChanges(latestPost, featured)
}

export async function editPost(slug: string): Promise<void> {
  await fetch(`/blog/edit/${slug}`, {
    method: 'PUT',
  })
  Router.push(`/blog/edit/${slug}`)
}

export async function deletePost(id: number, redirect: string, latestPost: number, featured: boolean): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  revalidateChanges(latestPost, featured)
  if (!redirect.match('/blog/drafts')) {
    Router.push(redirect)
  } else {
    Router.push(redirect)
    Router.reload()
  }
}