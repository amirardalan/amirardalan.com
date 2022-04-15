import { useState } from 'react'
import { publishPost, editPost, deletePost } from '@/lib/blog'


const BlogAdminPostActions = ({props}) => {

  const [showDeletionConfirmation, setShowDeletionConfirmation] = useState(false)
  const confirmOnClick = () => setShowDeletionConfirmation(true)
  const cancelOnClick = () => setShowDeletionConfirmation(false)

  const DeletionConfirmation = () => (
    <div className="controlsConfirm">
      <div className="confirmSelect">
        <span className="confirmLink delete" onClick={() => deletePost(props.post.id, props.redirect)}>
          {props.admin.controls.confirm}
        </span>
        <span>•</span>
        <span className="confirmLink close" onClick={cancelOnClick}>
          {props.admin.controls.cancel}
        </span>
      </div>
    </div>
  )

  return (
    <div className="controlsPost">
      <button
        className="buttonCompact"
        onClick={() => publishPost(props.post.id, props.post.published)}>
        {props.publishLabel}
      </button>
      <button
        className="buttonCompact"
        onClick={() => editPost(props.post.slug)}>
        {props.admin.controls.edit}
      </button>
      <button
        className="buttonCompact delete"
        onClick={confirmOnClick}>
        {props.admin.controls.delete}
      </button>

      { showDeletionConfirmation
      ? <DeletionConfirmation/>
      : null }

    </div>
  )
}

export default BlogAdminPostActions