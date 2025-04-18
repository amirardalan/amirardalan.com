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

import ClientLikeCount from '@/components/blog/ClientLikeCount';
import BlogSupport from '@/components/blog/BlogSupport';
import SocialActions from '@/components/blog/SocialActions';
import AdjacentPostNavigation from '@/components/blog/AdjacentPostNavigation';

import { formatDate } from '@/utils/format-date';
import calculateReadTime from '@/utils/calculate-readtime';

import AdminPostControls from '@/components/admin/AdminPostControls';

import { auth, isAuthorizedEmail } from '@/lib/auth';

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

  if (!/^[a-z0-9-]+$/.test(slug)) {
    notFound();
  }

  let post;
  let isAdmin = false;
  try {
    post = await getPostBySlug(slug, {
      next: { tags: [`blog-post:${slug}`] }, // Tag for on-demand revalidation
    });
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    notFound();
  }

  if (!post) {
    notFound();
  }

  // Only check session for unpublished posts (drafts)
  if (!post.published) {
    const session = await auth();
    isAdmin = !!session?.user && isAuthorizedEmail(session.user.email);
    if (!isAdmin) {
      notFound();
    }
  } else {
    // For published posts, optionally check admin for controls (if needed)
    const session = await auth();
    isAdmin = !!session?.user && isAuthorizedEmail(session.user.email);
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

  return (
    <Container>
      <article className="mt-16 text-dark md:mt-24 dark:text-light">
        <div className="mb-8 flex items-center justify-between">
          {/* Render admin controls as a client component for admins */}
          {isAdmin && (
            <AdminPostControls
              slug={post.slug}
              published={post.published ?? false}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="flex flex-row text-xxs uppercase">
            {post.featured && (
              <p className="text-dynamic pr-2 text-xxs uppercase italic">
                Featured
              </p>
            )}
            <p className="pr-2 text-xxs uppercase text-primary">
              <Link
                href={`/blog?category=${encodeURIComponent(post.category?.name ?? 'uncategorized')}`}
              >
                #{post.category?.name ?? 'uncategorized'}
              </Link>
            </p>
            <span className="mr-2 text-zinc-500 dark:text-zinc-400">•</span>
            <p className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
              {calculateReadTime(post.content)}
            </p>
          </span>
          <span className="mx-4 w-full border-t-[1px] border-zinc-300 dark:border-zinc-700"></span>
          <span className="whitespace-nowrap text-xxs uppercase">
            <ClientLikeCount postId={post.id} />
          </span>
        </div>
        <h1 className="mt-8 text-3xl lg:text-4xl" id="post-title">
          {post.title}
        </h1>
        <h2
          className="mt-2 font-serif text-xl italic text-zinc-500 dark:text-zinc-400"
          id="post-excerpt"
        >
          {post.excerpt ?? ''}
        </h2>
        <div className="mt-8 flex w-full items-center justify-between text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center">
            <time
              className="text-xs uppercase"
              title={formatDate(post.created_at)}
              aria-label={`Posted on ${formatDate(post.created_at)}`}
            >
              {post.show_updated
                ? `Updated: ${formatDate(post.updated_at)}`
                : formatDate(post.created_at)}
            </time>
            <div className="mx-2 text-sm" aria-hidden="true">
              •
            </div>
            <span
              aria-label={`Author: ${post.author_name || 'Anonymous'}`}
              className="uppercase"
            >
              By {post.author_name || 'Anonymous'}
            </span>
          </div>
          <span className="flex justify-end">
            <SocialActions postId={post.id} />
          </span>
        </div>
        <div className="mdx-content mt-10" aria-labelledby="post-title">
          {content}
        </div>
        <BlogSupport postId={post.id} />
        {post.published && (adjacentPosts.previous || adjacentPosts.next) && (
          <AdjacentPostNavigation
            previous={adjacentPosts.previous}
            next={adjacentPosts.next}
          />
        )}
      </article>
    </Container>
  );
}
