import Router from 'next/router'
import BlogPostDelete from '@/components/BlogPostDelete'
import { publishPost, editPost } from '@/lib/blog'
import { admin } from '@/data/content'


const BlogPostControls = ({
  post,
  latestPost,
  publishLabel,
  requiredFields,
  submitClass,
  handleCancel,
  handleDeletion,
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

  // Create & Edit Page Controls
  if (isEditPage || isCreatePage) {
    return (
      <div className="controlsPost">
        <button
          className={submitClass}
          disabled={requiredFields}
          type="submit"
        >
          {publishLabel}
        </button>
        <RenderEditButton/>
        <BlogPostDelete
          handleDeletion={handleDeletion}
          cancelText={admin.controls.cancel}
          confirmText={admin.controls.confirm}
          deleteText={admin.controls.delete}
        />
      </div>
    )
  }

  // Slug Page Controls
  else if (!isEditPage && !isCreatePage) {
    return (
      <div className="controlsPost">
        <button
          className="buttonCompact publishBtn"
          onClick={() => publishPost(post.id, post.published, post.featured, latestPost)}>
          {publishLabel}
        </button>
        <button
          className="buttonCompact"
          onClick={() => editPost(post.slug)}>
          {admin.controls.edit}
        </button>
        <BlogPostDelete
          handleDeletion={handleDeletion}
          cancelText={admin.controls.cancel}
          confirmText={admin.controls.confirm}
          deleteText={admin.controls.delete}
        />
      </div>
    )
  }
}

export default BlogPostControls