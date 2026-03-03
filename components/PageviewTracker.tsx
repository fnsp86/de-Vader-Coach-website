'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageviewTracker() {
  const pathname = usePathname();
  const lastPath = useRef('');

  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;

    // Don't track admin pages
    if (pathname.startsWith('/admin')) return;

    // Custom Redis analytics
    fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer,
      }),
    }).catch(() => {});

    // GA4 pageview (initial page already tracked by gtag config)
    (window as any).gtag?.('event', 'page_view', { page_path: pathname });

    // Facebook Pixel pageview
    (window as any).fbq?.('track', 'PageView');
  }, [pathname]);

  return null;
}
