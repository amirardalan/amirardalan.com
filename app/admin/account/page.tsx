import { auth } from '@/auth';
import PageHeading from '@/components/ui/PageHeading';
import Avatar from '@/components/auth/Avatar';
import SignedOut from '@/components/auth/SignedOut';
import { ObfuscatedEmail } from '@/components/ui/ObfuscatedEmail';

export default async function Account() {
  const session = await auth();

  if (!session) {
    return <SignedOut message="to view your account." callbackUrl="/account" />;
  }

  return (
    <div className="mt-8">
      <PageHeading title={'Account'} />
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex">
          <div className="h-6 w-6">
            <Avatar />
          </div>
          <p className="text-s ml-2 text-dark dark:text-light">
            {session.user?.name}
          </p>
        </div>
        <div className="ml-2 flex flex-row items-center justify-between">
          {session.user?.email && (
            <ObfuscatedEmail email={session.user.email} />
          )}
        </div>
      </div>
    </div>
  );
}
