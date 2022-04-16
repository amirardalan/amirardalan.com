import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import Router from 'next/router'

import Link from 'next/link'
import Container from '@/components/Container'
import BlogStyles from '@/components/BlogStyles'
import Dropdown from '@/components/Dropdown'
import Checkbox from '@/components/Checkbox'
import BlogPostDelete from '@/components/BlogPostDelete'

import { admin, breadcrumb } from '@/data/content'
import { categories } from '@/data/categories'
import LoadingTriangle from '@/components/LoadingTriangle'


const Draft = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')
  const [teaser, setTeaser] = useState('')
  const [category, setCategory] = useState(categories[0])

  const [featured, setFeatured] = useState(false)
  const handleSetFeatured = () => {
    setFeatured(!featured)
  }

  const handleDeletion = () => {
    return Router.push("/blog")
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, slug, teaser, content, category, featured }
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push(`/blog/${slug}`)
    } catch (error) {
      console.error(error)
    }
  }

  const generateSlug = (str: string) => {

    str = str.replace(/^\s+|\s+$/g, '')
    str = str.toLowerCase()
    const from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;'
    const to   = 'aaaaaeeeeiiiioooouuuunc------'

    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    }

    str = str.replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    return str
  }

  const slugUrl = generateSlug(title)

  // Ensure slug input is active after autofill
  const slugField = useRef(null)
  useEffect(() => {
    let interval = setInterval(() => {
      if (slugField.current) {
        setSlug(slugField.current.value)
        clearInterval(interval)
      }
    }, 100)
  })

  const { data: session } = useSession()
  let create = null

  if (session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {

    create = (
      <div className="blog admin create">

        <nav className="breadcrumbs">
          <Link href="/blog">{breadcrumb.blog}</Link>
          <span>{breadcrumb.create}</span>
        </nav>

        <div>
          <form onSubmit={submitData}>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder={admin.input.placeholder.title}
              type="text"
              value={title}
            />
            <input
              placeholder={admin.input.placeholder.slug}
              type="text"
              value={slugUrl}
              disabled={true}
            />
            <input
              ref={slugField}
              onInput={() => setSlug(slugUrl)}
              placeholder={slugUrl}
              type="text"
              value={slugUrl}
              hidden={true}
            />
            <input
              onChange={(e) => setTeaser(e.target.value)}
              placeholder={admin.input.placeholder.teaser}
              type="text"
              value={teaser}
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={18}
              value={content}
            />

            <div className="postOptions">
              <Dropdown
                label="Category:"
                value={category}
                handleChange={(e: { target: { value: React.SetStateAction<string> } }) => setCategory(e.target.value)}
                data={categories}
              />
              <div className="checkbox">
                <Checkbox 
                  label='Featured Post'
                  title={admin.controls.checkbox.featured}
                  value={featured}
                  onChange={handleSetFeatured}
                />
              </div>
            </div>

            <div className="formSubmit">
              
              <button
                className="buttonCompact saveBtn"
                disabled={!content || !title || !slug || !teaser || category === '-'}
                type="submit">
                {admin.controls.save}
              </button>

              <BlogPostDelete
                handleDeletion={handleDeletion}
                cancelText={admin.controls.cancel}
                confirmText={admin.controls.confirm}
                deleteText={admin.controls.delete}
              />
            </div>

          </form>
        </div>

      </div>
    )
  } else {
    create = (
      <LoadingTriangle />
    )
  }

  return (
    <Container title={admin.create.meta.title} robots="noindex">
      <BlogStyles>
        <div>
          {create}
        </div>
      </BlogStyles>
    </Container>
  )
}

export default Draft