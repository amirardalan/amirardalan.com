import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getPublishedPosts } from '@/db/queries/posts';
import BlogPostList from '@/components/admin/BlogPostList';

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Published Posts — Amir Ardalan',
    description: 'View and manage published blog posts in the admin panel.',
  };
}

export default async function Published({ searchParams }: any) {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/published');
  }

  const params = await Promise.resolve(searchParams || {});
  const query = typeof params.query === 'string' ? params.query : '';
  const currentPage = Number(
    typeof params.page === 'string' ? params.page : '1'
  );
  const postsPerPage = 10;

  const posts = await getPublishedPosts();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const totalResults = filteredPosts.length;

  return (
    <BlogPostList
      title="Published Posts"
      posts={paginatedPosts}
      searchPlaceholder="Search published posts..."
      query={query}
      totalResults={totalResults}
      currentPage={currentPage}
      totalPages={totalPages}
      isDrafts={false}
    />
  );
}
