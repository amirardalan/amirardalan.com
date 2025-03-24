import { auth } from '@/auth';
import SignedOut from '@/components/auth/SignedOut';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const session = await auth();

  // Show SignedOut component if not authenticated
  if (!session?.user) {
    return <SignedOut callbackUrl="/admin" message="to access admin panel." />;
  }

  return (
    <div className="container mx-auto w-full px-4 py-8">
      <div className="mb-6">
        <nav className="flex flex-wrap space-x-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <Link
            href="/admin"
            className="text-dark hover:underline dark:text-light"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/blog/new"
            className="text-dark hover:underline dark:text-light"
          >
            New Post
          </Link>
          <Link
            href="/admin/blog/drafts"
            className="text-dark hover:underline dark:text-light"
          >
            Drafts
          </Link>
          <Link
            href="/admin/blog/published"
            className="text-dark hover:underline dark:text-light"
          >
            Published
          </Link>
        </nav>
      </div>
      <main>{children}</main>
    </div>
  );
}
