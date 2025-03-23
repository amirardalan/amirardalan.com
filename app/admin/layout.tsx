import { auth } from '@/auth';
import SignedOut from '@/app/components/auth/signed-out';

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
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-dark dark:text-light">
          Admin Dashboard
        </h1>
      </div>
      {children}
    </main>
  );
}
