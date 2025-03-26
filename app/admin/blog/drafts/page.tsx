import { createClient } from '@/utils/supabase/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminPageHeading from '@/app/components/admin/AdminPageHeading';
import SearchInput from '@/app/components/admin/SearchInput';
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
  // Check if user is authenticated
  const session = await auth();

  // Redirect to sign-in if not authenticated
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/drafts');
  }

  const supabase = await createClient();
  const query = (await searchParams)?.query || '';
  const { data: drafts } = await supabase
    .from('Post')
    .select('id, title, slug')
    .eq('published', false) // Only select unpublished posts
    .ilike('title', `%${query}%`) // Filter by search query
    .order('editedAt', { ascending: false });

  const totalResults = drafts?.length || 0;

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
        {drafts && drafts.length > 0 ? (
          <ul>
            {drafts.map((draft) => (
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
                  <span className="ml-2 text-sm text-zinc-500">[Draft]</span>
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
          <p>No draft posts available.</p>
        )}
      </div>
    </div>
  );
}
