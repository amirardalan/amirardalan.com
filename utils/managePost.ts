import Router from 'next/router'
import revalidateChanges from '@/utils/revalidateChanges'

export async function publishPost(id: number, published: boolean): Promise<void> {
  await fetch(`/api/publish/${id}?published=${published}`, {
    method: 'PUT',
  })
  revalidateChanges()
}

export async function editPost(slug: string): Promise<void> {
  await fetch(`/blog/edit/${slug}`, {
    method: 'PUT',
  })
  Router.push(`/blog/edit/${slug}`)
}

export async function publishEdit(slug: string): Promise<void> {
  await fetch(`/blog/edit/${slug}`, {
    method: 'PUT',
  })
  revalidateChanges()
}

export async function deletePost(id: number, redirect: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  revalidateChanges()
  Router.push(redirect)
}