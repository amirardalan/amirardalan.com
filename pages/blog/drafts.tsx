import { useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import { admin, breadcrumb } from '@/data/content'
import BlogPost from '@/components/BlogPost'
import sortBlogPosts from '@/utils/sortBlogPosts'

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
  
  let draftsList = null
  const { data: session } = useSession()

  if (session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {
    draftsList = (
    <>
      <nav className="breadcrumbs">
        <Link href="/blog">{breadcrumb.blog}</Link>
        <span>{breadcrumb.drafts}</span>
      </nav>

      <div className="drafts">
        <main>
          {drafts.sort(sortBlogPosts).reverse().map((post: { id: Key, category: String }) => (
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
  } else {
    draftsList = (
      <LoadingTriangle />
    )
  }

  return (
    <Container title={admin.drafts.meta.title} robots="noindex">
      <BlogStyles>
        <div className="blog admin drafts">
          {draftsList}
        </div>
      </BlogStyles>
    </Container>
  )
}

export default Drafts