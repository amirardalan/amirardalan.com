import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Router from 'next/router'
import revalidateChanges from '@/utils/revalidateChanges'

import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import Link from 'next/link'
import LoadingTriangle from '@/components/LoadingTriangle'
import Dropdown from '@/components/Dropdown'
import Checkbox from '@/components/Checkbox'

import { admin, breadcrumb } from '@/data/content'
import { categories } from '@/data/categories'
import { GetServerSideProps } from 'next'
import prisma from '@/lib/prisma'


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const editPost = await prisma.post.findFirst({
    where: {
      slug: String(params?.slug),
    },
  })
  return { props: { editPost: JSON.parse(JSON.stringify(editPost)) } }
}

const Edit = ({ editPost }) => {

  const isPublished = editPost?.published
  const id = editPost?.id
  const editTitle = editPost?.title
  const editPageTitle = isPublished ? editTitle : editTitle+' (draft)'
  const editContent = editPost?.content
  const editSlug = editPost?.slug
  const editTeaser = editPost?.teaser
  const editCategory = editPost?.category
  const editEdited = editPost?.showEdited

  const [title, setTitle] = useState(editTitle)
  const [content, setContent] = useState(editContent)
  const [slug, setSlug] = useState(editSlug)
  const [teaser, setTeaser] = useState(editTeaser)
  const [category, setCategory] = useState(editCategory)

  const [showEdited, setShowEdited] = useState(editEdited)
  const handleShowEdited = () => {
    setShowEdited(!showEdited)
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { id, title, slug, teaser, content, category, showEdited }
      await fetch('/api/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push(`/api/preview?secret=${process.env.NEXT_PUBLIC_REVALIDATE_SECRET}&slug=${slug}`)
    } catch (error) {
      console.error(error)
    }
  }

  async function deletePost(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    if (editPost.published) {
      Router.push('/blog')
    } else {
      Router.push('/blog/drafts')
    }
  }

  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false)
  const confirmOnClick = () => setShowDeletionConfirmation(true)
  const cancelOnClick = () => setShowDeletionConfirmation(false)
  const DeletionConfirmation = () => (
    <div className="controlsConfirm">
      <div className="confirmSelect">
        <span className="confirmLink delete" onClick={() => deletePost(id)}>
          {admin.controls.confirm}
        </span>
        <span>•</span>
        <span className="confirmLink close" onClick={cancelOnClick}>
          {admin.controls.cancel}
        </span>
      </div>
    </div>
  )

  const { data: session } = useSession()
  const userHasValidSession = Boolean(session)
  const userHasValidEmail = session?.user?.email === process.env.NEXT_PUBLIC_USER_EMAIL
  let edit = null

  if (!userHasValidSession) {
    return (
      <Container>
        <div>
          <LoadingTriangle />
        </div>
      </Container>
    )
  }

  if (userHasValidSession && userHasValidEmail) {
    edit = (
      <div className="blog admin edit">

        <nav className="breadcrumbs">
          <Link href="/blog">{breadcrumb.blog}</Link>
          <span>{breadcrumb.edit} – {editPageTitle}</span>
        </nav>

        <div>
          <form onSubmit={submitData}>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder={admin.input.placeholder.title}
              type="text"
              value={title}
            />
            <input
              onChange={(e) => setSlug(e.target.value)}
              placeholder={admin.input.placeholder.slug}
              type="text"
              value={slug}
            />
            <input
              onChange={(e) => setTeaser(e.target.value)}
              placeholder={admin.input.placeholder.teaser}
              type="text"
              value={teaser}
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder={admin.input.placeholder.content}
              rows={18}
              value={content}
            />

            <div className="postOptions">
              <Dropdown
                label="Category:"
                value={category}
                handleChange={(e) => setCategory(e.target.value)}
                data={categories}
              />
              <div className="showEditDate">
                <Checkbox 
                  label='Display "Updated" Date'
                  value={showEdited}
                  onChange={handleShowEdited}
                />
              </div>
            </div>

            <div className="formSubmit">
              <button
                className="buttonCompact updateBtn"
                disabled={ !content || !title || !slug || !teaser }
                onClick={revalidateChanges}
                type="submit"
              >
                {admin.controls.update}
              </button>
              <a className="buttonCompact cancelBtn" onClick={() => Router.push(`/blog/${editSlug}`)}>
                {admin.controls.cancel}
              </a>
              <a className="buttonCompact deleteBtn" onClick={confirmOnClick}>
                {admin.controls.delete}
              </a>
              { showDeletionConfirmation ? <DeletionConfirmation /> : null }
            </div>

          </form>
        </div>

      </div>
    )
  }

  return (
    <Container title={admin.edit.meta.title} {...isPublished ? 'Post |' : 'Draft: '} {...editPageTitle} robots="noindex">
      <BlogStyles>
        <div>
          {edit}
        </div>
      </BlogStyles>
    </Container>
  )
}

export default Edit