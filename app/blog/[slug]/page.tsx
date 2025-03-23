import { createClient } from '@/utils/supabase/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import MDXContent from '@/components/blog/MDXContent';

export default async function BlogPost({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await paramsPromise;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('Post')
    .select('*, author:users(name)')
    .eq('slug', slug)
    .single();

  if (!post) {
    return <p>Post not found</p>;
  }

  const { content } = await compileMDX({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        development: false,
      },
    },
  });

  return (
    <article className="text-dark dark:text-light">
      <h3>By {post.author?.name}</h3>
      <time>
        {new Date(post.publishedAt).toLocaleDateString('en-US', {
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
