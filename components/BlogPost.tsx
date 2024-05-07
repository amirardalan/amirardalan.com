import { useRouter } from 'next/router';
import Link from 'next/link';
import formatDate from '@/utils/formatDate';
import calculateReadTime from '@/utils/calculateReadTime';
import dynamic from 'next/dynamic';

import type { FC } from 'react';
import type { PostProps } from '@/types/post';

const BlogPostStats = dynamic(() => import('@/components/BlogPostStats'), {
  ssr: false,
});

type BlogPostProps = {
  post: PostProps;
};

const BlogPost: FC<BlogPostProps> = ({ post }) => {
  const router = useRouter();
  const isDraft = router.pathname.includes('/drafts');

  const publishDate = formatDate(post.publishedAt, 'numeric');
  const postReadTime: string = calculateReadTime(post.content);

  return (
    <div className="blog postTeaser">
      <div
        className="postDetails"
        aria-label={`${publishDate} • ${postReadTime}`}
      >
        <div className="blogListDetails">
          {!isDraft && <BlogPostStats post={post} />}
        </div>
      </div>
      <div className="blogListHeading">
        <h2>
          <Link href={`/blog/${post.slug}`} aria-label={post.title}>
            {post.title}
          </Link>
        </h2>
      </div>
      <p className="teaser">{post.teaser}</p>
    </div>
  );
};

export default BlogPost;
