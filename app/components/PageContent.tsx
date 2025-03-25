'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import TypingAnimation from '@/components/content/TypingAnimation';

export default function PageContent() {
  return (
    <div className="flex w-full flex-col">
      <div className="mt-8 flex flex-col">
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
      <div>
        <div className="items-left mt-4 flex justify-start space-x-2 py-8 text-left text-xl">
          <span className="text-primary">{'> ~ %'}</span>
          <TypingAnimation />
        </div>
      </div>
    </div>
  );
}
