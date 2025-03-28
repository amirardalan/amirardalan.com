import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import EditPostForm from '@/components/blog/EditPostForm';
import { db } from '@/db';
import { posts } from '@/schema';
import { eq } from 'drizzle-orm';
import AdminPageHeading from '@/app/components/admin/AdminPageHeading';

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

  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!post.length) {
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
      <EditPostForm post={post[0]} userId={session.user?.id || ''} />
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
    title,
    description: `Edit the blog post titled "${slug}" in the admin panel.`,
  };
}
