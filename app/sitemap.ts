import type { MetadataRoute } from 'next';
import { EXPERIENCE_DAYS } from '@/lib/experience';

const BASE = 'https://devadercoach.nl';

const BLOG_SLUGS = [
  'aanwezig-zijn-voor-kind',
  'driftbuien-begrijpen',
  'grenzen-zonder-schreeuwen',
  'herstellen-na-fout',
  'waarom-je-kind-je-triggers',
  'loslaten-zonder-angst',
  'praten-met-je-tiener',
  'reflecteren-als-vader',
  'kind-luistert-niet',
  'peuter-driftbui-wat-doen',
  'schuldgevoel-als-vader',
  'vader-burn-out-opvoeding',
  'quality-time-kind',
  'kind-bang-in-donker',
  'scheiden-en-vader-zijn',
  'puber-telefoon-verslaving',
  'nieuwe-baby-als-vader',
  'kind-slaat-andere-kinderen',
  'vader-eigen-emoties',
  'huiswerk-strijd',
  'kind-wil-niet-naar-school',
  'stiefvader-tips',
  'vader-kind-weekendvader',
];

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

export default function sitemap(): MetadataRoute.Sitemap {
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

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const experiencePages: MetadataRoute.Sitemap = EXPERIENCE_DAYS.map((day) => ({
    url: `${BASE}/experience/dag/${day.dag}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...coursePages, ...blogPages, ...experiencePages];
}
