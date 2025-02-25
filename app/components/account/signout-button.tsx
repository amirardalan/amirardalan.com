'use client';

import { signOut } from 'next-auth/react';
import Button from '@/components/ui/button';

export default function SignOutButton() {
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await signOut({
          callbackUrl: '/',
        });
      }}
    >
      <Button type="submit" text="Sign Out" />
    </form>
  );
}
