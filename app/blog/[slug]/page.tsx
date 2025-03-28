import { db } from '@/db/connector';
import { posts, users } from '@/db/schema';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/blog/MDXComponents';
import { auth } from '@/auth';
import Container from '@/components/content/Container';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { formatDate } from '@/utils/format-date';
import { notFound } from 'next/navigation';

// Set revalidate to false for on-demand revalidation only
export const revalidate = false;

// Allow fallback to true to enable on-demand ISR
export const dynamicParams = true;

export async function generateStaticParams() {
  const publishedPosts = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.published, true));

  return publishedPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata with tag-based revalidation support
export async function generateMetadata({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

  const post = await db
    .select({ title: posts.title, excerpt: posts.excerpt })
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!post.length) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post[0].title} — Amir Ardalan`,
    description: post[0].excerpt || 'Read this article on the blog',
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

  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      excerpt: posts.excerpt,
      slug: posts.slug,
      category: posts.category,
      published: posts.published,
      created_at: posts.created_at,
      updated_at: posts.updated_at,
      show_updated: posts.show_updated,
      author_name: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.user_id, users.id))
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!post.length) {
    notFound();
  }

  const content = await compilePostContent(post[0].content);

  return (
    <Container>
      <article className="text-dark dark:text-light">
        {session?.user && (
          <div className="mb-4 text-right">
            <Link
              href={`/admin/blog/edit/${post[0].slug}`}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              Edit Post
            </Link>
          </div>
        )}
        <p className="text-primary">#{post[0].category ?? 'uncategorized'}</p>
        <h3>By {post[0].author_name || 'Anonymous'}</h3>{' '}
        <time>{formatDate(post[0].created_at)}</time>
        {!post[0].published && (
          <div className="my-2 inline-block rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
            Draft
          </div>
        )}
        <h2>{post[0].title}</h2>
        <p>{post[0].excerpt ?? ''}</p>
        <div className="mdx-content text-dark dark:text-light">{content}</div>
      </article>
    </Container>
  );
}
