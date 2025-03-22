import { createClient } from '@/utils/supabase/server';
export default async function BlogPosts() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from('Post').select();
  return (
    <div className="text-dark dark:text-light">
      {JSON.stringify(posts, null, 2)}
    </div>
  );
}
