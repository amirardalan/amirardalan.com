import React from 'react'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client'
import Link from 'next/link'
import Head from 'next/head'
import BlogLayout from '@/components/BlogLayout'
import { admin, breadcrumb } from '@/data/content'
import BlogPost from '@/components/BlogPost'
import sortBlogPosts from '@/utils/sortBlogPosts'
import LoadingTriangle from '@/components/LoadingTriangle'

import prisma from '@/lib/prisma'

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
    props: { drafts },
  }
}


type Props = {
  drafts: Array<any>
}

const Drafts: React.FC<Props>  = ({ drafts }) => {
  
  let draftsList = null;
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
    <BlogLayout>
      <Head>
        <title>{admin.drafts.meta.title}</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <div className="blog admin drafts">
        {draftsList}
      </div>
    </BlogLayout>
  )
}

export default Drafts