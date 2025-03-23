import { createClient } from '@/utils/supabase/server';

export default async function BlogPosts() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from('Post').select();
  return (
    <div className="text-dark dark:text-light">
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
