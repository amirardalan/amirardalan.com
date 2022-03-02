import { useState } from 'react'
import { useTheme } from '@emotion/react'
import Image from 'next/image'

import BlogPost from '@/components/BlogPost'
import { categories } from '@/data/categories'
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
  }

  const filteredPosts = search.length > 0 && search[0] === '#'
    ? feed.filter(data => data?.category?.toLowerCase().includes(search.slice(1).toLowerCase()))
    : feed.filter(data => data?.title?.toLowerCase().includes(search.toLowerCase()))

  const RenderPosts: Function = () => {
    if (filteredPosts.length > 0) {
      return (
        filteredPosts.sort(sortBlogPosts).reverse().map((post) => (
          <span key={post.id}>
            <a
              onClick={() => handleCategoryLink(post.category)}
              onKeyPress={() => handleCategoryLink(post.category)}
              className="category"
              aria-label={post.category}
            >
              {post.category}
            </a>
            <BlogPost post={post} />
          </span>
        ))
      )
    } else {
        return (
          <span>
            {blog.search.noresult}
            <a
              onClick={() => setSearch('')}
              onKeyPress={() => setSearch('')}
              tabIndex={0}
            >
              {blog.search.clear}
            </a>
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
            tabIndex={0}
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
          {categories.slice(1).map((category) => (
            <li key={category}>
              <a
                onClick={() => handleCategoryLink(category)}
                onKeyPress={() => handleCategoryLink(category)}
                className="category"
                tabIndex={0}
              >
                {category}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="searchPosts">
        <input
          type="text"
          placeholder={blog.search.placeholder}
          value={search}
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