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

  const [showFeatured, setShowFeatured] = useState<boolean>(
    featured ? true : false
  );
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
    alignItems: 'center',
    justifyContent: 'start',
    minWidth: 'fit-content',
    maxWidth: 'min-content',
    marginBottom: '1.15rem',
    padding: '.24rem .7rem .2rem .5rem',
    border: '1px solid var(--color-accent-gray)',
    backgroundColor: 'transparent',
    borderRadius: 10,
    h3: {
      color: 'var(--color-accent-gray)',
    },
    '.icon': {
      fill: 'var(--color-accent-gray)',
      animation: animate ? `rotate ${ANIMATION_TIME}ms ease-out` : '',
    },
    '@media (min-width: 1025px)': {
      '&:hover': {
        backgroundColor: 'transparent',
        border: '1px solid var(--color-primary)',
        h4: {
          color: 'var(--color-primary)',
        },
        svg: {
          fill: 'var(--color-primary)',
        },
      },
    },
    '@keyframes rotate': {
      from: { transform: 'rotate(180deg)' },
      to: { transform: 'rotate(0deg)' },
    },
  });

  const styleFeaturedPost = css({
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'column',
    h4: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginLeft: '.3rem',
      fontFamily: 'var(--font-primary)',
      color: 'var(--color-accent-gray)',
      textTransform: 'uppercase',
      fontSize: 11,
      fontWeight: 400,
    },
    '.featuredContainer': {
      position: 'relative',
      height: 50,
    },
    '.featured, .latest': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '100%',
      height: 50,
      position: 'absolute',
      top: '0',
      left: '0',
      transition: 'transform .5s ease-in-out, opacity .5s ease-in-out',
    },
    '.featured': {
      transform: `translateY(${showFeatured ? '0' : '100%'})`,
      opacity: `${showFeatured ? '1' : '0'}`,
    },
    '.latest': {
      transform: `translateY(${showFeatured ? '-100%' : '0'})`,
      opacity: `${showFeatured ? '0' : '1'}`,
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
      fontSize: 20,
      fontWeight: 700,
      '@media (min-width: 1025px)': {
        '&:hover': {
          textDecoration: 'none',
        },
      },
      '@media(max-width: 480px)': {
        fontSize: 18,
      },
    },
    p: {
      marginTop: '.25rem',
      lineHeight: '1.25rem',
      fontSize: 15,
      fontFamily: 'var(--font-tertiary)',
      color: 'var(--color-gray)',
      '@media (max-width: 480px)': {
        marginTop: '.25rem',
      },
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
            className="icon"
          >
            <path d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z" />
          </svg>
          <h4 aria-label={postTypeTitle}>{postTypeTitle}</h4>
        </button>
        <article>
          <div className="animationWrapper featuredContainer">
            <div className="featured">
              <h3>
                <Link
                  href={`/blog/${encodeURIComponent(featured?.slug ?? '')}`}
                  aria-label={featured?.title}
                >
                  {featured?.title}
                </Link>
              </h3>
              <p>{featured?.teaser}</p>
            </div>
            <div className="latest">
              <h3>
                <Link
                  href={`/blog/${encodeURIComponent(latest?.slug ?? '')}`}
                  aria-label={latest?.title}
                >
                  {latest?.title}
                </Link>
              </h3>
              <p>{latest?.teaser}</p>
            </div>
          </div>
        </article>
      </div>
    );
  } else return null;
};

export default FeaturedPost;
