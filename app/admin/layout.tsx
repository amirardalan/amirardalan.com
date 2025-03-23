import { auth } from '@/auth';
import SignedOut from '@/components/auth/SignedOut';

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

  return <main className="container mx-auto w-full px-4 py-8">{children}</main>;
}
