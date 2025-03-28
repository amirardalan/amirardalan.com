import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import SearchInput from '@/components/admin/AdminSearch';
import Link from 'next/link';

export function generateMetadata() {
  return {
    title: 'Drafts — Amir Ardalan',
    description: 'View and manage draft blog posts in the admin panel.',
  };
}

export default async function Drafts({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/drafts');
  }

  const query = (await searchParams)?.query || '';
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/drafts`
  );
  const drafts = await response.json();

  const filteredDrafts = drafts.filter((draft: any) =>
    draft.title.toLowerCase().includes(query.toLowerCase())
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
        {filteredDrafts.length > 0 ? (
          <ul>
            {filteredDrafts.map((draft: any) => (
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
                    [Draft by {draft.user_name}] {/* Show user's name */}
                  </span>
                </div>
                <Link
                  href={`/admin/blog/edit/${draft.slug}`}
                  className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
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
    </div>
  );
}
