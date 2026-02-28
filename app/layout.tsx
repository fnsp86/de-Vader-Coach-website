import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageviewTracker from '@/components/PageviewTracker';

export const metadata: Metadata = {
  title: {
    default: 'De Vadercoach | Word elke dag een betere vader',
    template: '%s | De Vadercoach',
  },
  description:
    'Praktische opvoedcursussen, een 22-daagse Experience en een app speciaal voor vaders. Leer omgaan met driftbuien, grenzen stellen, emotiecoaching en meer. Gebaseerd op wetenschap, door vaders, voor vaders.',
  keywords: [
    'vaderschap', 'opvoedtips', 'vader worden', 'opvoedcursus', 'betere vader',
    'grenzen stellen kind', 'driftbui peuter', 'emotiecoaching', 'positief opvoeden',
    'vader tips', 'kind luistert niet', 'opvoeding vader', 'betrokken vaderschap',
    'online opvoedcursus', 'vader kind relatie', 'zelfregulatie ouder',
    'omgaan met driftbuien', 'hoe word ik een goede vader', 'opvoedvaardigheden',
    'vadercoach', 'vader experience', 'opvoedboek vaders',
  ],
  metadataBase: new URL('https://devadercoach.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'De Vadercoach',
    url: 'https://devadercoach.nl',
    title: 'De Vadercoach | Word elke dag een betere vader',
    description:
      'Praktische opvoedcursussen, een 22-daagse Experience en een app speciaal voor vaders. Gebaseerd op wetenschap, door vaders, voor vaders.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'De Vadercoach | Word elke dag een betere vader',
    description:
      'Praktische opvoedcursussen en tools voor vaders. Leer omgaan met driftbuien, grenzen stellen en emotiecoaching.',
  },
  alternates: {
    canonical: 'https://devadercoach.nl',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')==='light')document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'De Vadercoach',
              url: 'https://devadercoach.nl',
              logo: 'https://devadercoach.nl/icon-512.png',
              description:
                'Praktische opvoedcursussen, een 22-daagse Vader Experience en een app voor vaders. Leer grenzen stellen, omgaan met driftbuien, emotiecoaching en meer. Wetenschappelijk onderbouwd door Gottman, Bowlby en Fonagy.',
              sameAs: ['https://instagram.com/devadercoach.nl'],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'info@devadercoach.nl',
                contactType: 'customer service',
                availableLanguage: 'Dutch',
              },
              offers: [
                {
                  '@type': 'Offer',
                  name: 'De Vader Experience',
                  description: '22-daagse reis door 8 opvoedvaardigheden',
                  price: '19.99',
                  priceCurrency: 'EUR',
                  url: 'https://devadercoach.nl/experience',
                },
                {
                  '@type': 'Offer',
                  name: 'Cursussen bundel',
                  description: 'Alle 8 verdiepende PDF-werkboeken',
                  price: '39.99',
                  priceCurrency: 'EUR',
                  url: 'https://devadercoach.nl/cursussen',
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <PageviewTracker />
      </body>
    </html>
  );
}
