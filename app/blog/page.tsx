import { BlogService } from '@/app/lib/services/blog-service';
import PageHeading from '@/app/components/ui/PageHeading';
import Container from '@/components/content/Container';
import { cache } from 'react';
import SearchableBlogList from '@/app/components/blog/SearchableBlogList';

// Enable caching with a specific tag for on-demand revalidation
export const revalidate = false;

// Cache the fetch logic to ensure static behavior
const getCachedPosts = cache(async () => {
  return await BlogService.getPublishedPosts();
});

export default async function Blog() {
  const posts = await getCachedPosts();

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title={'Blog'} />
        <div className="text-dark dark:text-light">
          <SearchableBlogList posts={posts} />
        </div>
      </div>
    </Container>
  );
}
