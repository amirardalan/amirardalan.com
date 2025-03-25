import { createClient } from '@/utils/supabase/server';
import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';

// Enable on-demand revalidation
export const revalidate = false; // Only revalidate on-demand

export default async function Blog() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('Post')
    .select('id, title, slug')
    .eq('published', true) // Only select published posts
    .order('publishedAt', { ascending: false });

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title={'Blog'} />
        <div className="text-dark dark:text-light">
          {posts && posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <a href={`/blog/${post.slug}`}>{post.title}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No published posts yet.</p>
          )}
        </div>
      </div>
    </Container>
  );
}
