import Link from 'next/link';
import clsx from 'clsx';

type LogoProps = {
  fontSize: string;
  logoText: string;
};

export default function Logo({ fontSize, logoText }: LogoProps) {
  return (
    <div className="flex items-center">
      <Link href="/">
        <h1
          className={clsx(
            fontSize,
            'font-serif tracking-wide text-dark dark:text-light'
          )}
        >
          {logoText}
        </h1>
      </Link>
    </div>
  );
}
