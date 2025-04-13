import Link from 'next/link';
import { formatDate } from '@/utils/format-date';
import { BlogPost } from '@/types/blog';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Pagination from '@/components/ui/Pagination';

interface BlogPostListProps {
  title: string;
  posts: BlogPost[];
  searchPlaceholder: string;
  query: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  isDrafts?: boolean;
}

export default function BlogPostList({
  title,
  posts,
  searchPlaceholder,
  query,
  totalResults,
  totalPages,
  isDrafts = false,
}: BlogPostListProps) {
  return (
    <div className="mx-10 mt-8">
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
                className="my-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline"
                    >
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
                  </div>
                  <div>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {formatDate(post.created_at)}
                    </span>
                    <span className="px-2 text-zinc-500 dark:text-zinc-400">
                      &bull;
                    </span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {post.category || 'Uncategorized'}
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
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-light hover:bg-blue-700"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No {isDrafts ? 'drafts' : 'posts'} match your search.</p>
        )}
      </div>

      <Pagination totalPages={totalPages} className="my-10" />
    </div>
  );
}
