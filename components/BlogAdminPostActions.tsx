import BlogPostDelete from '@/components/BlogPostDelete'
import { publishPost, editPost, deletePost } from '@/lib/blog'


const BlogAdminPostActions = ({ post, slug, published, redirect, publishLabel, latestPost, admin }) => {

 const handleDeletion = () => {
    return deletePost(post.id, slug, published, redirect, latestPost, post.featured)
 }

  return (
    <div className="controlsPost">
      <button
        className="buttonCompact"
        onClick={() => publishPost(post.id, published, post.featured, latestPost)}>
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

export default BlogAdminPostActions