import BlogPosts from '@/components/blog/BlogPosts';

export default function Blog() {
  return (
    <main>
      <div className="mt-8">
        <h2 className="mb-6 border-b-2 border-solid border-gray-300 pb-4 text-xxl text-dark dark:border-gray-600 dark:text-light">
          Blog
        </h2>
        <BlogPosts />
      </div>
    </main>
  );
}
