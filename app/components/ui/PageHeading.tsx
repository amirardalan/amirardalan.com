'use client';

type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <div className="text-md mb-12 flex w-full pb-4 text-dark dark:text-light">
      <h1>{title}</h1> <span className="ml-1"> — Amir Ardalan</span>
    </div>
  );
}
