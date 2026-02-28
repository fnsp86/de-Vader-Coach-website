import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'De Vadercoach',
    short_name: 'Vadercoach',
    description: 'Word elke dag een betere vader',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F1117',
    theme_color: '#F59E0B',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
