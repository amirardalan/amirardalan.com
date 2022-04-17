import { useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import { admin, breadcrumb } from '@/data/content'
import BlogPost from '@/components/BlogPost'
import compareID from '@/utils/compareID'

import LoadingTriangle from '@/components/LoadingTriangle'
import prisma from '@/lib/prisma'
import { GetServerSideProps } from 'next'
import { Key } from 'react'


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { drafts: [] } }
  }

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session.user.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  })
  return {
    props: { drafts: JSON.parse(JSON.stringify(drafts)) },
  }
}


const Drafts  = ({ drafts }) => {
  
  const { data: session } = useSession()
  const isLoggedIn = session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL
  let draftsList = null

  const Breadcrumbs = () => {
    return (
      <nav className="breadcrumbs">
        <Link href="/blog">{breadcrumb.blog}</Link>
        <span>{breadcrumb.drafts}</span>
      </nav>
    )
  }

  draftsList = (
    <>
      <Breadcrumbs />
      <div className="drafts">
        <main>
          {drafts.sort(compareID).reverse().map((post: { id: Key, category: String }) => (
            <div
              key={post.id}
              className="postDraft">

              <BlogPost post={post} />

              <div className="draftInfo">
                <div className="label">
                  Draft
                </div>
                <div className="category">
                  {post.category}
                </div>
              </div>

            </div>
          ))}
        </main>
      </div>
    </>
  )

  const RenderDrafts = () => {
    if (isLoggedIn && drafts.length < 1) {
      return (
        <>
          <Breadcrumbs />
          <div className="noDrafts draftNotification">
            {admin.drafts.empty}
            <Link href="/blog/create">
              {admin.drafts.empty2}
            </Link>
            {admin.drafts.empty3}
          </div>
        </>
      )
    } else if (isLoggedIn) {
      return draftsList
    } else {
      return <LoadingTriangle />
    }
  }

  return (
    <Container title={admin.drafts.meta.title} robots="noindex">
      <BlogStyles>
        <div className="blog admin drafts">
          <RenderDrafts/>
        </div>
      </BlogStyles>
    </Container>
  )
}

export default Drafts