import Link from 'next/link';

export default function BlogActions() {
  return (
    <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
          Create New Post
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-300">
          Write a new post
        </p>
        <Link
          href="/admin/blog/new"
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Post
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
          Manage Drafts
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-300">
          Manage draft posts
        </p>
        <Link
          href="/admin/blog/drafts"
          className="inline-block rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
        >
          View Drafts
        </Link>
      </div>

      <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
        <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
          Published Posts
        </h3>
        <p className="mb-4 text-xs text-zinc-600 dark:text-zinc-300">
          Manage published posts
        </p>
        <Link
          href="/admin/blog/published"
          className="inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          View Posts
        </Link>
      </div>
    </div>
  );
}
