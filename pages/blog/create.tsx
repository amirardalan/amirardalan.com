import React, { useState, useEffect, useRef } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import LoadingTriangle from '../../components/LoadingTriangle'
import Login from '../../components/Login'
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
      await Router.push('/blog/drafts')
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

  // Post Controls Deletion Confirmation
  const [showConfirmation, setShowConfirmation] = React.useState(false)
  const confirmOnClick = () => setShowConfirmation(true)
  const cancelOnClick = () => setShowConfirmation(false)
  const Confirmation = () => (
    <div className="controlsConfirm">
      Are you sure?
      <div>
        <span
          className="confirmLink"
          onClick={() => Router.push('/blog')}
        >
          Yes
        </span>
        <span
          className="confirmLink"
          onClick={cancelOnClick}
        >
          Cancel
        </span>
      </div>
    </div>
  )

  const [session, loading] = useSession()
  let create = null

  if (loading) {
    create = (
      <div className="center">
        <LoadingTriangle />
      </div>
    )
  }

  if (session && session.user.email == process.env.NEXT_PUBLIC_USER_EMAIL) {
    create = (
      <div className="blog">

        <nav className="breadcrumbs">
          <Link href="/blog">Blog</Link>
          <span>New Post</span>
        </nav>

        <Login />

        <div>
          <form onSubmit={submitData}>
            <h1>New Post (draft)</h1>
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
              <input
                className="buttonCompact"
                disabled={!content || !title || !slug || !teaser}
                type="submit" value="Save Draft"
              />
              <a
                className="buttonCompact delete"
                href="#"
                onClick={confirmOnClick}>
                Delete
              </a>
              { showConfirmation ? <Confirmation /> : null }
            </div>

          </form>
        </div>

      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Amir Ardalan | New Post</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <div>
        {create}
      </div>
    </>
  )
}

export default Draft