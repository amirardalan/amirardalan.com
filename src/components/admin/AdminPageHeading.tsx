import User from '@/components/account/User';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <div className="flex pb-4 text-md text-dark text-zinc-500 dark:text-zinc-400">
      <div className="flex w-full items-center justify-between">
        <h1>{title}</h1>
        <User />
      </div>
    </div>
  );
}
