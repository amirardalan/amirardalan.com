import Router from 'next/router'

const revalidateChanges = (published: boolean, latestPost: boolean, featured: boolean) => {

  const REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET
  const isEditPage = Router.asPath.includes('/edit')
  const revalidatePath = isEditPage ? Router.asPath.replace('/edit','') : Router.asPath

  const blog = published ? fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=/blog`) : Promise.resolve()
  const current = published || featured ? fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=${revalidatePath}`) : Promise.resolve()
  const home = featured || latestPost ? fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=/`) : Promise.resolve()

  Promise.all([ current, blog, home ])
  .then(() => {
    isEditPage
      ? Router.push(revalidatePath).then(()=> Router.reload())
      : Router.reload()
  })
  .catch(error => {
    console.error(error.message)
  })
  
}

export default revalidateChanges