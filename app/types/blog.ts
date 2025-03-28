export type BlogPost = {
  id: number;
  slug: string;
  authorId: number;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  created_at: string; // Ensure this matches the format being sent
  updated_at: string; // Ensure this matches the format being sent
  showUpdated: boolean;
  category: string | null;
  featured: boolean | null;
  likes: number | null;
};
