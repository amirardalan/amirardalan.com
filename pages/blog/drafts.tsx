import { useSession, getSession } from 'next-auth/client'
import Link from 'next/link'
import Container from '@/components/Container'
import BlogLayout from '@/components/BlogLayout'
import { admin, breadcrumb } from '@/data/content'
import BlogPost from '@/components/BlogPost'
import sortBlogPosts from '@/utils/sortBlogPosts'

import LoadingTriangle from '@/components/LoadingTriangle'
import prisma from '@/lib/prisma'
import { GetServerSideProps } from 'next'


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
  const [session] = useSession()

  if (session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {
    draftsList = (
    <>
      <nav className="breadcrumbs">
        <Link href="/blog">{breadcrumb.blog}</Link>
        <span>{breadcrumb.drafts}</span>
      </nav>

      <div className="drafts">
        <main>
          {drafts.sort(sortBlogPosts).reverse().map((post) => (
            <div
              key={post.id}
              className="postDraft"
            >
              <BlogPost post={post} />
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
      <BlogLayout>
        <div className="blog admin drafts">
          {draftsList}
        </div>
      </BlogLayout>
    </Container>
  )
}

export default Drafts