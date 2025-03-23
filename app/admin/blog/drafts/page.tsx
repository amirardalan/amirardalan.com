import { createClient } from '@/utils/supabase/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Drafts() {
  // Check if user is authenticated
  const session = await auth();

  // Redirect to sign-in if not authenticated
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/drafts');
  }

  const supabase = await createClient();
  const { data: drafts } = await supabase
    .from('Post')
    .select('id, title, slug')
    .eq('published', false) // Only select unpublished posts
    .order('editedAt', { ascending: false });

  return (
    <>
      <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
        Unpublished Drafts
      </h2>
      <div className="text-dark dark:text-light">
        {drafts && drafts.length > 0 ? (
          <ul>
            {drafts.map((draft) => (
              <li key={draft.id} className="my-2">
                <a href={`/blog/${draft.slug}`}>{draft.title}</a>
                <span className="ml-2 text-sm text-gray-500">[Draft]</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No draft posts available.</p>
        )}
      </div>
    </>
  );
}
