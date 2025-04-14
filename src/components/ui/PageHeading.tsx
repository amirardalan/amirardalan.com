'use client';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <div className="text-md mb-8 mt-16 flex w-full pb-4 font-medium text-zinc-500 lg:mb-12 lg:mt-24 dark:text-zinc-400">
      <h1>{title}</h1> <span className="ml-1"> — Amir Ardalan</span>
    </div>
  );
}
