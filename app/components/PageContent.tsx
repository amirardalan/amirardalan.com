'use client';
import Image from 'next/image';
import Tooltip from '@/components/ui/Tooltip';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function PageContent() {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="mb-6 flex w-full justify-center">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={125}
          height={125}
          className="flex justify-center rounded-full"
          priority={true}
        />
      </div>
      <div className="text-s mt-5 font-sans text-gray-600 dark:text-gray-500">
        Frontend Engineer & UI/UX Expert
      </div>
      <div className="mt-8 flex space-x-4">
        <Link href="/blog">
          <Button text="Blog" variant="primary" size="large" />
        </Link>
        <Link href="/about">
          <Button text="About" variant="secondary" size="large" />
        </Link>
      </div>
    </div>
  );
}
