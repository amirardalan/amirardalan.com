import { FC, useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { HomeTypes } from '@/types/home';

interface Post {
  slug: string;
  title: string;
  teaser: string;
}

interface FeaturedPostProps {
  home: HomeTypes;
  featuredPost: Post | null;
  latestPost: Post | null;
}

const FeaturedPost: FC<FeaturedPostProps> = ({
  home,
  featuredPost,
  latestPost,
}) => {
  const latest: Post | null = latestPost;
  const featured: Post | null = featuredPost;
  const ANIMATION_TIME = 350; //in milliseconds

  const [showFeatured, setShowFeatured] = useState<boolean>(!featured);
  const [animate, setAnimate] = useState<boolean>(false);

  const handlePostToggle = () => {
    setAnimate(true);
    featured ? setShowFeatured(!showFeatured) : null;
    setTimeout(() => {
      setAnimate(false);
    }, ANIMATION_TIME);
  };

  const postTypeTitle = showFeatured ? home.featured.title : home.latest.title;

  const stylePostToggle = css({
    display: 'flex',
    justifyContent: 'space-between',
    minWidth: 120,
    maxWidth: 'min-content',
    marginBottom: '.8rem',
    padding: '.25rem .6rem .2rem .3rem',
    border: '1px solid var(--color-accent-gray)',
    color: 'var(--color-gray)',
    backgroundColor: 'transparent',
    borderRadius: 10,
    button: {
      color: 'var(--color-gray)',
      textTransform: 'uppercase',
      '&:hover': {
        color: featured ? 'var(--color-text)' : '',
        cursor: featured ? 'pointer' : 'default',
      },
    },
    '.icon': {
      animation: animate ? `rotate ${ANIMATION_TIME}ms ease-out` : '',
    },
  });

  const styleFeaturedPost = css({
    marginTop: '2.25rem',
    display: 'flex',
    flexDirection: 'column',
    h2: {
      whiteSpace: 'nowrap',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      fontFamily: 'var(--font-primary)',
      textTransform: 'uppercase',
      fontSize: 11,
      fontWeight: 400,
    },
    'h3, p': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
    },
    'h3 a': {
      lineHeight: '1.25rem',
      fontFamily: 'var(--font-secondary)',
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--color-text)',

      '@media(max-width: 480px)': {
        fontSize: 16,
      },
    },
    p: {
      marginTop: '.25rem',
      lineHeight: '1.25rem',
      fontSize: 15,
      fontFamily: 'var(--font-tertiary)',
      fontStyle: 'italic',
      color: 'var(--color-gray)',
    },
  });

  if (featuredPost || latestPost) {
    return (
      <div css={styleFeaturedPost}>
        <button onClick={handlePostToggle} css={stylePostToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="var(--color-gray)"
            className="icon"
          >
            <path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z" />
          </svg>
          <h2 aria-label={postTypeTitle}>{postTypeTitle}</h2>
        </button>
        <article>
          {showFeatured && featured ? (
            <>
              <h3>
                <Link
                  href={`/blog/${encodeURIComponent(featured.slug)}`}
                  aria-label={featured?.title}
                >
                  {featured?.title}
                </Link>
              </h3>
              <p>{featured?.teaser}</p>{' '}
            </>
          ) : latest ? (
            <>
              <h3>
                <Link
                  href={`/blog/${encodeURIComponent(latest.slug)}`}
                  aria-label={latest?.title}
                >
                  {latest?.title}
                </Link>
              </h3>
              <p>{latest?.teaser}</p>{' '}
            </>
          ) : null}
        </article>
      </div>
    );
  } else return null;
};

export default FeaturedPost;
