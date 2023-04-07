import { FC } from 'react';
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

  const featured: Post | null = featuredPost ? featuredPost : latestPost;
  const componentTitle = featuredPost ? home.featured.title : home.latest.title;

  if (featuredPost || latestPost) {
    return (
      <div css={styleFeaturedPost}>
        <h2 aria-label={componentTitle}>{componentTitle}</h2>
        <article>
          <h3>
            {featured ? (
              <Link
                href={`/blog/${encodeURIComponent(featured?.slug)}`}
                aria-label={featured?.title}
              >
                {featured?.title}
              </Link>
            ) : null}
          </h3>
          <p>{featured?.teaser}</p>
        </article>
      </div>
    );
  } else return null;
};

export default FeaturedPost;
