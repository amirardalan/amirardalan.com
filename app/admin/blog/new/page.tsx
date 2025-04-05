import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserIdByEmail } from '@/db/queries/users';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import CreatePostForm from '@/components/blog/NewPostForm';

export default async function NewBlogPost() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/new');
  }

  const userId = await getUserIdByEmail(session.user.email!);

  if (!userId) {
    throw new Error('An error occurred while fetching user details.');
  }

  return (
    <div className="mt-8">
      <AdminPageHeading title={'New Post'} />
      <CreatePostForm userId={userId} />
    </div>
  );
}

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'New Post — Amir Ardalan',
    description: 'Create a new blog post in the admin panel.',
  };
}
