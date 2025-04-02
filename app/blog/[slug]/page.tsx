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
import ClientLikeCount from '@/components/blog/ClientLikeCount';
import BlogSupport from '@/components/blog/BlogSupport';

export const revalidate = false;
export const dynamicParams = true;

export async function generateStaticParams() {
  return await getAllPublishedSlugs();
}

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

export default async function BlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const session = await auth();

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

  const adjacentPosts = post.published
    ? await getAdjacentPosts(slug)
    : { previous: null, next: null };

  const isAdminView = session?.user && !post.published;

  return (
    <Container>
      <article className="mt-24 text-dark dark:text-light">
        <div className="mb-4 flex items-center justify-between">
          {session?.user && (
            <div className="text-right">
              <Link
                href={`/admin/blog/edit/${post.slug}`}
                className="inline-block rounded bg-zinc-800 px-2 py-1 text-sm text-light dark:bg-zinc-50 dark:text-dark"
              >
                Edit Post
              </Link>
            </div>
          )}
          {!post.published && (
            <div className="ml-4 inline-block rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
              Draft
            </div>
          )}
        </div>

        <p className="text-xs uppercase text-primary">
          #{post.category ?? 'uncategorized'}
        </p>
        <div
          className="mt-8 flex items-center leading-none"
          aria-label="Post metadata"
        >
          <time
            className="mr-2 text-xs uppercase leading-none text-zinc-500 dark:text-zinc-400"
            title={formatDate(post.created_at)}
            aria-label={`Posted on ${formatDate(post.created_at)}`}
          >
            {post.show_updated
              ? `Updated: ${formatDate(post.updated_at)}`
              : formatDate(post.created_at)}
          </time>
          <div className="mr-2 text-xs leading-none" aria-hidden="true">
            •
          </div>
          <ClientLikeCount postId={post.id} />
        </div>
        <h1 className="mt-8 text-3xl" id="post-title">
          {post.title}
        </h1>
        <h2
          className="mt-1 text-xl text-zinc-500 dark:text-zinc-400"
          id="post-excerpt"
        >
          {post.excerpt ?? ''}
        </h2>
        <div className="mt-6 text-xs uppercase">
          By{' '}
          <span aria-label={`Author: ${post.author_name || 'Anonymous'}`}>
            {post.author_name || 'Anonymous'}
          </span>
        </div>
        <div
          className="mdx-content mt-10 text-lg text-dark dark:text-light"
          aria-labelledby="post-title"
        >
          {content}
        </div>
        <BlogSupport postId={post.id} />
        {!isAdminView &&
          post.published &&
          (adjacentPosts.previous || adjacentPosts.next) && (
            <nav className="mt-10 border-t border-zinc-300 pt-6 dark:border-zinc-700">
              <div className="mb-4 flex justify-between">
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
