import { useState } from 'react'
import { publishPost, editPost, deletePost } from '@/lib/blog'


const BlogAdminPostActions = ({ post, admin, redirect, publishLabel, latestPost }) => {

  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false)
  const confirmOnClick = () => setShowDeletionConfirmation(true)
  const cancelOnClick = () => setShowDeletionConfirmation(false)

  const DeletionConfirmation = () => (
    <span className="controlsConfirm">
      <div className="confirmSelect">
        <span className="confirmLink close" onClick={cancelOnClick}>
          {admin.controls.cancel}
        </span>
        <span>•</span>
        <span className="confirmLink delete" onClick={() => deletePost(post.id, redirect, latestPost, post.featured)}>
          {admin.controls.confirm}
        </span>
      </div>
    </span>
  )

  return (
    <div className="controlsPost">
      <button
        className="buttonCompact"
        onClick={() => publishPost(post.id, post.published, post.featured, latestPost)}>
        {publishLabel}
      </button>
      <button
        className="buttonCompact"
        onClick={() => editPost(post.slug)}>
        {admin.controls.edit}
      </button>
      <button
        className="buttonCompact delete"
        onClick={confirmOnClick}>
        {admin.controls.delete}
      </button>

      { showDeletionConfirmation
      ? <DeletionConfirmation/>
      : null }

    </div>
  )
}

export default BlogAdminPostActions