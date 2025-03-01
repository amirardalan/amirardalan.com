import { auth, signIn } from '@/auth';
import Avatar from '@/components/account/avatar';

export default async function Account() {
  const session = await auth();

  return (
    <>
      {session ? (
        <div className="mt-8">
          <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
            Account
          </h2>

          <div className="flex flex-row items-center">
            <div className="h-6 w-6">
              <Avatar />
            </div>
            <h3 className="text-s ml-2 text-dark dark:text-light">
              {session?.user?.name}
            </h3>
          </div>
        </div>
      ) : (
        <div className="flex h-[80vh] flex-row items-center justify-center text-dark dark:text-light">
          <span>
            <button
              className="cursor-pointer text-dark underline dark:text-light"
              onClick={async () => {
                'use server';
                await signIn('github');
              }}
            >
              Sign in
            </button>
          </span>
          <span>&nbsp; to view your account.</span>
        </div>
      )}
    </>
  );
}
