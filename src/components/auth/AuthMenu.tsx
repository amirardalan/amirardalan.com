'use client';

import { useAuth } from '@/components/auth/AuthProvider';
import Button from '@/components/ui/Button';

export default function AuthMenu() {
  const { session } = useAuth();

  return (
    <>
      {session?.user && (
        <div className="flex flex-row text-left text-sm text-dark md:ml-6 dark:text-light">
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
