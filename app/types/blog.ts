export type BlogPost = {
  id: number;
  author: string | null;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  show_updated: boolean | null;
  category: string | null;
  excerpt: string | null;
  featured: boolean | null;
  likes: number | null;
  published: boolean | null;
  slug: string;
};
