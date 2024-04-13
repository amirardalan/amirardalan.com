import type { FC } from 'react';
import type { PostProps } from '@/types/post';
import Link from 'next/link';
import BlogPostStats from '@/components/BlogPostStats';
import formatDate from '@/utils/formatDate';
import calculateReadTime from '@/utils/calculateReadTime';

type BlogPostProps = {
  post: PostProps;
};

const BlogPost: FC<BlogPostProps> = ({ post }) => {
  const publishDate = formatDate(post.publishedAt, 'numeric');
  const postReadTime: string = calculateReadTime(post.content);

  return (
    <div className="blog postTeaser">
      <div
        className="postDetails"
        aria-label={`${publishDate} • ${postReadTime}`}
      >
        <div className="blogListDetails">
          <BlogPostStats post={post} />
        </div>
      </div>
      <h2 className="blogListHeading">
        <Link href={`/blog/${post.slug}`} aria-label={post.title}>
          {post.title}
        </Link>
      </h2>
      <p className="teaser">{post.teaser}</p>
    </div>
  );
};

export default BlogPost;
