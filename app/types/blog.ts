export type BlogPost = {
  id: number;
  slug: string;
  author_id: number;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  showUpdated: boolean;
  category: string | null;
  featured: boolean | null;
  likes: number | null;
};
