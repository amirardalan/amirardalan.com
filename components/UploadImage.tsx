
import { useState, useRef } from 'react'
import { css } from '@emotion/react'

export default function UploadImage() {

  const styleUploadImage = css({
    marginTop: '1rem'
  })

  const [image, setImage] = useState('')
  const imageInputRef = useRef<HTMLInputElement>()

  const handleUploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]
        setImage(i)
    }
    console.log(e.target.files)
  }

  const handleClearImage = (e) => {
    e.preventDefault()
    imageInputRef.current.value = ""
    setImage('')
  }

  const handleUploadToServer = async (e) => {
    e.preventDefault()
    const body = new FormData()
    body.append("file", image)
    await fetch("/api/upload", {
      method: "POST",
      body
    })
  }

  const UploadButton = () => {
    return (
      <div>
        <button type="submit" onClick={handleUploadToServer}>Upload</button>
        <button onClick={handleClearImage}>Delete</button>
      </div>
    )
  }
  
  return (
    <div css={styleUploadImage}>
      <input ref={imageInputRef} type="file" onChange={()=> handleUploadToClient} />
      <UploadButton/>
    </div>
  )
}