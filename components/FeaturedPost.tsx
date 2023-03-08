import type { FC } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';

type FeaturedPostProps = {
  home: any;
  featuredPost: any;
  latestPost: any;
};

const FeaturedPost: FC<FeaturedPostProps> = ({
  home,
  featuredPost,
  latestPost,
}) => {
  const styleFeaturedPost = css({
    marginTop: '2.25rem',
    borderLeft: '4px solid var(--color-accent-gray)',
    paddingLeft: '1.25rem',
    width: 'fit-content',
    h2: {
      display: 'flex',
      alignItems: 'baseline',
      paddingBottom: '.25rem',
      fontFamily: 'var(--font-primary)',
      textTransform: 'uppercase',
      fontSize: 11,
      fontWeight: 400,
      color: 'var(--color-gray)',
      '&:before': {
        display: 'flex',
        alignSelf: 'center',
        content: '""',
        background: 'var(--icon-pin) no-repeat',
        backgroundSize: 'contain',
        height: 11,
        width: 11,
        marginRight: '.35rem',
      },
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
      marginTop: '.25rem',
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
