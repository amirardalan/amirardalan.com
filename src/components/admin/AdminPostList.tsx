import Link from 'next/link';
import { formatDate } from '@/utils/format-date';
import { BlogPost } from '@/types/blog';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Pagination from '@/components/ui/Pagination';

interface AdminPostListProps {
  title: string;
  posts: BlogPost[];
  searchPlaceholder: string;
  query: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  isDrafts?: boolean;
}

export default function AdminPostList({
  title,
  posts,
  searchPlaceholder,
  query,
  totalResults,
  totalPages,
  isDrafts = false,
}: AdminPostListProps) {
  const noPostsExist = totalResults === 0 && (!query || query.trim() === '');

  return (
    <div>
      <AdminPageHeading title={title} />
      <SearchInput
        name="query"
        placeholder={searchPlaceholder}
        defaultValue={query}
        totalResults={totalResults}
      />
      <div className="text-dark dark:text-light">
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="group flex w-full cursor-pointer items-center justify-between border-b border-zinc-200 py-3 transition-all duration-150 ease-in-out hover:bg-zinc-100 hover:px-2 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <div className="flex w-full flex-col">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                    {post.featured && (
                      <span className="ml-2 text-xs text-primary">
                        [Featured]
                      </span>
                    )}
                    {isDrafts && (
                      <span className="ml-2 text-sm text-amber-500 dark:text-amber-400">
                        [Draft]
                      </span>
                    )}
                  </Link>
                  <div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {formatDate(post.created_at)}
                    </span>
                    <span className="px-2 text-zinc-500 dark:text-zinc-400">
                      &bull;
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {post.category?.name || 'Uncategorized'}
                    </span>
                    <span className="px-2 text-zinc-500 dark:text-zinc-400">
                      &bull;
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {post.user_name}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/admin/blog/edit/${post.slug}`}
                  className="rounded bg-dark px-3 py-1 text-sm font-medium uppercase text-light opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:bg-light dark:text-dark"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        ) : noPostsExist ? (
          <p>
            It looks like there are no {isDrafts ? 'drafts' : 'posts'} yet. Try{' '}
            <Link href="/admin/blog/new" className="text-primary underline">
              writing one
            </Link>
            .
          </p>
        ) : (
          <p>No {isDrafts ? 'drafts' : 'posts'} match your search.</p>
        )}
      </div>

      <Pagination totalPages={totalPages} className="my-10" />
    </div>
  );
}
