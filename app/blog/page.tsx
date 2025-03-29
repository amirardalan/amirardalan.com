import { getPublishedPosts } from '@/services/posts';
import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import BlogPosts from '@/components/blog/BlogPosts';
import { BlogPost } from '@/types/blog';

// Setting revalidate to false for on-demand revalidation only
export const revalidate = false;

// Add tag-based revalidation support
export const generateMetadata = () => {
  return {
    title: 'Blog — Amir Ardalan',
    description: 'Articles on web development, design, and technology',
    alternates: {
      canonical: '/blog',
    },
  };
};

export default async function Blog() {
  // Get posts with cached function for better performance
  const posts: BlogPost[] = await getPublishedPosts();

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title="Blog" />
        <div className="text-dark dark:text-light">
          <BlogPosts posts={posts} />
        </div>
      </div>
    </Container>
  );
}
