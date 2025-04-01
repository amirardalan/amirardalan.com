import { auth } from '@/auth';
import { notFound } from 'next/navigation';

import {
  getAllPublishedSlugs,
  getPostBySlug,
  getAdjacentPosts,
} from '@/db/queries/posts';

import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/blog/MDXComponents';

import Container from '@/components/content/Container';
import Link from 'next/link';

import { formatDate } from '@/utils/format-date';
import BlogPostStats from '@/components/blog/BlogPostStats';

// Set revalidate to false for on-demand revalidation only
export const revalidate = false;

// Allow fallback to true to enable on-demand ISR
export const dynamicParams = true;

export async function generateStaticParams() {
  return await getAllPublishedSlugs();
}

// Generate metadata with tag-based revalidation support
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      metadataBase: new URL(`${process.env.NEXT_PUBLIC_URL}`),
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} — Amir Ardalan`,
    description: post.excerpt || 'Read this article on the blog',
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

async function compilePostContent(content: string) {
  const { content: compiledContent } = await compileMDX({
    source: content,
    components, // Ensure components are server-compatible
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        development: false,
      },
    },
  });

  return compiledContent;
}

// No changes needed - keeping this as a server component with direct auth() call
export default async function BlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const session = await auth(); // Direct server-side auth check is appropriate here

  if (!/^[a-z0-9-]+$/.test(slug)) {
    notFound();
  }

  let post;
  try {
    post = await getPostBySlug(slug);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  // Restrict access to unpublished posts
  if (!post.published && !session?.user) {
    notFound();
  }

  let content;
  try {
    content = await compilePostContent(post.content);
  } catch (error) {
    console.error('Error compiling post content:', error);
    content = '<p>Error loading content.</p>';
  }

  // Only fetch adjacent posts if the current post is published
  const adjacentPosts = post.published
    ? await getAdjacentPosts(slug)
    : { previous: null, next: null };

  // Check if we're in admin view based on the referrer or user session
  const isAdminView = session?.user && !post.published;

  return (
    <Container>
      <article className="mt-24 text-dark dark:text-light">
        {session?.user && (
          <div className="text-right">
            <Link
              href={`/admin/blog/edit/${post.slug}`}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Edit Post
            </Link>
          </div>
        )}
        <BlogPostStats slug={slug} postId={post.id} />
        <p className="text-xs uppercase text-primary">
          #{post.category ?? 'uncategorized'}
        </p>
        <h3 className="mt-1 text-xs uppercase">
          By {post.author_name || 'Anonymous'}
        </h3>
        <time className="mt-8 flex text-xs uppercase text-zinc-500 dark:text-zinc-400">
          {post.show_updated
            ? `Updated: ${formatDate(post.updated_at)}`
            : formatDate(post.created_at)}
        </time>
        {!post.published && (
          <div className="my-2 inline-block rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
            Draft
          </div>
        )}
        <h2 className="mt-8 text-3xl">{post.title}</h2>
        <p className="mt-1 text-lg text-zinc-500 dark:text-zinc-400">
          {post.excerpt ?? ''}
        </p>
        <div className="mdx-content mt-10 text-dark dark:text-light">
          {content}
        </div>
        {/* Blog Navigation - Show only for published posts and not in admin view */}
        {!isAdminView &&
          post.published &&
          (adjacentPosts.previous || adjacentPosts.next) && (
            <nav className="mt-10 border-t border-gray-200 pt-6 dark:border-gray-700">
              <div className="flex justify-between">
                <div>
                  {adjacentPosts.previous && (
                    <Link
                      href={`/blog/${adjacentPosts.previous.slug}`}
                      className="group flex items-center space-x-2 hover:text-primary"
                    >
                      <span aria-hidden="true">&larr;</span>
                      <span
                        className="max-w-[15rem] truncate"
                        title={adjacentPosts.previous.title}
                      >
                        {adjacentPosts.previous.title}
                      </span>
                    </Link>
                  )}
                </div>

                <div>
                  {adjacentPosts.next && (
                    <Link
                      href={`/blog/${adjacentPosts.next.slug}`}
                      className="group flex items-center space-x-2 text-right hover:text-primary"
                    >
                      <span
                        className="max-w-[15rem] truncate"
                        title={adjacentPosts.next.title}
                      >
                        {adjacentPosts.next.title}
                      </span>
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          )}
      </article>
    </Container>
  );
}
