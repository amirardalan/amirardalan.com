import Router from 'next/router'
import BlogPostDelete from '@/components/BlogPostDelete'
import { publishPost, editPost } from '@/lib/blog'
import { admin } from '@/data/content'
import LoadingSpinner from '@/components/LoadingSpinner'


const BlogPostControls = ({
  post,
  latestPost,
  publishLabel,
  requiredFields,
  submitClass,
  handleCancel,
  handleDeletion,
  setFetchStatus,
  isFetching
}) => {

  const isEditPage = Router.asPath.includes('/blog/edit/')
  const isCreatePage = Router.asPath === '/blog/create'

  const RenderEditButton = () => {
    if (!isCreatePage) {
      return (
        <button
          className="buttonCompact cancelBtn"
          onClick={handleCancel}
        >
          {admin.controls.cancel}
        </button>
      )
    } else return null
  }

  const RenderDeleteButton = () => {
    return (
      <BlogPostDelete
        handleDeletion={handleDeletion}
        cancelText={admin.controls.cancel}
        confirmText={admin.controls.confirm}
        deleteText={admin.controls.delete}
      />
    )
  }

  const RenderLoadingSpinner = () => {
    return isFetching ? <LoadingSpinner/> : null
  }

  // Create & Edit Page Controls
  if (isEditPage || isCreatePage) {
    return (
      <div className={isFetching ? "postControls disabled" : "postControls"}>
        <button
          className={submitClass}
          disabled={requiredFields}
          type="submit"
        >
          {publishLabel}
        </button>
        <RenderEditButton/>
        <RenderDeleteButton/>
        <RenderLoadingSpinner/>
      </div>
    )
  }

  // Slug Page Controls
  else if (!isEditPage && !isCreatePage) {
    return (
      <div className={isFetching ? "postControls disabled" : "postControls"}>
        <button
          className="buttonCompact publishBtn"
          onClick={() => publishPost(post.id, post.published, latestPost, post.featured, setFetchStatus)}>
          {publishLabel}
        </button>
        <button
          className="buttonCompact"
          onClick={() => editPost(post.slug)}>
          {admin.controls.edit}
        </button>
        <RenderDeleteButton/>
        <RenderLoadingSpinner/>
      </div>
    )
  }
}

export default BlogPostControls