'use client';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <div className="text-md mb-12 mt-24 flex w-full pb-4 text-zinc-500 dark:text-zinc-400">
      <h1>{title}</h1> <span className="ml-1"> — Amir Ardalan</span>
    </div>
  );
}
