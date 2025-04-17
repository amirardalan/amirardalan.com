import Link from 'next/link';

export default function AdminActions() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
          Compose New
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-300">
          Compose a new blog post
        </p>
        <Link
          href="/admin/blog/new"
          className="inline-block rounded-md bg-dark px-4 py-2 text-xs uppercase text-light dark:bg-light dark:text-dark"
        >
          Create Post
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
          Manage Drafts
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-300">
          Manage unpublished draft posts
        </p>
        <Link
          href="/admin/blog/drafts"
          className="inline-block rounded-md bg-dark px-4 py-2 text-xs uppercase text-light dark:bg-light dark:text-dark"
        >
          View Drafts
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
          View Published
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-300">
          Manage published blog posts
        </p>
        <Link
          href="/admin/blog/published"
          className="inline-block rounded-md bg-dark px-4 py-2 text-xs uppercase text-light dark:bg-light dark:text-dark"
        >
          View Posts
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
          Manage Categories
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-300">
          Manage blog categories
        </p>
        <Link
          href="/admin/blog/categories"
          className="inline-block rounded-md bg-dark px-4 py-2 text-xs uppercase text-light dark:bg-light dark:text-dark"
        >
          Edit Categories
        </Link>
      </div>
    </div>
  );
}
