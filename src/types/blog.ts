export type BlogPost = {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  slug: string;
  category?: string | null;
  published: boolean | null;
  created_at: Date;
  updated_at?: Date;
  user_id: number;
  author_name?: string | null;
  show_updated?: boolean | null;
  featured: boolean | null;
  isDraft?: boolean;
  user_name?: string | null;
};
