import { useState } from 'react'
import { useTheme, css } from '@emotion/react'
import Image from 'next/image'

import BlogStats from '@/components/BlogStats'
import BlogPost from '@/components/BlogPost'
import { blog } from '@/data/content'
import sortBlogPosts from '@/utils/sortBlogPosts'


const BlogPostFilter = ({ feed }) => {

  const styleBlogCategoryNav = css({
    overflow: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    whiteSpace: 'nowrap',
    minHeight: 30,
    li :{
      display: 'inline',
      margin: '0 1.5rem 0 0',
    },
    '&::-webkit-scrollbar': {
      display: 'none'
    },
    '@media (max-width: 768px)': {
      minHeight: 32,
    }
  })

  const styleSearchPosts = css({
    display: 'flex',
    position: 'relative',
    caretColor: 'var(--color-neutral)',
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
      width: 25,
      height: 25,
      top: 16,
      right: 8,
      cursor: 'pointer',
    },
  })

  const theme: any = useTheme()

  const [search, setSearch] = useState('')

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const handleCategoryLink = (category: string) => {
    setSearch('#'+category)
    scrollToTop()
  }

  const handleClearFilters = () => {
    setSearch('')
    scrollToTop()
  }

  const activeCategories: Array<string> = Array.from(new Set(feed.map((post: Record<string, object>) => {
    return post.category
  })))

  const searchResults = (search: String, feed: Array<object>) => {
    const categorySearch = search[0] === '#'
    const categoryMatch = activeCategories.indexOf(search.slice(1).split(' ')[0]) > -1
  
    // if #, search categories
    if (categorySearch) {
      // if category matches categories, search titles with category
      if (categoryMatch) {
        return feed.filter((data: { category: string, title: string }) => 
          data?.category?.toLowerCase().includes(search.slice(1).toLowerCase().split(' ')[0]) && 
          data?.title?.toLowerCase().includes(search.replace(/#[a-z]+/, '').trim().toLowerCase()))
      }
      return feed.filter((data: { category: string }) => 
        data?.category?.toLowerCase().includes(search.slice(1).toLowerCase()))
    }
    // if no #, just search titles
    return feed.filter((data: { title: string }) => 
      data?.title?.toLowerCase().includes(search.toLowerCase()))
  }

  const filteredPosts = searchResults(search, feed)

  const RenderPosts: Function = () => {
    if (filteredPosts.length > 0) {
      return (
        filteredPosts.sort(sortBlogPosts).reverse().map((post: Record<string, string>) => (
          <div className="publishedPosts" key={post.id}>
            <button
              onClick={() => handleCategoryLink(post.category)}
              onKeyPress={() => handleCategoryLink(post.category)}
              className="category"
              aria-label={post.category}
            >
              {post.category}
            </button>
            <BlogPost post={post} />
          </div>
        ))
      )
    } else {
        return (
          <span>
            {blog.search.noresult}{' '}
            {feed.length > 0 ?
            <button
              onClick={() => setSearch('')}
              onKeyPress={() => setSearch('')}
              aria-label={blog.search.clear}
            >
              <CloseIcon width={12} height={12}/>
              {' '+blog.search.clear}
            </button>
            : null}
          </span>
        )
    }
  }

  const CloseIcon: Function = ({width, height}) => {
    return (
      <Image
        src={theme.icons.close}
        width={width}
        height={height}
        priority
        alt={blog.search.clear}
        aria-label={blog.search.clear}
        draggable={false}
      />
    )
  }

  const SearchIcon: Function = () => {
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
            onKeyPress={() => setSearch('')}
            className="clearSearch"
          >
            <CloseIcon width={25} height={25} />
          </button>
        )
    }
  }

  const ClearFilters: Function = () => {
    if (search[0] === '#' && filteredPosts.length > 0) {
      return (
        <button
          onClick={() => handleClearFilters()}
          onKeyPress={() => handleClearFilters()}
          aria-label="Clear Filter">
          <CloseIcon width={12} height={12}/>
          <span>{' '+blog.search.clearFilter}</span>
        </button>
      )
    } else {
      return null
    }
  }

  return (
    <>
      <BlogStats feed={feed} activeCategories={activeCategories} />
      <nav css={styleBlogCategoryNav}>
        <ul>
          <li>
            <button
              onClick={() => setSearch('')}
              onKeyPress={() => setSearch('')}
              className={search === '' ? "category all active" : "category all"}
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
                className={search.split(' ')[0] === '#'+category ? "category active" : "category"}
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
        <SearchIcon />
      </div>
      <div className="post">
        <RenderPosts />
        <ClearFilters />
      </div>
    </>
  )
}

export default BlogPostFilter