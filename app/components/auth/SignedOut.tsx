import { signIn } from '@/auth';

interface SignedOutProps {
  message?: string;
  callbackUrl?: string;
}

export default function SignedOut({
  message = 'to access admin panel.',
  callbackUrl,
}: SignedOutProps) {
  return (
    <div className="flex h-[80vh] flex-row items-center justify-center text-dark dark:text-light">
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
      </span>
      <span>&nbsp; {message}</span>
    </div>
  );
}
