import { auth } from '@/auth';
import Button from '@/components/ui/Button';

import SignInButton from '@/components/auth/SigninButton';

export default async function AuthMenu() {
  const session = await auth();

  return (
    <div className="ml-6 flex flex-row space-x-2 text-left text-sm text-dark dark:text-light">
      {session?.user && (
        <Button
          type="button"
          url={'/admin'}
          text="Admin"
          variant="primary"
          size="default"
        />
      )}
    </div>
  );
}
