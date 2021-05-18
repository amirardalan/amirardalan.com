import { useState, useEffect, useRef } from 'react'
import Login from '../components/Login'
import Router from 'next/router'

const Draft: React.FC = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [slug, setSlug] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, slug, content }
      await fetch('/api/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }

  function generateSlug(str) {
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

  let slugUrl = generateSlug(title);

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
  


  return (
    <>
      <Login />
      <div>
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
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
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title || !slug} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push('/blog')}>
            Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          cursor: pointer;
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        input[type='submit']:disabled {
          cursor: default;
          background: red;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </>
  )
}

export default Draft