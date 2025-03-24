import { auth } from '@/auth';
import PageHeading from '@/components/ui/PageHeading';
import Avatar from '@/components/auth/Avatar';
import SignedOut from '@/components/auth/SignedOut';

export default async function Account() {
  const session = await auth();

  if (!session) {
    return <SignedOut message="to view your account." callbackUrl="/account" />;
  }

  return (
    <div className="mt-8">
      <PageHeading title={'Account'} />
      <div className="flex flex-row items-center">
        <div className="h-6 w-6">
          <Avatar />
        </div>
        <h3 className="text-s ml-2 text-dark dark:text-light">
          {session.user?.name}
        </h3>
      </div>
    </div>
  );
}
