import { FC, useEffect, useState } from 'react';

import { css } from '@emotion/react';
import useTotalLikes from '@/hooks/useTotalLikes';

import BlogStats from '@/components/BlogStats';
import BlogPost from '@/components/BlogPost';
import CloseIcon from '@/components/CloseIcon';
import compareID from '@/utils/compareID';

import { PostProps } from '@/types/post';
import { BlogStatsTypes } from '@/types/blog';
import { useRouter } from 'next/router';

type BlogPostFilterProps = {
  blog: {
    search: {
      noresult: string;
      placeholder: string;
      clearFilter: string;
      clear: string;
    };
  };
  feed: PostProps[];
  filteredPosts: BlogStatsTypes[];
};

const BlogPostFilter: FC<BlogPostFilterProps> = ({ blog, feed }) => {
  const router = useRouter();

  const styleBlogCategoryNav = css({
    minHeight: 28,
    lineHeight: '1rem',
    overflow: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    whiteSpace: 'nowrap',
    li: {
      display: 'inline',
      marginRight: '1.25rem',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '@media (max-width: 768px)': {
      li: {
        marginRight: '1.2rem',
      },
    },
  });

  const styleSearchPosts = css({
    marginBottom: '4rem',
    display: 'flex',
    position: 'relative',
    caretColor: 'var(--color-gray)',
    '.search': {
      fontFamily: 'var(--font-secondary)',
      color: 'var(--color-text)',
      background: 'transparent',
      border: '1px solid var(--color-accent-lighter)',
      padding: '.6rem',
      outline: 'none',
      '&::placeholder': {
        color: 'var(--color-gray) !important',
        fontFamily: 'var(--font-secondary)',
      },
      '&:focus': {
        outline: 'none',
        borderColor: 'var(--color-primary)',
      },
    },
    '.icon': {
      position: 'absolute',
      top: 18,
      right: 10,
    },
    '.clearSearch': {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      top: 18,
      right: 10,
      cursor: 'pointer',
    },
    '@media (max-width: 768px)': {
      marginBottom: '3rem',
    },
  });

  const styleClearButton = css({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '6rem',
    svg: {
      marginRight: '.5rem',
    },
    '.clearButton': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      fontFamily: 'var(--font-secondary) !important',
      textTransform: 'uppercase',
      fontSize: 14,
      letterSpacing: 1,
      '.searchNoResults': {
        marginRight: '.5rem',
      },
      button: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
      },
    },
  });

  const [search, setSearch] = useState('');

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleCategoryLink = (category: string) => {
    setSearch('#' + category);
    setShowPopular(false);
    scrollToTop();
    router.push({
      pathname: router.pathname,
      query: { ...router.query, category: category },
    });
  };

  const [showPopular, setShowPopular] = useState(false);
  const handlePopularLink = (category: string) => {
    setSearch('#' + category);
    setShowPopular(true);
    scrollToTop();
  };

  const handleShowAllLink = () => {
    setShowPopular(false);
    setSearch('');
  };

  const handleClearFilters = () => {
    setShowPopular(false);
    handleShowAllLink();
    setSearch('');
    scrollToTop();
    router.push({
      pathname: router.pathname,
      query: {},
    });
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

  interface FeedItem extends PostProps {
    date: Date;
    likes: number;
  }

  const { totalLikesCount } = useTotalLikes();
  const averageLikes = totalLikesCount / feed.length;

  interface PostFeedItem extends PostProps, FeedItem {}

  const searchResults = (search: string, feed: FeedItem[]): FeedItem[] => {
    const categorySearch = search[0] === '#';

    if (search === '#popular' || showPopular) {
      !showPopular ? setShowPopular(true) : null;
      return feed.filter(
        (data: FeedItem) =>
          data.likes > averageLikes &&
          data?.title?.toLowerCase().includes(
            search
              .replace(/#[a-z]+/, '')
              .trim()
              .toLowerCase()
          )
      );
    }

    if (categorySearch) {
      return feed.filter(
        (data: FeedItem) =>
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

    return feed.filter(
      (data: FeedItem) =>
        data?.category?.toLowerCase().includes(search.toLowerCase()) ||
        data?.title?.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredPosts = searchResults(search, feed as PostFeedItem[]);

  useEffect(() => {
    if (router.query.category) {
      setSearch('#' + router.query.category);
    }
  }, [router.query]);

  const RenderPosts: any = () => {
    if (filteredPosts.length > 0) {
      const sortedPosts = showPopular
        ? filteredPosts.sort((a, b) => b.likes - a.likes)
        : filteredPosts.sort(compareID).reverse();

      return sortedPosts.map((post) => (
        <article className="publishedPost" key={post.id}>
          <BlogPost post={post} />
        </article>
      ));
    } else {
      return (
        <div css={styleClearButton}>
          <span className="clearButton">
            <span className="searchNoResults">{blog.search?.noresult} </span>
            {feed.length > 0 && (
              <button
                onClick={() => handleClearFilters()}
                onKeyDown={() => handleClearFilters()}
                aria-label={blog.search.clear}
              >
                <button
                  onClick={() => handleClearFilters()}
                  onKeyDown={() => handleClearFilters()}
                  aria-label="Clear Filter"
                >
                  <CloseIcon size={12} />
                  <span className="clearButton">{' ' + blog.search.clear}</span>
                </button>
              </button>
            )}
          </span>
        </div>
      );
    }
  };

  const SearchIcon = () => {
    if (search.length === 0) {
      return (
        <div className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="var(--color-gray)"
          >
            <path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z" />
          </svg>
        </div>
      );
    } else {
      return (
        <button
          onClick={() => handleClearFilters()}
          onKeyDown={() => handleClearFilters()}
          className="clearSearch"
        >
          <CloseIcon size={18} />
        </button>
      );
    }
  };

  const ClearFilters = () => {
    if (search[0] === '#' && filteredPosts.length > 0) {
      return (
        <button
          css={styleClearButton}
          onClick={() => handleClearFilters()}
          onKeyDown={() => handleClearFilters()}
          aria-label="Clear Filter"
        >
          <CloseIcon size={12} />
          <span className="clearButton">{' ' + blog.search.clearFilter}</span>
        </button>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <BlogStats feed={feed} filteredPosts={filteredPosts} />
      <nav css={styleBlogCategoryNav}>
        <ul>
          <li>
            <button
              onClick={() => handleShowAllLink()}
              onKeyDown={() => handleShowAllLink()}
              className={search === '' ? 'category all active' : 'category all'}
              aria-label="All"
            >
              All
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePopularLink('popular')}
              onKeyDown={() => handlePopularLink('popular')}
              className={
                search.split(' ')[0] === '#' + 'popular'
                  ? 'category active'
                  : 'category'
              }
              aria-label="Popular"
            >
              Popular
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
          className="search"
          type="text"
          placeholder={blog.search.placeholder}
          value={search}
          aria-label={blog.search.placeholder}
          onChange={(e) => {
            const value = e.target.value;
            setSearch(value);

            if (value === '') {
              handleClearFilters();
            }
          }}
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
