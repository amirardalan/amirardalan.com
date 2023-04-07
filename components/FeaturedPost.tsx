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
  const featured: Post | null = featuredPost;
  const latest: Post | null = latestPost;

  const [showFeatured, setShowFeatured] = useState<boolean>(
    featured ? true : false
  );
  const handleToggleFeatured = () => {
    featured ? setShowFeatured(!showFeatured) : null;
  };
  const postTypeTitle = showFeatured ? home.featured.title : home.latest.title;

  const stylePostTypeTitle = css({
    button: {
      color: 'var(--color-gray)',
      textTransform: 'uppercase',
      '&:hover': {
        color: featured ? 'var(--color-text)' : '',
        cursor: featured ? 'pointer' : 'default',
      },
    },
  });

  const styleFeaturedPost = css({
    marginTop: '2.25rem',
    display: 'flex',
    flexDirection: 'column',
    h2: {
      maxWidth: 'min-content',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: '.5rem',
      padding: '.25rem .6rem .2rem .65rem',
      border: '1px solid var(--color-accent-gray)',
      color: 'var(--color-gray)',
      backgroundColor: 'transparent',
      borderRadius: 10,
      fontFamily: 'var(--font-primary)',
      textTransform: 'uppercase',
      fontSize: 11,
      fontWeight: 400,
    },
    h3: {
      lineHeight: '1.35rem',
      marginBottom: '.2rem',
    },
    'h3 a': {
      fontFamily: 'var(--font-secondary)',
      fontSize: 18,
      fontWeight: 700,
      '@media(max-width: 480px)': {
        fontSize: 16,
      },
    },
    p: {
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
        <h2 aria-label={postTypeTitle} css={stylePostTypeTitle}>
          <button onClick={handleToggleFeatured}>{postTypeTitle}</button>
        </h2>
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
