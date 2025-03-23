import { createClient } from '@/utils/supabase/server';

// Enable on-demand revalidation
export const revalidate = false; // Only revalidate on-demand

export default async function Blog() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('Post')
    .select('id, title, slug')
    .order('publishedAt', { ascending: false });

  return (
    <main>
      <div className="mt-8">
        <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
          Blog
        </h2>
        <div className="text-dark dark:text-light">
          <ul>
            {posts?.map((post) => (
              <li key={post.id}>
                <a href={`/blog/${post.slug}`}>{post.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
