import React, { useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import prisma from '@/lib/prisma'
import { useSession } from 'next-auth/client'
import LoadingTriangle from '@/components/LoadingTriangle'
import BlogLayout from '@/components/BlogLayout'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const editPost = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
  })
  return { props: { editPost } }
}

const Edit = (props: any) => {

  const isPublished = props.editPost.published ? true : false
  const id = props.editPost.id
  const editTitle = props.editPost.title
  const editPageTitle = isPublished ? editTitle : editTitle+' (draft)'
  const editContent = props.editPost.content
  const editSlug = props.editPost.slug
  const editTeaser = props.editPost.teaser


  const [title, setTitle] = useState(editTitle)
  const [content, setContent] = useState(editContent)
  const [slug, setSlug] = useState(editSlug)
  const [teaser, setTeaser] = useState(editTeaser)

  const submitData = async (e: React.SyntheticEvent) => {

    e.preventDefault()
    try {
      const body = { id, title, slug, teaser, content }
      await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      // Enable Preview Mode by setting the cookies
      await Router.push(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview?secret=${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}&slug=${slug}`
      )
    } catch (error) {
      console.error(error)
    }
  }

  async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    if (props.editPost.published) {
      Router.push('/blog')
    } else {
      Router.push('/blog/drafts')
    }
  }

  // Handle state and rendering for post deletion confirmation
  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false)
  const confirmOnClick = () => setShowDeletionConfirmation(true)
  const cancelOnClick = () => setShowDeletionConfirmation(false)
  const DeletionConfirmation = () => (
    <div className="controlsConfirm">
      <div className="confirmSelect">
        <span className="confirmLink delete" onClick={() => deletePost(id)}>
          Confirm
        </span>
        <span>•</span>
        <span className="confirmLink close" onClick={cancelOnClick}>
          Cancel
        </span>
      </div>
    </div>
  )

  const [session, loading] = useSession()
  let edit = null

  if (loading) {
    edit = (
      <div className="center">
        <LoadingTriangle />
      </div>
    )
  }

  if (session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {
    edit = (
      <div className="blog admin edit">

        <nav className="breadcrumbs">
          <Link href="/blog">Blog</Link>
          <span>Edit {editPageTitle}</span>
        </nav>

        <div>
          <form onSubmit={submitData}>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
            />
            <input
              onChange={(e) => setSlug(e.target.value)}
              placeholder="URL Slug"
              type="text"
              value={slug}
            />
            <input
              onChange={(e) => setTeaser(e.target.value)}
              placeholder="Teaser"
              type="text"
              value={teaser}
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
            />

            <div className="formSubmit">
              <button
                className="buttonCompact"
                disabled={ !content || !title || !slug || !teaser }
                type="submit">
                Update
              </button>
              <a className="buttonCompact" onClick={() => Router.push(`/blog/${editSlug}`)}>Cancel</a>
              <a className="buttonCompact delete" onClick={confirmOnClick}>Delete</a>
              { showDeletionConfirmation ? <DeletionConfirmation /> : null }
            </div>

          </form>
        </div>

      </div>
    )
  }

  return (
    <BlogLayout>
      <Head>
        <title>Edit {isPublished ? 'Post |' : 'Draft: '} {editPageTitle}</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <div>
        {edit}
      </div>
    </BlogLayout>
  )
}

export default Edit