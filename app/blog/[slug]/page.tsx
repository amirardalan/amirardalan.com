import { db } from '@/app/db/connector';
import { posts, users } from '@/app/db/schema';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/app/components/blog/MDXComponents';
import { auth } from '@/auth';
import Container from '@/components/content/Container';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { formatDate } from '@/utils/format-date';

export const revalidate = false;

export const generateStaticParams = async () => {
  const slugs = await db.select({ slug: posts.slug }).from(posts);
  return slugs.map((post) => ({ slug: post.slug }));
};

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
      author_id: posts.author_id,
      author_name: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.author_id, users.id))
    .where(eq(posts.slug, slug))
    .limit(1);

  if (!post.length) {
    return <p>Post not found</p>;
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
        <h3>By {post[0].author_name || 'Unknown Author'}</h3>
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
