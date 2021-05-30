import React, { useState, useEffect, useRef } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import BlogAdmin from '../../components/BlogAdmin'
import { useSession } from 'next-auth/client'

const Draft: React.FC = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')
  const [teaser, setTeaser] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, slug, teaser, content }
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      // Enable Preview Mode by setting the cookies
      if (process.env.SITE_ENVIRONMENT === 'Production') {
        await Router.push(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview?secret=${process.env.NEXT_PUBLIC_PREVIEW_TOKEN}&slug=${slug}`
        )
      } else {
        await Router.push(
          `/blog/${slug}`
        )
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  // Generate Post Slug URL
  function generateSlug(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaaeeeeiiiioooouuuunc------";

    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  let slugUrl = generateSlug(title)

  // Make sure slug input is active after autofill
  // to ensure it submitted by the browser
  const slugField = useRef(null)
  useEffect(() => {
    let interval = setInterval(() => {
      if (slugField.current) {
        setSlug(slugField.current.value)
        //do the same for all autofilled fields
        clearInterval(interval)
      }
    }, 100)
  })

  const [session] = useSession()
  let create = null

  if (session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {

    create = (
      <div className="blog create">

        <nav className="breadcrumbs">
          <Link href="/blog">Blog</Link>
          <span>Create</span>
        </nav>

        <BlogAdmin />

        <div>
          <form onSubmit={submitData}>
            <input
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              value={title}
            />
            <input
              placeholder="URL Slug"
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
              placeholder="Teaser"
              type="text"
              value={teaser}
            />
            <textarea
              cols={50}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={8}
              value={content}
            />

            <div className="formSubmit">
              <button
                className="buttonCompact"
                disabled={!content || !title || !slug || !teaser}
                type="submit">
                Save
              </button>
              <a
                className="buttonCompact"
                onClick={() => Router.push("/blog/drafts")}
              >
                Cancel
              </a>
            </div>

          </form>
        </div>

      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Create – Amir Ardalan</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <div>
        {create}
      </div>
    </>
  )
}

export default Draft