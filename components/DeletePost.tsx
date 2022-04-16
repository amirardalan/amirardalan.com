import React, { useState } from 'react'

const DeletePost = ({ handleDeletion, cancelText, confirmText, deleteText }) => {

  const [showDeletePost, setShowDeletePost] = useState(false)
  const handleConfirmOnClick = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setShowDeletePost(true)
  }
  const handleCancelOnClick = () => setShowDeletePost(false)
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
      {showDeletePost ? <RenderConfirmation /> : null}
    </>
  )
}

export default DeletePost