import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const { NEXT_PUBLIC_URL } = process.env;

  return [
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
}
