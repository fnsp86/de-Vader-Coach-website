import type { MetadataRoute } from 'next';
import { POSTS_LIST } from '@/lib/blog-posts';
import { EXPERIENCE_DAYS } from '@/lib/experience';

const BASE = 'https://devadercoach.nl';

const COURSE_SLUGS = [
  'aanwezig-vaderschap',
  'emotiecoaching-voor-vaders',
  'zelfregulatie-als-vader',
  'grenzen-stellen-met-liefde',
  'autonomie-en-loslaten',
  'herstel-na-conflict',
  'verbinding-met-je-tiener',
  'reflectief-vaderschap',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/cursussen`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/experience`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/over`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/app-download`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/voorwaarden`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const coursePages: MetadataRoute.Sitemap = COURSE_SLUGS.map((slug) => ({
    url: `${BASE}/cursussen/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Static blog posts
  const blogPages: MetadataRoute.Sitemap = POSTS_LIST.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic blog posts from Redis
  let dynamicBlogPages: MetadataRoute.Sitemap = [];
  try {
    const { getAllDynamicBlogPosts } = await import('@/lib/blog-storage');
    const dynamicPosts = await getAllDynamicBlogPosts();
    dynamicBlogPages = dynamicPosts
      .filter((p) => p.published)
      .map((post) => ({
        url: `${BASE}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.date,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
  } catch {}

  const experiencePages: MetadataRoute.Sitemap = EXPERIENCE_DAYS.map((day) => ({
    url: `${BASE}/experience/dag/${day.dag}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...coursePages, ...blogPages, ...dynamicBlogPages, ...experiencePages];
}
