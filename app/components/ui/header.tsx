import AuthMenu from '@/components/auth/AuthMenu';
import Logo from '@/components/ui/Logo';
import Link from 'next/link';
import HeaderControls from '@/app/components/ui/HeaderControls';

export default async function Header() {
  return (
    <div className="flex flex-row justify-between">
      <Link href="/" className="mt-2">
        <Logo fontSize={'text-4xl'} logoText={'Amir Ardalan'} />
      </Link>
      <div className="flex flex-1 justify-end">
        <HeaderControls />
        <AuthMenu />
      </div>
    </div>
  );
}
