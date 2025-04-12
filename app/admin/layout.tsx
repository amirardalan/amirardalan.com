import { auth } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/ToastContext';

import SignedOut from '@/components/auth/SignedOut';
import AdminMenu from '@/components/admin/AdminMenu';

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
      <div className="mb-6 flex w-full flex-col">
        <AdminMenu />
        <div>{children}</div>
      </div>
    </ToastProvider>
  );
}
