import Link from 'next/link';

export default function AdminMenu() {
  return (
    <nav className="flex flex-wrap space-x-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
      <Link href="/admin" className="text-dark hover:underline dark:text-light">
        Dashboard
      </Link>
      <Link
        href="/admin/blog/new"
        className="text-dark hover:underline dark:text-light"
      >
        New Post
      </Link>
      <Link
        href="/admin/blog/drafts"
        className="text-dark hover:underline dark:text-light"
      >
        Drafts
      </Link>
      <Link
        href="/admin/blog/published"
        className="text-dark hover:underline dark:text-light"
      >
        Published
      </Link>
    </nav>
  );
}
