import { createClient } from '@/utils/supabase/server';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function PublishedPosts() {
  // Check if user is authenticated
  const session = await auth();

  // Redirect to sign-in if not authenticated
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/published');
  }

  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('Post')
    .select('id, title, slug')
    .eq('published', true) // Only select published posts
    .order('publishedAt', { ascending: false });

  return (
    <>
      <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
        Published Posts
      </h2>
      <div className="text-dark dark:text-light">
        {posts && posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
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
          <p>No published posts available.</p>
        )}
      </div>
    </>
  );
}
