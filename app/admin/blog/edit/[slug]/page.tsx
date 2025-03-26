import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import EditPostForm from '@/components/blog/EditPostForm';
import { BlogService } from '@/app/lib/services/blog-service';

export default async function EditBlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Check if user is authenticated
  const session = await auth();

  // Await params before using it
  const params = await paramsPromise;
  const { slug } = params;

  // Redirect to sign-in if not authenticated
  if (!session?.user) {
    redirect(`/api/auth/signin?callbackUrl=/admin/blog/edit/${slug}`);
  }

  // Fetch the post data using BlogService instead of direct Supabase calls
  const post = await BlogService.getPostBySlug(slug);

  if (!post) {
    return (
      <div className="mt-8 text-center text-dark dark:text-light">
        <h2 className="mb-6 text-xxl">Post Not Found</h2>
        <p>The post you&apos;re trying to edit could not be found.</p>
        <a href="/admin/blog/drafts" className="mt-4 text-blue-500 underline">
          Back to drafts
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
        Edit Blog Post
      </h2>

      <EditPostForm post={post} userId={session.user?.id || ''} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const title = `Edit Post: ${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} — Amir Ardalan`;

  return {
    title,
    description: `Edit the blog post titled "${slug}" in the admin panel.`,
  };
}
