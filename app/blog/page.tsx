import { BlogService } from '@/app/lib/services/blog-service';
import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';

// Enable on-demand revalidation
export const revalidate = false; // Only revalidate on-demand

export default async function Blog() {
  const posts = await BlogService.getPublishedPosts();

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
