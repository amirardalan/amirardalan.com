type PageHeadingProps = {
  title: string;
};

export default function PageHeading({ title }: PageHeadingProps) {
  return (
    <h2 className="mb-6 border-b-2 border-solid border-zinc-500 pb-4 text-xxl text-dark dark:border-zinc-400 dark:text-light">
      {title}
    </h2>
  );
}
