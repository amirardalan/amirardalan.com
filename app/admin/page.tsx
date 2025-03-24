import Link from 'next/link';
import PageHeading from '@/components/ui/PageHeading';

export default function AdminDashboard() {
  return (
    <div className="mt-8">
      <PageHeading title={'Admin Dashboard'} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
          <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
            Blog Management
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-300">
            Compose a new blog post
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
            Drafts
          </h3>
          <p className="mb-4 text-zinc-600 dark:text-zinc-300">
            Manage unpublished drafts
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
          <p className="mb-4 text-zinc-600 dark:text-zinc-300">
            Manage published content
          </p>
          <Link
            href="/admin/blog/published"
            className="inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            View Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
