import { useState } from 'react'
import { useTheme, css } from '@emotion/react'
import Image from 'next/image'

import BlogPost from '@/components/BlogPost'
import { blog } from '@/data/content'
import sortBlogPosts from '@/utils/sortBlogPosts'


const BlogPostFilter = ({ feed }) => {

  const styleBlogCategoryNav = css({
    overflow: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    whiteSpace: 'nowrap',
    minHeight: 40,
    li :{
      display: 'inline',
      margin: '0 1.5rem 0 0',
      '&:first-of-type': {
        fontSize: 12,
        color: 'var(--color-gray)',
        '@media(max-width: 768px)': {
          display: 'block',
          marginBottom: '.5rem'
        }
      }
    },
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '@media (max-width: 768px)': {
      minHeight: 57,
    }
  })

  const styleSearchPosts = css({
    display: 'flex',
    position: 'relative',
    marginTop: '.5rem',
    caretColor: 'var(--color-gray)',
    '.icon': {
      position: 'absolute',
      top: 16,
      right: 0,
      background: 'var(--color-accent)',
      width: 35,
    },
    '.clearSearch': {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      backgroundImage: 'var(--icon-close)',
      width: 25,
      height: 25,
      top: 16,
      right: 8,
      cursor: 'pointer',
    },
  })

  const theme: any = useTheme()

  const showFeedError = feed.length <= 0
  const FeedNotFound = () => (
    <span>{blog.error.database}</span>
  )
  
  const [search, setSearch] = useState('')

  const handleCategoryLink = (category: string) => {
    setSearch('#'+category)
    window.scrollTo(0, 0)
  }

  const activeCategories: Array<string> = Array.from(new Set(feed.map((post: Record<string, object>) => {
    return post.category
  })))

  const filteredPosts = search.length > 0 && search[0] === '#'
    ? feed.filter((data: { category: string }) => data?.category?.toLowerCase().includes(search.slice(1).toLowerCase()))
    : feed.filter((data: { title: string }) => data?.title?.toLowerCase().includes(search.toLowerCase()))

  const RenderPosts: Function = () => {
    if (filteredPosts.length > 0) {
      return (
        filteredPosts.sort(sortBlogPosts).reverse().map((post: Record<string, string>) => (
          <span key={post.id}>
            <button
              onClick={() => handleCategoryLink(post.category)}
              onKeyPress={() => handleCategoryLink(post.category)}
              className="category"
              aria-label={post.category}
            >
              {post.category}
            </button>
            <BlogPost post={post} />
          </span>
        ))
      )
    } else {
        return (
          <span>
            {blog.search.noresult}{' '}
            <button
              onClick={() => setSearch('')}
              onKeyPress={() => setSearch('')}
              className="clearSearch"
              aria-label={blog.search.clear}
            >
              {blog.search.clear}
            </button>
          </span>
        )
    }
  }

  const SearchIcons: Function = () => {
    if (search.length === 0) {
      return (
        <div className="icon">
          <Image
            src={theme.icons.search}
            height="23"
            width="23"
            priority
            alt={blog.search.placeholder}
            aria-label={blog.search.placeholder}
            draggable={false}
          />
        </div>
      )
    } else {
        return (
          <button
            onClick={() => setSearch('')}
            className="clearSearch"
          >
          <Image
            src={theme.icons.close}
            height="25"
            width="25"
            priority
            alt={blog.search.clear}
            aria-label={blog.search.clear}
            draggable={false}
          />
          </button>
        )
    }
  }

  return (
    <>
      <nav css={styleBlogCategoryNav}>
        <ul>
          <li>
            <h1 className="blogHeading breadcrumbs" aria-label={blog.heading}>
              {blog.heading}
            </h1>
            {' '}Categories:
          </li>
          <li>
            <button
              onClick={() => setSearch('')}
              onKeyPress={() => setSearch('')}
              className={search === '' ? "category active" : "category"}
              aria-label="All"
            >
              All
            </button>
          </li>
          {activeCategories.sort().map((category, index) => (
            <li key={index}>
              <button
                onClick={() => handleCategoryLink(category)}
                onKeyPress={() => handleCategoryLink(category)}
                className={search === '#'+category ? "category active" : "category"}
                aria-label={category}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div css={styleSearchPosts}>
        <input
          type="text"
          placeholder={blog.search.placeholder}
          value={search}
          aria-label={blog.search.placeholder}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcons />
      </div>
      <div>
        {showFeedError
          ? <FeedNotFound />
          : null}
        <div className="post">
          <RenderPosts />
        </div>
      </div>
    </>
  )
}

export default BlogPostFilter