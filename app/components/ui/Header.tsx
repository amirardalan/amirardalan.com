import AuthMenu from '@/components/auth/AuthMenu';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import HeaderControls from '@/app/components/ui/HeaderControls';

export default async function Header() {
  return (
    <div className="flex flex-row justify-between">
      <Link href="/" className="mt-2">
        <Logo size={35} />
      </Link>
      <div className="flex items-center">
        <HeaderControls />
        <AuthMenu />
      </div>
    </div>
  );
}
