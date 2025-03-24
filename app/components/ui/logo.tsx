import clsx from 'clsx';

type LogoProps = {
  fontSize: string;
  logoText: string;
};

export default function Logo({ fontSize, logoText }: LogoProps) {
  return (
    <span
      className={clsx(
        fontSize,
        'align-text-bottom font-serif leading-none tracking-wide text-dark dark:text-light'
      )}
    >
      {logoText}
    </span>
  );
}
