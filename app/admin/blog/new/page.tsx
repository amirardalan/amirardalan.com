import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import CreatePostForm from '@/components/blog/CreatePostForm';

export default async function NewBlogPost() {
  // Check if user is authenticated
  const session = await auth();

  // Redirect to sign-in if not authenticated
  if (!session?.user) {
    redirect('/api/auth/signin?callbackUrl=/admin/blog/new');
  }

  return (
    <div className="mt-8">
      <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
        Create New Blog Post
      </h2>

      <CreatePostForm userId={session.user?.id || ''} />
    </div>
  );
}
