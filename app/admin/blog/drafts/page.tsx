import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDraftPosts } from '@/db/queries/posts';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Pagination from '@/components/ui/Pagination';
import Link from 'next/link';

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Drafts — Amir Ardalan',
    description: 'View and manage draft blog posts in the admin panel.',
  };
}

export default async function Drafts({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/drafts');
  }

  const query = searchParams.query || '';
  const currentPage = Number(searchParams.page || '1');
  const postsPerPage = 10;

  const drafts = await getDraftPosts();

  const filteredDrafts = drafts.filter((draft) =>
    draft.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDrafts.length / postsPerPage);
  const paginatedDrafts = filteredDrafts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalResults = filteredDrafts.length;

  return (
    <div className="mt-8">
      <AdminPageHeading title={'Drafts'} />
      <SearchInput
        name="query"
        placeholder="Search drafts..."
        defaultValue={query}
        totalResults={totalResults}
      />
      <div className="text-dark dark:text-light">
        {paginatedDrafts.length > 0 ? (
          <ul>
            {paginatedDrafts.map((draft) => (
              <li
                key={draft.id}
                className="my-4 flex items-center justify-between"
              >
                <div>
                  <Link
                    href={`/blog/${draft.slug}`}
                    className="hover:underline"
                  >
                    {draft.title}
                  </Link>
                  <span className="ml-2 text-sm text-zinc-500">
                    [Draft by {draft.user_name}]
                  </span>
                </div>
                <Link
                  href={`/admin/blog/edit/${draft.slug}`}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-light hover:bg-blue-700"
                >
                  Edit
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No drafts match your search.</p>
        )}
      </div>

      <Pagination totalPages={totalPages} className="my-10" />
    </div>
  );
}
