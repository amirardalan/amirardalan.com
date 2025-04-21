import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/db/queries/posts';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { NEXT_PUBLIC_URL } = process.env;

  const posts = await getPublishedPosts({
    next: { tags: ['sitemap'] },
  });

  const baseEntries: MetadataRoute.Sitemap = [
    {
      url: `${NEXT_PUBLIC_URL}`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${NEXT_PUBLIC_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${NEXT_PUBLIC_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${NEXT_PUBLIC_URL}/uses`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const blogPostEntries = posts.map((post) => ({
    url: `${NEXT_PUBLIC_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...baseEntries, ...blogPostEntries];
}
