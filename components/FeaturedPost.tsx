import { FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';

type FeaturedPostProps = {
  home: object;
  featuredPost: object;
  latestPost: object;
};

interface Home {
  featured: {
    title: string;
  };
  latest: {
    title: string;
  };
}

interface Post {
  slug?: string;
  title: string;
  teaser?: string;
}

const FeaturedPost: FC<FeaturedPostProps> = ({
  home,
  featuredPost,
  latestPost,
}: {
  home: Home;
  featuredPost: Post;
  latestPost: Post;
}) => {
  const styleFeaturedPost = css({
    marginTop: '2.25rem',
    h2: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: '.8rem',
      padding: '.25rem .5rem .2rem .65rem',
      lineHeight: '.8rem',
      backgroundColor: 'var(--color-accent-gray)',
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
      marginTop: '.4rem',
      lineHeight: '1.25rem',
      fontSize: 15,
      fontFamily: 'var(--font-tertiary)',
      fontStyle: 'italic',
      color: 'var(--color-gray)',
    },
  });

  const featured = featuredPost ? featuredPost : latestPost;
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
