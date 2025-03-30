'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import Button from '@/components/ui/Button';

export default function AuthMenu() {
  const { session } = useAuth();

  return (
    <>
      {session?.user && (
        <div className="flex flex-row space-x-2 pl-6 text-left text-sm text-dark dark:text-light">
          <Button
            type="button"
            url={'/admin'}
            text="Admin"
            variant="primary"
            size="default"
          />
        </div>
      )}
    </>
  );
}
