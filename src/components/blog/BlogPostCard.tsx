import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

export default function BlogPostCard({
  post,
  featured = false,
}: BlogPostCardProps) {
  return (
    <li
      className={`relative mb-14 flex w-full justify-between ${
        featured ? 'border-l-4 border-primary pl-4' : ''
      } text-xl last:mb-0`}
    >
      <a className="group w-full" href={`/blog/${post.slug}`}>
        {featured && (
          <span className="mb-1 block text-xxs uppercase leading-none text-primary">
            Featured
          </span>
        )}
        <h2 className="relative pr-12 text-2xl group-hover:underline">
          {post.title}
        </h2>
        <p
          className={`mt-2 font-serif text-sm italic ${
            featured ? 'leading-none' : ''
          } text-zinc-500 dark:text-zinc-400`}
        >
          {post.excerpt}
        </p>
      </a>
      <div className="flex min-w-fit flex-col items-end text-xs">
        <time className="text-zinc-500 dark:text-zinc-400">
          {formatDate(
            post.show_updated
              ? post.updated_at ?? post.created_at
              : post.created_at
          )}
        </time>
        <span className="text-zinc-400 dark:text-zinc-500">
          {calculateReadTime(post.content)}
        </span>
      </div>
    </li>
  );
}
