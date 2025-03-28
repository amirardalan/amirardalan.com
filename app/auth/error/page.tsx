'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center text-dark dark:text-light">
      <h1 className="mb-4 text-xl font-bold">Authentication Error</h1>

      {error === 'AccessDenied' && (
        <div className="text-center">
          <p className="mb-4 text-red-600 dark:text-red-400">
            Your email is not on our allowlist.
          </p>
          <p className="mb-4">
            If you believe this is a mistake, please contact the site
            administrator.
          </p>
        </div>
      )}

      {error !== 'AccessDenied' && (
        <p className="mb-4">
          There was a problem signing you in. Please try again later.
        </p>
      )}

      <Link href="/" className="text-blue-600 underline dark:text-blue-400">
        Return to home page
      </Link>
    </div>
  );
}
