import { auth } from '@/auth';
import Image from 'next/image';

export default async function Avatar() {
  const session = await auth();
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
