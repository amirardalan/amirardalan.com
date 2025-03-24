import { createClient, createStaticClient } from '@/utils/supabase/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/mdx-components';
import { auth } from '@/auth';
import Link from 'next/link';

// This enables static generation while allowing revalidation
export const revalidate = false; // Only revalidate on-demand

// This function generates all possible slug values at build time
export async function generateStaticParams() {
  // Use the static client for generating paths
  const supabase = createStaticClient();
  const { data: posts } = await supabase.from('Post').select('slug');

  return (
    posts?.map((post) => ({
      slug: post.slug,
    })) || []
  );
}

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

  // Use the regular client for request-scoped operations
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('Post')
    .select('*, author:users(name)')
    .eq('slug', slug)
    .single();

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
      <p className="text-green-400">#{post.category ?? 'uncategorized'}</p>
      <h3>By {post.author?.name || 'Unknown Author'}</h3>
      <time>
        {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      {!post.published && (
        <div className="my-2 inline-block rounded bg-yellow-200 px-2 py-1 text-sm text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
          Draft
        </div>
      )}
      <h2>{post.title}</h2>
      <p>{post.excerpt ?? ''}</p>
      <div className="mdx-content">{content}</div>
    </article>
  );
}
