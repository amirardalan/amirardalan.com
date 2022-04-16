import Router from 'next/router'

const revalidateChanges = (latestPost: number, featured: boolean) => {

  const REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET
  const isEditPage = Router.asPath.includes('/edit')
  const revalidatePath = isEditPage ? Router.asPath.replace('/edit','') : Router.asPath

  Promise.all([
    fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=${revalidatePath}`),
    fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=/blog`),
    fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=/`),
  ])
  .then(() => {
    isEditPage
      ? (Router.push(revalidatePath), Router.reload())
      : Router.reload()
  })
  .catch(error => {
    console.error(error.message)
  })
  
}

export default revalidateChanges