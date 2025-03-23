import { createClient } from '@/utils/supabase/server';

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('Post')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
