import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/tools/', '/experience/toegang/', '/experience/profiel/', '/cursussen/bedankt/'],
    },
    sitemap: 'https://devadercoach.nl/sitemap.xml',
  };
}
