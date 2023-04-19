import type { FC } from 'react';
import Link from 'next/link';
import LikeCount from '@/components/LikeCount';
import formatDate from '@/utils/formatDate';
import calculateReadTime from '@/utils/calculateReadTime';
import type { PostProps } from '@/types/post';

type BlogPostProps = {
  post: PostProps;
};

const BlogPost: FC<BlogPostProps> = ({ post }) => {
  const publishDate = formatDate(post.publishedAt);
  const postReadTime = calculateReadTime(post.content);

  return (
    <div className="blog postTeaser">
      <h2 className="blogListHeading">
        <Link href={`/blog/${post.slug}`} aria-label={post.title}>
          {post.title}
        </Link>
      </h2>
      <div
        className="postDetails"
        aria-label={`${publishDate} • ${postReadTime}`}
      >
        <div className="blogListDetails">
          <span>
            <time dateTime={publishDate}>{publishDate}</time>
            • <LikeCount id={post.id} likes={post.likes} />
          </span>
          <span className="readTime">{postReadTime}</span>
        </div>
      </div>
      <p className="teaser">{post.teaser}</p>
    </div>
  );
};

export default BlogPost;
