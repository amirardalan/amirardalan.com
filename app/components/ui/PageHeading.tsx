'use client';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <div className="text-md mb-12 flex w-full border-b-2 border-zinc-300 pb-8 text-dark dark:border-zinc-700 dark:text-light">
      <h1>{title}</h1> <span className="ml-1"> — Amir Ardalan</span>
    </div>
  );
}
