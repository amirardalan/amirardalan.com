import { auth } from '@/lib/auth';

import AdminPageHeading from '@/components/admin/AdminPageHeading';
import Avatar from '@/components/auth/Avatar';
import SignedOut from '@/components/auth/SignedOut';
import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';
import Container from '@/components/content/Container';
import Link from 'next/link';

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
    <Container>
      <div>
        <AdminPageHeading title={'Account'} />
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="h-6 w-6">
              <Avatar />
            </div>
            <p className="text-s ml-2 text-dark dark:text-light">
              {session.user?.name}
            </p>
            <Link
              href="/api/auth/signout?callbackUrl=/&redirect=false"
              className="ml-2 text-xxs uppercase text-primary"
            >
              Sign Out
            </Link>
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
    </Container>
  );
}
