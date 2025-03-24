import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import PageHeading from '@/components/ui/PageHeading';
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
      <PageHeading title={'Create New Blog Post'} />

      <CreatePostForm userId={session.user?.id || ''} />
    </div>
  );
}
