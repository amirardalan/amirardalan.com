export type BlogPost = {
  id: number;
  slug: string;
  author: string;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at?: string;
  show_updated?: boolean;
  category?: string | null;
  featured?: boolean | null;
  likes?: number | null;
};
