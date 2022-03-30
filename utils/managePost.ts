import Router from 'next/router'

export async function publishPost(slug: String, published: boolean, redirect: string): Promise<void> {
  await fetch(`/api/publish/${slug}?published=${published}`, {
    method: 'PUT',
  })
  await Router.push(redirect)
}

export async function editPost(slug: string): Promise<void> {
  await fetch(`/blog/edit/${slug}`, {
    method: 'PUT',
  })
  await Router.push(`/blog/edit/${slug}`)
}

export async function deletePost(id: number, redirect: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push(redirect)
}