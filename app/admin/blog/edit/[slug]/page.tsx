import { auth } from '@/auth';
import { db } from '@/db/connector';
import { posts, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { getUserIdByEmail } from '@/auth';

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

  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      excerpt: posts.excerpt,
      slug: posts.slug,
      category: posts.category,
      published: posts.published,
      created_at: posts.created_at,
      updated_at: posts.updated_at,
      user_id: posts.user_id,
      author_name: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.user_id, users.id))
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
      <EditPostForm post={post[0]} />
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
