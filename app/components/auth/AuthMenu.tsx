import { auth } from '@/auth';
import Button from '@/components/ui/Button';

import SignInButton from '@/components/auth/SigninButton';

export default async function AuthMenu() {
  const session = await auth();

  return (
    <div className="flex flex-row space-x-2 text-left text-sm text-dark dark:text-light">
      {session?.user && (
        <Button type="button" url={'/admin'} text="Admin" variant="primary" />
      )}
    </div>
  );
}
