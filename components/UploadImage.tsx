
import { useState, useRef } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'

export default function UploadImage() {

  const styleUploadImage = css({
    marginTop: '1rem',
    '.upload, .delete': {
      margin: '1rem .5rem',
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    '.upload': {
      marginLeft: 0,
      color: 'var(--color-text)',
      '&:after': {
        paddingLeft: '.5rem',
        content: '"•"'
      }
    },
    '.delete': {
      margin: 0,
      color: 'var(--color-warning)',
    }
  })

  const styleImageWrapper = css({
    width: 768,
    height: 432,
    position: 'relative'
  })

  const [image, setImage] = useState(null)
  const [createObjectURL, setCreateObjectURL] = useState(null)
  const imageInputRef = useRef<HTMLInputElement>()

  const handleUploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]
        setImage(i)
        setCreateObjectURL(URL.createObjectURL(i))
    }
  }

  const handleClearImage = () => {
    imageInputRef.current.value = ''
    setImage(null)
  }

  const handleUploadToServer = async (e) => {
    e.preventDefault()
    handleClearImage()
    const body = new FormData()
    body.append("file", image)
    await fetch("/api/upload", {
      method: "POST",
      body
    })
  }

  const ConfirmUpload = () => {
    return (
      image ? <div>
        <button className="upload" type="submit" onClick={handleUploadToServer}>
          Confirm Upload
        </button>
        <button className="delete" onClick={handleClearImage}>
          Delete
        </button>
        <div css={styleImageWrapper}>
          <Image src={createObjectURL} alt="" layout="fill" />
        </div>
      </div>
      : null
    )
  }
  
  return (
    <div css={styleUploadImage}>
      <input ref={imageInputRef} type="file" onChange={handleUploadToClient} />
      <ConfirmUpload/>
    </div>
  )
}