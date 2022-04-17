import Router from 'next/router'

const revalidateChanges = (published: boolean, latestPost: boolean, featured: boolean, setFetchStatus: any) => {

  const REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET
  const isEditPage = Router.asPath.includes('/blog/edit/')
  const isDeleted = Router.asPath.includes('?delete')
  const revalidatePath = isEditPage ? Router.asPath.replace('/edit','') : Router.asPath

  const post = fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=${revalidatePath}`)
  const blog = published ? fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=/blog`) : Promise.resolve()
  const home = featured || latestPost ? fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=/`) : Promise.resolve()

  setFetchStatus(true)

  Promise.all([ post, blog, home ])
    .then(() => {
      // Deleted Posts
      if (isDeleted && published) {
        Router.push('/blog')
        return
      }
      else if (isDeleted && !published) {
        Router.push('/blog/drafts')
        return
      }
      // All other Posts
      Router.push(revalidatePath).then(()=> Router.reload())
    })
    .catch(error => {
      console.error(error.message)
    })
  
}

export default revalidateChanges
