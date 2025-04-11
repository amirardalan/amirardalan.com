import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getPublishedPosts } from '@/db/queries/posts';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Pagination from '@/components/ui/Pagination';
import Link from 'next/link';

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Published Posts — Amir Ardalan',
    description: 'View and manage published blog posts in the admin panel.',
  };
}

export default async function Published({ searchParams }: any) {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/published');
  }

  const params = await Promise.resolve(searchParams || {});
  const query = typeof params.query === 'string' ? params.query : '';
  const currentPage = Number(
    typeof params.page === 'string' ? params.page : '1'
  );
  const postsPerPage = 10;

  const posts = await getPublishedPosts();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalResults = filteredPosts.length;

  return (
    <div className="mx-10 mt-8">
      <AdminPageHeading title={'Published Posts'} />
      <SearchInput
        name="query"
        placeholder="Search published posts..."
        defaultValue={query}
        totalResults={totalResults}
      />
      <div className="text-dark dark:text-light">
        {paginatedPosts.length > 0 ? (
          <ul>
            {paginatedPosts.map((post) => (
              <li
                key={post.id}
                className="my-4 flex items-center justify-between"
              >
                <div>
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                  <span className="ml-2 text-sm text-zinc-500">
                    [Published by {post.user_name}]
                  </span>
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
          <p>No posts match your search.</p>
        )}
      </div>

      <Pagination totalPages={totalPages} className="my-10" />
    </div>
  );
}
