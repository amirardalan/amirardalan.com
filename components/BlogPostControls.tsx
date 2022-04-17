import Router from 'next/router'
import BlogPostDelete from '@/components/BlogPostDelete'
import { publishPost, editPost } from '@/lib/blog'
import { useFetchStatus } from '@/utils/useFetchStatus'
import { admin } from '@/data/content'


const BlogPostControls = ({
  post,
  latestPost,
  publishLabel,
  requiredFields,
  submitClass,
  handleCancel,
  handleDeletion
}) => {

  const isLoading = useFetchStatus()
  const isEditPage = Router.asPath.includes('/blog/edit/')
  const isCreatePage = Router.asPath.includes('/blog/create/')

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
        <button
          className="buttonCompact cancelBtn"
          onClick={handleCancel}
        >
          {admin.controls.cancel}
        </button>
      </div>
    )
  }

  // Slug Page Controls
  else if (!isEditPage && !isCreatePage) {
    return (
      <div className="controlsPost">
        <button
          className="buttonCompact publishBtn"
          onClick={() => {publishPost(post.id, post.published, post.featured, latestPost), console.log('clicked')}}>
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