type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <h1 className="mb-6 border-b-2 border-solid border-zinc-200 pb-4 text-xxl text-dark dark:border-zinc-500 dark:text-light">
      {title}
    </h1>
  );
}
