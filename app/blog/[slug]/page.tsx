import { createStaticClient } from '@/utils/supabase/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/app/components/blog/MDXComponents';
import { auth } from '@/auth';
import Container from '@/components/content/Container';
import Link from 'next/link';
import { BlogService } from '@/app/lib/services/blog-service';
import { formatDate } from '@/utils/format-date';

// Disable automatic revalidation; use on-demand revalidation with revalidateTag
export const revalidate = false;

// This function generates all possible slug values at build time
export const generateStaticParams = async () => {
  // Use the static client for generating paths
  const supabase = createStaticClient();
  const { data: posts } = await supabase.from('Post').select('slug');

  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) || []
  );
};

// Separate server function for MDX compilation
async function compilePostContent(content: string) {
  const { content: compiledContent } = await compileMDX({
    source: content,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        development: false,
      },
    },
  });

  return compiledContent;
}

// Update the component to properly await params
export default async function BlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const session = await auth();

  // Fetch all published posts
  const posts = await BlogService.getPublishedPosts();

  // Find the current post and determine adjacent posts
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  const prev = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Fetch the current post details
  const post = await BlogService.getPostBySlugWithAuthor(slug);

  if (!post) {
    return <p>Post not found</p>;
  }

  // Ensure post.content exists before compilation
  if (!post.content) {
    return <p>Post content is empty</p>;
  }

  // Compile MDX content
  const content = await compilePostContent(post.content);

  return (
    <Container>
      <article className="text-dark dark:text-light">
        {session?.user && (
          <div className="mb-4 text-right">
            <Link
              href={`/admin/blog/edit/${post.slug}`}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Edit Post
            </Link>
          </div>
        )}
        <p className="text-primary">#{post.category ?? 'uncategorized'}</p>
        <h3>By {post.author?.name || 'Unknown Author'}</h3>
        <time>{formatDate(post.publishedAt)}</time>
        {!post.published && (
          <div className="my-2 inline-block rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
            Draft
          </div>
        )}
        <h2>{post.title}</h2>
        <p>{post.excerpt ?? ''}</p>
        <div className="mdx-content text-dark dark:text-light">{content}</div>
      </article>

      {/* Previous/Next Post Links */}
      <div className="mt-8 flex justify-between text-sm">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}`}
            className="text-primary hover:underline"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}`}
            className="text-primary hover:underline"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </div>
    </Container>
  );
}
