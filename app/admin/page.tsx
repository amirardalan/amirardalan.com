import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="mt-8">
      <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 p-6 shadow-md dark:border-gray-700">
          <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
            Blog Management
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Create and manage blog posts
          </p>
          <Link
            href="/admin/blog/new"
            className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Create New Post
          </Link>
        </div>

        <div className="rounded-lg border border-gray-200 p-6 shadow-md dark:border-gray-700">
          <h3 className="mb-3 text-lg font-medium text-dark dark:text-light">
            Drafts
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            Manage your draft posts
          </p>
          <Link
            href="/admin/drafts"
            className="mr-4 inline-block rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700"
          >
            View Drafts
          </Link>
          <Link
            href="/admin/blog/new?draft=true"
            className="mt-2 inline-block rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
          >
            Create New Draft
          </Link>
        </div>
      </div>
    </div>
  );
}
