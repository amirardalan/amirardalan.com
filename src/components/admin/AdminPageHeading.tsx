import User from '@/components/admin/User';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <div className="text-md mb-6 flex w-full pb-4 text-dark text-zinc-500 dark:text-zinc-400">
      <div className="flex w-full items-center justify-between">
        <h1>{title}</h1>
        <User />
      </div>
    </div>
  );
}
