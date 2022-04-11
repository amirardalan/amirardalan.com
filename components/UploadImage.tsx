
import { useState, useRef } from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'

export default function UploadImage() {

  const styleUploadImage = css({
    borderTop: '1px solid var(--color-accent-neutral)',
    padding: '1rem 0',
    'label > span': {
      marginRight: '.5rem',
      fontSize: 13
    },
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

  const styleUploadedImages = css({
    background: 'var(--color-accent)',
    marginTop: '1rem',
    padding: '1rem',
    fontSize: 12,
    h5: {
      fontFamily: 'var(--font-secondary)',
      fontSize: 17,
      marginBottom: '.5rem'
    }
  })

  const [image, setImage] = useState(null)
  const [createObjectURL, setCreateObjectURL] = useState(null)
  const [imageName, setImageName] = useState(null)
  const imageInputRef = useRef<HTMLInputElement>()

  const handleUploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]
        setImage(i)
        setCreateObjectURL(URL.createObjectURL(i))
    }
    setImageName(e.target.files[0].name)
  }

  const handleClearImage = (e) => {
    e.preventDefault()
    imageInputRef.current.value = ''
    setImage(null)
  }

  const handleClearImageName = () => {
    setImageName(null)
  }

  const handleDeleteImage = (e) => {
    handleClearImage(e)
    handleClearImageName()
  }


  const handleUploadToServer = async (e) => {
    e.preventDefault()
    handleClearImage(e)
    const body = new FormData()
    body.append("file", image)
    await fetch("/api/upload", {
      method: "POST",
      body
    })
  }

  const ConfirmUpload = () => {
    if (image && imageInputRef.current.value !== '') {
      return (
        <div>
          <button className="upload" type="submit" onClick={handleUploadToServer}>
            Confirm Upload
          </button>
          <button className="delete" onClick={handleDeleteImage}>
            Delete
          </button>
          <div css={styleImageWrapper}>
            <Image src={createObjectURL} alt="" layout="fill" />
          </div>
        </div>
      )
    } else if (imageName) {
      return (
        <div css={styleUploadedImages}>
          <h5>Uploaded Image:</h5>
          {`![AltText {priority}{768x432}](/images/blog/${imageName})`}
        </div>
      )
    }
  }
  
  return (
    <div css={styleUploadImage}>
      <label>
        <span>Upload Image:</span>
        <input type="file" onChange={handleUploadToClient} ref={imageInputRef}/>
      </label>
      <ConfirmUpload/>
    </div>
  )
}