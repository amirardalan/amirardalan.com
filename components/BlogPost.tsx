import type { FC } from 'react';
import Link from 'next/link';
import formatDate from '@/utils/formatDate';
import calculateReadTime from '@/utils/calculateReadTime';
import LikeCount from '@/components/LikeCount';

type PostProps = {
  post: Post;
};

interface Post {
  id: number;
  publishedAt: Date;
  likes?: number;
  content: string;
  slug: string;
  title: string;
  teaser: string;
}

const Post: FC<PostProps> = ({ post }) => {
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
        <div className="dateAndReadTime">
          <time dateTime={publishDate}>{publishDate}</time>
          <span className="timeAndLikes">
            <span className="readTime">{postReadTime}</span>
            <span className="likeCount">
              <LikeCount id={post.id} likes={post.likes} />
            </span>
          </span>
        </div>
      </div>
      <p className="teaser">{post.teaser}</p>
    </div>
  );
};

export default Post;
