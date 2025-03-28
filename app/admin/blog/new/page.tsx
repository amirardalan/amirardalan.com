import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminPageHeading from '@/app/components/admin/AdminPageHeading';
import CreatePostForm from '@/app/components/blog/NewPostForm';
import { getUserIdByEmail } from '@/auth';

export default async function NewBlogPost() {
  // Check if user is authenticated
  const session = await auth();

  // Redirect to sign-in if not authenticated
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/new');
  }

  const userId = await getUserIdByEmail(session.user.email!); // Fetch user ID

  if (!userId) {
    throw new Error('User ID not found for the authenticated user.');
  }

  return (
    <div className="mt-8">
      <AdminPageHeading title={'New Post'} />
      <CreatePostForm userId={userId} /> {/* Pass user_id */}
    </div>
  );
}

export function generateMetadata() {
  return {
    title: 'New Post — Amir Ardalan',
    description: 'Create a new blog post in the admin panel.',
  };
}
