
import { useState } from 'react'

export default function UploadImage() {

  const [image, setImage] = useState(null)

  const handleUploadToClient = (e) => {
    if (e.target.files && e.target.files[0]) {
      const i = e.target.files[0]
        setImage(i)
    }
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
    return image ? <input type="submit" value="uplaod" onClick={handleUploadToServer} /> : null
  }
  
  return (
    <div className="uploadImage">
      <input type="file" onChange={handleUploadToClient} />
      <UploadButton/>
    </div>
  )
}