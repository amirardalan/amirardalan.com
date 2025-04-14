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
  // Format the metadata elements once for reuse
  const dateFormatted = formatDate(
    post.show_updated ? post.updated_at ?? post.created_at : post.created_at
  );
  const readTime = calculateReadTime(post.content);

  return (
    <li className="relative mb-10 text-xl last:mb-0 md:mb-14">
      {/* Featured border with absolute positioning */}
      {featured && (
        <div className="absolute -left-6 top-0 h-full w-1 bg-primary md:-left-8"></div>
      )}

      {/* Mobile metadata (above md:) */}
      <div className="mb-1 flex text-xxs uppercase leading-none md:hidden">
        {featured && (
          <span className="mb-1 pr-2 text-xxs uppercase italic leading-none text-primary md:pr-0">
            Featured
          </span>
        )}
        <time className="mr-2 text-zinc-500 after:pl-2 after:content-['•'] md:mr-0 md:after:pl-0 md:after:content-[''] dark:text-zinc-400">
          {dateFormatted}
        </time>
        <span className="text-zinc-400 dark:text-zinc-500">{readTime}</span>
      </div>

      <div className="flex w-full justify-between">
        <a className="group w-full" href={`/blog/${post.slug}`}>
          {/* Desktop featured tag */}
          {featured && (
            <span className="mb-2 hidden text-xxs uppercase leading-none text-primary md:block">
              Featured
            </span>
          )}
          <h2 className="relative pr-12 text-lg font-medium leading-tight group-hover:underline md:text-2xl">
            {post.title}
          </h2>
          <p className="mt-1 font-serif text-sm italic text-zinc-500 md:text-lg dark:text-zinc-400">
            {post.excerpt}
          </p>
        </a>

        {/* Desktop metadata (md: and above) */}
        <div className="hidden min-w-fit flex-col items-end text-xxs uppercase md:flex">
          <time className="text-zinc-500 dark:text-zinc-400">
            {dateFormatted}
          </time>
          <span className="text-zinc-400 dark:text-zinc-500">{readTime}</span>
        </div>
      </div>
    </li>
  );
}
