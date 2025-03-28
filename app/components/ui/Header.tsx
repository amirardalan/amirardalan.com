import AuthMenu from '@/components/auth/AuthMenu';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import HeaderControls from '@/components/ui/HeaderControls';

export default async function Header() {
  return (
    <div className="flex flex-row justify-between">
      <Link href="/" className="mt-2">
        <Logo size={35} />
      </Link>
      <div className="flex w-full max-w-screen-xl items-center justify-end space-x-4">
        {/* Ensure proper alignment */}
        <HeaderControls />
        <AuthMenu />
      </div>
    </div>
  );
}
