import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getPublishedPosts } from '@/db/queries/posts';
import sanitizeHtml from 'sanitize-html';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Link from 'next/link';

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

  const allPosts = await getPublishedPosts();

  const filteredPosts = allPosts.filter((post) =>
    post.title.toLowerCase().includes(
      sanitizeHtml(query, {
        allowedTags: [],
        allowedAttributes: {},
      }).toLowerCase()
    )
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
    </div>
  );
}
