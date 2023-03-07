import type { FC } from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';
import compareID from '@/utils/compareID';
import BlogSupport from '@/components/BlogSupport';

type BlogNavigationProps = {
  feed: {
    length: number;
    sort: Function;
  };
  post: {
    id: number;
  };
  isPublished: boolean;
};

const BlogNavigation: FC<BlogNavigationProps> = ({
  feed,
  post,
  isPublished,
}) => {
  const total = feed?.length;
  const current = post?.id;

  const arr = feed ? feed : null;
  const arrSorted = arr.sort(compareID);

  const first = arr[0].id === current && isPublished;
  const last = arr[total - 1].id === current && isPublished;
  const only = first && last;
  const prevPost = isPublished && !first && !only;
  const nextPost = isPublished && !last && !only;

  const index = arrSorted.findIndex((x: { id: number }) => x.id === current);
  const prevTitle = prevPost ? arr[index - 1].title : null;
  const nextTitle = nextPost ? arr[index + 1].title : null;
  const prevLink = prevPost
    ? `/blog/${encodeURIComponent(arr[index - 1].slug)}`
    : '#';
  const nextLink = nextPost
    ? `/blog/${encodeURIComponent(arr[index + 1].slug)}`
    : '#';

  const ShowPrevLink = () => (
    <div css={stylePrevLink}>
      <Link href={prevLink} aria-label={prevTitle}>
        ← {prevTitle}
      </Link>
    </div>
  );
  const ShowNextLink = () => (
    <div css={styleNextLink}>
      <Link href={nextLink} aria-label={nextTitle}>
        {nextTitle} →
      </Link>
    </div>
  );

  const styleBlogNavigation = css({
    marginTop: '4rem',
    fontFamily: 'var(--font-secondary)',
    fontSize: 18,
    lineHeight: '1.3rem',
  });
  const styleBlogLinks = css({
    display: 'flex',
    justifyContent: first ? 'flex-end' : 'space-between',
    '@media(max-width: 768px)': {
      flexDirection: 'row',
      fontSize: 16,
    },
  });
  const stylePrevLink = css({
    paddingRight: '1rem',
    textAlign: 'left',
  });
  const styleNextLink = css({
    paddingLeft: '1rem',
    textAlign: 'right',
  });

  return (
    <div css={styleBlogNavigation}>
      <BlogSupport />
      <div css={styleBlogLinks}>
        {prevPost ? <ShowPrevLink /> : null}
        {nextPost ? <ShowNextLink /> : null}
      </div>
    </div>
  );
};

export default BlogNavigation;
