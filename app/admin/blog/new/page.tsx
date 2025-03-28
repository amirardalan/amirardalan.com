import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminPageHeading from '@/components/admin/AdminPageHeading';
import CreatePostForm from '@/components/blog/NewPostForm';
import { getUserIdByEmail } from '@/auth';

export default async function NewBlogPost() {
  const session = await auth();

  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/new');
  }

  const userId = await getUserIdByEmail(session.user.email!);

  if (!userId) {
    throw new Error('User ID not found for the authenticated user.');
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
    title: 'New Post — Amir Ardalan',
    description: 'Create a new blog post in the admin panel.',
  };
}
