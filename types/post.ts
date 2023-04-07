export interface PostProps {
  id: number;
  category: string;
  publishedAt: Date;
  content: string;
  slug: string;
  title: string;
  teaser: string;
  published: boolean;
  featured: string;
  showEdited: boolean;
  editedAt: Date;
  postHistory: { editedAt: Date }[];
  author: number & { name: string };
  likes: number;
}
