import User from '@/components/admin/User';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <div className="text-md mb-6 flex w-full border-b-2 border-zinc-400 pb-4 text-dark dark:border-zinc-600 dark:text-light">
      <div className="flex w-full items-center justify-between">
        <h1>{title}</h1>
        <User />
      </div>
    </div>
  );
}
