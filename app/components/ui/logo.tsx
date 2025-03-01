import Link from 'next/link';
import clsx from 'clsx';

type LogoProps = {
  fontSize?: string;
};

export default function Logo({ fontSize }: LogoProps) {
  return (
    <div className="flex items-center">
      <Link href="/">
        <h1
          className={clsx(
            fontSize ?? 'text-4xl',
            'font-serif italic text-dark dark:text-light'
          )}
        >
          Amir Ardalan
        </h1>
      </Link>
    </div>
  );
}
