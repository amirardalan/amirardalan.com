

import Router from 'next/router'
  
const revalidateChanges = () => {

  const REVALIDATE_SECRET = process.env.NEXT_PUBLIC_REVALIDATE_SECRET
  const revalidatePath = Router.asPath

  fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=${revalidatePath}`).then((data) => {
    if (data.status === 200) {
      fetch(`/api/revalidate?secret=${REVALIDATE_SECRET}&path=/blog`).then((data) => {
        if (data.status === 200) {
          Router.reload()
        }
      }).catch(err => { console.error(err, 'Blog Revalidation failed') })
    }
  }).catch(err => { console.error(err, 'Post Revalidation failed') })
}

export default revalidateChanges