import { signIn } from '@/lib/auth';

interface SignedOutProps {
  message?: string;
  callbackUrl?: string;
  unauthorized?: boolean;
}

export default function SignedOut({
  message = 'to access admin panel.',
  callbackUrl,
  unauthorized = false,
}: SignedOutProps) {
  return (
    <div className="flex h-[80vh] w-full flex-row items-center justify-center text-dark dark:text-light">
      {unauthorized ? (
        <div className="text-center">
          <p className="mb-4 text-red-600 dark:text-red-400">
            Your email is not authorized to access this area.
          </p>
          <p>Please contact the administrator if you need access.</p>
        </div>
      ) : (
        <span>
          <button
            className="cursor-pointer text-dark underline dark:text-light"
            onClick={async () => {
              'use server';
              await signIn('github', {
                callbackUrl: callbackUrl || window.location.pathname,
              });
            }}
          >
            Sign in
          </button>
          <span>&nbsp; {message}</span>
        </span>
      )}
    </div>
  );
}
