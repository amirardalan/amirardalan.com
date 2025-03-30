import { auth } from '@/src/auth/auth';
import { redirect } from 'next/navigation';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Link from 'next/link';
import { getPublishedPosts } from '@/src/db/queries/posts';

export default async function PublishedPosts({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/published');
  }

  const { query = '' } = await searchParams;

  // Use the service to get published posts
  const allPosts = await getPublishedPosts();

  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalResults = filteredPosts.length;

  return (
    <div className="mt-8">
      <AdminPageHeading title={'Published Posts'} />
      <SearchInput
        name="query"
        placeholder="Search posts..."
        defaultValue={query}
        totalResults={totalResults}
      />
      <div className="text-dark dark:text-light">
        {filteredPosts.length > 0 ? (
          <ul>
            {filteredPosts.map((post) => (
              <li
                key={post.id}
                className="my-4 flex items-center justify-between"
              >
                <div>
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </div>
                <Link
                  href={`/admin/blog/edit/${post.slug}`}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
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
    </div>
  );
}
