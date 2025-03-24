import { auth } from '@/auth';
import SignedOut from '@/components/auth/SignedOut';
import AdminMenu from '@/components/admin/AdminMenu';

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
    <div className="container mx-auto w-full px-4 pt-4 lg:px-8 lg:pt-8">
      <div className="mb-6">
        <AdminMenu />
      </div>
      <main>{children}</main>
    </div>
  );
}
