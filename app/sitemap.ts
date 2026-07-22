import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap() {
  const posts = getAllPosts();
  const SITE_URL = 'https://finedge.cc.cd';

  const postEntries = posts.map(post => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.date || '2026-07-16'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date('2026-07-16'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date('2026-07-16'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date('2026-07-16'),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...postEntries,
  ];
}
