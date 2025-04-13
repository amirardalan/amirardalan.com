'use client';

import { useAuth } from '@/context/AuthProvider';
import Image from 'next/image';

export default function Avatar() {
  const { session } = useAuth();

  return (
    <Image
      src={session?.user?.image ?? '/default-avatar.png'}
      alt="Profile"
      width={128}
      height={128}
      className="rounded-full"
      priority={true}
    />
  );
}
