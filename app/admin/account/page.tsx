import { auth } from '@/lib/auth';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import Avatar from '@/components/auth/Avatar';
import SignedOut from '@/components/auth/SignedOut';
import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';

export function generateMetadata() {
  return {
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
    title: 'Account — Amir Ardalan',
    description: 'View and manage your account details.',
  };
}

export default async function Account() {
  const session = await auth();

  if (!session) {
    return <SignedOut message="to view your account." callbackUrl="/account" />;
  }

  return (
    <div className="mx-10 mt-8">
      <AdminPageHeading title={'Account'} />
      <div className="flex flex-col">
        <div className="flex">
          <div className="h-6 w-6">
            <Avatar />
          </div>
          <p className="text-s ml-2 text-dark dark:text-light">
            {session.user?.name}
          </p>
        </div>
        <div className="mt-1 flex flex-row items-center text-dark dark:text-light">
          <span>Email:</span>
          <span>
            {session.user?.email && (
              <ObfuscatedEmail email={session.user.email} />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
