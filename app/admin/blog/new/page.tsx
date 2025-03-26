import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import PageHeading from '@/app/components/ui/PageHeading';
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
      <PageHeading title={'New Post'} />

      <CreatePostForm userId={session.user?.id || ''} />
    </div>
  );
}

export function generateMetadata() {
  return {
    title: 'New Post — Amir Ardalan',
    description: 'Create a new blog post in the admin panel.',
  };
}
