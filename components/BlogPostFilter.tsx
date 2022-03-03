import { useState } from 'react'
import { useTheme } from '@emotion/react'
import Image from 'next/image'

import BlogPost from '@/components/BlogPost'
import { blog } from '@/data/content'
import sortBlogPosts from '@/utils/sortBlogPosts'


const BlogPostFilter = ({ feed }) => {

  const theme: any = useTheme()

  const showFeedError = feed.length <= 0
  const FeedNotFound = () => (
    <span>{blog.error.database}</span>
  )
  
  const [search, setSearch] = useState('')

  const handleCategoryLink = (category) => {
    setSearch('#'+category)
    window.scrollTo(0, 0)
  }

  const activeCategories: Array<string> = Array.from(new Set(feed.map((post) => {
    return post.category
  })))

  const filteredPosts = search.length > 0 && search[0] === '#'
    ? feed.filter(data => data?.category?.toLowerCase().includes(search.slice(1).toLowerCase()))
    : feed.filter(data => data?.title?.toLowerCase().includes(search.toLowerCase()))

  const RenderPosts: Function = () => {
    if (filteredPosts.length > 0) {
      return (
        filteredPosts.sort(sortBlogPosts).reverse().map((post) => (
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
            ✕
          </button>
        )
    }
  }

  return (
    <>
      <nav className="blogCategoryNav">
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
      
      <div className="searchPosts">
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