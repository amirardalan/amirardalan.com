import { auth } from '@/src/auth/auth';
import SignedOut from '@/components/auth/SignedOut';
import Container from '@/components/content/Container';
import AdminMenu from '@/components/admin/AdminMenu';
import { ToastProvider } from '@/components/ui/ToastContext';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    return <SignedOut callbackUrl="/admin" message="to access admin panel." />;
  }

  return (
    <ToastProvider>
      <Container>
        <div className="mb-6">
          <AdminMenu />
        </div>
        <div>{children}</div>
      </Container>
    </ToastProvider>
  );
}
