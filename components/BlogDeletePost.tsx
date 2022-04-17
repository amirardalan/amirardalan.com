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
      <div className="confirmSelect">
        <span className="confirmLink close" onClick={handleCancelOnClick}>
          {cancelText}
        </span>
        <span>•</span>
        <span className="confirmLink delete" onClick={handleDeletion}>
          {confirmText}
        </span>
      </div>
    </span>
  )

  return (
    <>
      <button
        className="buttonCompact deleteBtn"
        onClick={handleConfirmOnClick}>
        {deleteText}
      </button>
      {showBlogPostDelete ? <RenderConfirmation /> : null}
    </>
  )
}

export default BlogPostDelete