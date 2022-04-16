import Router from 'next/router'
import revalidateChanges from '@/lib/revalidate'

export async function publishPost(id: number, published: boolean, featured: boolean, latestPost: boolean): Promise<void> {
  if (featured) {
    await fetch(`/api/publish/${id}?published=${published}&featured=${featured}`, { method: 'PUT',}).then(()=> {
      revalidateChanges(published, latestPost, featured)
    })
  } else {
    await fetch(`/api/publish/${id}?published=${published}`, { method: 'PUT',}).then(()=> {
      revalidateChanges(published, latestPost, featured)
    })
  }
}

export async function editPost(slug: string): Promise<void> {
  await fetch(`/blog/edit/${slug}`, { method: 'PUT' }).then(()=> {
    Router.push(`/blog/edit/${slug}`)
  })
}

export async function deletePost(id: number, slug: string, published: boolean, redirect: string, latestPost: boolean, featured: boolean): Promise<void> {
  await fetch(`/api/post/${id}`, { method: 'DELETE', }).then(()=> {
    Router.push(`/blog/edit/${slug}?delete`, undefined, { shallow: true }).then(()=> {
      revalidateChanges(published, latestPost, featured)
      if (published) {
        Router.push(redirect)
      }
      else if (!published ) {
        Router.push(redirect)
        Router.reload()
      }
    })
  })
}