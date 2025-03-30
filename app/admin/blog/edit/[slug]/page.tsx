import { auth } from '@/src/auth/auth';
import { redirect } from 'next/navigation';
import { getUserIdByEmail } from '@/src/db/queries/users';
import { getPostBySlug } from '@/src/db/queries/posts';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import EditPostForm from '@/components/blog/EditPostForm';

export default async function EditBlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();

  const params = await paramsPromise;
  const { slug } = params;

  if (!session?.user) {
    redirect(`/api/auth/signin?callbackUrl=/admin/blog/edit/${slug}`);
  }

  const userId = await getUserIdByEmail(session.user.email!);

  if (!userId) {
    throw new Error('User ID not found for the authenticated user.');
  }

  // Use the service to get the post
  const post = await getPostBySlug(slug);

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
      <AdminPageHeading title={'Edit Post'} />
      <EditPostForm post={post} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = `Edit Post: ${slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())} — Amir Ardalan`;

  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title,
    description: `Edit the blog post titled "${slug}" in the admin panel.`,
  };
}
