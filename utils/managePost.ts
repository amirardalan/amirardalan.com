import Router from 'next/router'

export async function publishPost(id: number, published: boolean): Promise<void> {
  await fetch(`/api/publish/${id}?published=${published}`, {
    method: 'PUT',
  })
  Router.reload()
}

export async function editPost(slug: string): Promise<void> {
  await fetch(`/blog/edit/${slug}`, {
    method: 'PUT',
  })
  Router.push(`/blog/edit/${slug}`)
}

export async function deletePost(id: number, redirect: string): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  Router.push(redirect)
}