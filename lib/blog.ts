import Router from 'next/router'
import revalidateChanges from '@/lib/revalidate'


export async function publishPost(
    id: number,
    published: boolean,
    latestPost: boolean,
    featured: boolean,
    setFetchStatus: boolean
  ): Promise<void> {

  if (featured) {
    await fetch(`/api/publish/${id}?published=${published}&featured=${featured}`, { method: 'PUT',}).then(()=> {
      revalidateChanges(published, latestPost, featured, setFetchStatus)
    })
  } else {
    await fetch(`/api/publish/${id}?published=${published}`, { method: 'PUT',}).then(()=> {
      revalidateChanges(published, latestPost, featured, setFetchStatus)
    })
  }
}

export async function editPost(
  slug: string,
  published: boolean,
  latestPost: boolean,
  featured: boolean,
  setFetchStatus: boolean
): Promise<void> {
  await fetch(`/blog/edit/${slug}`, { method: 'PUT' }).then(()=> {
    revalidateChanges(published, latestPost, featured, setFetchStatus)
  })
}

export async function deletePost(
  id: number,
  slug: string,
  published: boolean,
  redirect: string,
  latestPost: boolean,
  featured: boolean,
  setFetchStatus: (active: boolean) => void
  ): Promise<void> {

  await fetch(`/api/post/${id}`, { method: 'DELETE', }).then(()=> {
    Router.push(`/blog/edit/${slug}?delete`, undefined, { shallow: true }).then(()=> {
      if (published) {
        revalidateChanges(published, latestPost, featured, setFetchStatus)
      }
      else if (!published ) {
        Router.push(redirect)
        Router.reload()
      }
    })
  })
}