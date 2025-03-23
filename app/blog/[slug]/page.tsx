import { createClient, createStaticClient } from '@/utils/supabase/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';
import MDXContent from '@/components/blog/MDXContent';

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

// Update the component to properly await params
export default async function BlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;

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

  const { content } = await compileMDX({
    source: post.content,
    components: useMDXComponents(),
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        development: false,
      },
    },
  });

  return (
    <article className="text-dark dark:text-light">
      <h3>By {post.author?.name || 'Unknown Author'}</h3>
      <time>
        {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <h2>{post.title}</h2>
      <MDXContent>{content}</MDXContent>
    </article>
  );
}
