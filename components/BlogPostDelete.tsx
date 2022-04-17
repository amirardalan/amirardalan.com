import React, { useState } from 'react'

const BlogPostDelete = ({ handleDeletion, cancelText, confirmText, deleteText }) => {

  const [showBlogPostDelete, setShowBlogPostDelete] = useState(false)
  const handleConfirmOnClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setShowBlogPostDelete(true)
  }
  const handleCancelOnClick = () => setShowBlogPostDelete(false)
  const RenderConfirmation = () => (
    <span className="controlsConfirm">
      <a className="confirmLink close" onClick={handleCancelOnClick}>
        {cancelText}
      </a>
      <a className="confirmLink delete" onClick={handleDeletion}>
        {confirmText}
      </a>
    </span>
  )

  return (
    <span>
      <button
        className="buttonCompact deleteBtn"
        onClick={handleConfirmOnClick}>
        {deleteText}
      </button>
      {showBlogPostDelete ? <RenderConfirmation /> : null}
    </span>
  )
}

export default BlogPostDelete