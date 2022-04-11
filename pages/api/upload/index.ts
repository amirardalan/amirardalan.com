import { IncomingForm } from 'formidable'
import mv from 'mv'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = { api: { bodyParser: false } }

export default async function handler(_: NextApiRequest, res: NextApiResponse) {

  await new Promise((reject) => {
    const form = new IncomingForm()
    
    form.parse(_, (err, fields, files: any) => {
      if (err) return reject(err)
      const oldPath = files.file.filepath
      const newPath = `./public/images/blog/${files.file.originalFilename}`
      mv(oldPath, newPath, function(err){})
      return res.status(200).json({ fields, files })
    })
  })
}