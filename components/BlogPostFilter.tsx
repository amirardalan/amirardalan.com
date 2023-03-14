import { type FC, useState } from 'react';
import { useTheme, css, Theme } from '@emotion/react';
import Image from 'next/image';

import BlogStats from '@/components/BlogStats';
import BlogPost from '@/components/BlogPost';
import CloseButton from '@/components/CloseButton';
import compareID from '@/utils/compareID';

type BlogPostFilterProps = {
  blog: {
    search: {
      noresult: string;
      placeholder: string;
      clearFilter: string;
      clear: string;
    };
  };
  feed: object[];
};

type PostProps = {
  id: number;
  category: string;
  publishedAt: Date;
  content: string;
  slug: string;
  title: string;
  teaser: string;
};

const BlogPostFilter: FC<BlogPostFilterProps> = ({ blog, feed }) => {
  const styleBlogCategoryNav = css({
    overflow: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    whiteSpace: 'nowrap',
    minHeight: 32,
    li: {
      display: 'inline',
      marginRight: '1.8rem',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '@media (max-width: 768px)': {
      minHeight: 32,
      li: {
        marginRight: '1.2rem',
      },
    },
  });

  const styleSearchPosts = css({
    display: 'flex',
    position: 'relative',
    caretColor: 'var(--color-gray)',
    input: {
      fontSize: 15,
      marginBottom: 0,
    },
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
      width: 23,
      height: 23,
      top: 16,
      right: 8,
      cursor: 'pointer',
    },
  });

  const theme: Theme = useTheme();

  const [search, setSearch] = useState('');

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleCategoryLink = (category: string) => {
    setSearch('#' + category);
    scrollToTop();
  };

  const handleClearFilters = () => {
    setSearch('');
    scrollToTop();
  };

  interface CategoryItem {
    category: string;
  }

  const activeCategories = Array.from(
    new Set(
      feed.map((post: CategoryItem) => {
        return post.category;
      })
    )
  );

  const searchResults = (search: string, feed: object[]) => {
    const categorySearch = search[0] === '#';
    const categoryMatch =
      activeCategories.indexOf(search.slice(1).split(' ')[0]) > -1;

    if (categorySearch) {
      if (categoryMatch) {
        return feed.filter(
          (data: { category: string; title: string }) =>
            data?.category
              ?.toLowerCase()
              .includes(search.slice(1).toLowerCase().split(' ')[0]) &&
            data?.title?.toLowerCase().includes(
              search
                .replace(/#[a-z]+/, '')
                .trim()
                .toLowerCase()
            )
        );
      }
      return feed.filter((data: { category: string }) =>
        data?.category?.toLowerCase().includes(search.slice(1).toLowerCase())
      );
    }
    return feed.filter((data: { title: string }) =>
      data?.title?.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredPosts = searchResults(search, feed);

  const RenderPosts: Function = () => {
    if (filteredPosts.length > 0) {
      return filteredPosts
        .sort(compareID)
        .reverse()
        .map((post: PostProps) => (
          <article className="publishedPost" key={post.id}>
            <button
              onClick={() => handleCategoryLink(post.category)}
              onKeyDown={() => handleCategoryLink(post.category)}
              className="category"
              aria-label={post.category}
            >
              {post.category}
            </button>
            <BlogPost post={post} />
          </article>
        ));
    } else {
      return (
        <span>
          {blog.search?.noresult}{' '}
          {feed.length > 0 ? (
            <button
              onClick={() => setSearch('')}
              onKeyDown={() => setSearch('')}
              aria-label={blog.search.clear}
            >
              <CloseButton width={12} height={12} />
              {' ' + blog.search.clear}
            </button>
          ) : null}
        </span>
      );
    }
  };

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
      );
    } else {
      return (
        <button
          onClick={() => setSearch('')}
          onKeyDown={() => setSearch('')}
          className="clearSearch"
        >
          <CloseButton width={25} height={25} />
        </button>
      );
    }
  };

  const ClearFilters: Function = () => {
    if (search[0] === '#' && filteredPosts.length > 0) {
      return (
        <button
          onClick={() => handleClearFilters()}
          onKeyDown={() => handleClearFilters()}
          aria-label="Clear Filter"
        >
          <CloseButton width={12} height={12} />
          <span>{' ' + blog.search.clearFilter}</span>
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <BlogStats
        feed={feed}
        activeCategories={activeCategories}
        filteredPosts={filteredPosts}
      />
      <nav css={styleBlogCategoryNav}>
        <ul>
          <li>
            <button
              onClick={() => setSearch('')}
              onKeyDown={() => setSearch('')}
              className={search === '' ? 'category all active' : 'category all'}
              aria-label="All"
            >
              All
            </button>
          </li>
          {activeCategories.sort().map((category, index) => (
            <li key={index}>
              <button
                onClick={() => handleCategoryLink(category)}
                onKeyDown={() => handleCategoryLink(category)}
                className={
                  search.split(' ')[0] === '#' + category
                    ? 'category active'
                    : 'category'
                }
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
  );
};

export default BlogPostFilter;
