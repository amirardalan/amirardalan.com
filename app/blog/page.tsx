import { BlogService } from '@/app/lib/services/blog-service';
import PageHeading from '@/app/components/ui/PageHeading';
import Container from '@/components/content/Container';

// Disable automatic revalidation; use on-demand revalidation with revalidateTag
export const revalidate = false;

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
