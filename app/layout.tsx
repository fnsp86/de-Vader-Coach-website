import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: {
    default: 'De Vadercoach | Word elke dag een betere vader',
    template: '%s | De Vadercoach',
  },
  description:
    'Praktische cursussen en tools voor vaders, gebaseerd op wetenschap en psychologie. Verlaag de drempel naar hulp.',
  metadataBase: new URL('https://devadercoach.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'De Vadercoach',
    url: 'https://devadercoach.nl',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://devadercoach.nl',
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
              logo: 'https://devadercoach.nl/icon.png',
              description:
                'Praktische cursussen, een 22-daagse Experience en een app voor vaders die willen groeien. Gebaseerd op wetenschap en psychologie.',
              sameAs: [],
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
      </body>
    </html>
  );
}
