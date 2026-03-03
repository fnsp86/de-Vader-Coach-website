import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageviewTracker from '@/components/PageviewTracker';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'De Vadercoach | Word elke dag een betere vader',
    template: '%s | De Vadercoach',
  },
  description:
    'Persoonlijke ontwikkeling training voor vaders. Opvoedcursussen, een 22-daagse Experience en een app. Leer grenzen stellen, emotiecoaching, zelfregulatie en meer. Wetenschappelijk onderbouwd, door vaders, voor vaders.',
  keywords: [
    'vaderschap', 'opvoedtips', 'vader worden', 'opvoedcursus', 'betere vader',
    'grenzen stellen kind', 'driftbui peuter', 'emotiecoaching', 'positief opvoeden',
    'vader tips', 'kind luistert niet', 'opvoeding vader', 'betrokken vaderschap',
    'online opvoedcursus', 'vader kind relatie', 'zelfregulatie ouder',
    'omgaan met driftbuien', 'hoe word ik een goede vader', 'opvoedvaardigheden',
    'vadercoach', 'vader experience', 'opvoedboek vaders',
    'opvoedcoach', 'kalm blijven als ouder', 'opvoeden zonder schreeuwen',
    'schermtijd kinderen', 'puber opvoeden', 'ADHD kind opvoeden',
    'co-ouderschap', 'vader na scheiding', 'weekendvader',
    'slaapproblemen kind', 'zelfvertrouwen kind', 'gedragsproblemen kind',
    'opvoedcursus online', 'vader coaching', 'opvoedondersteuning',
    'persoonlijke ontwikkeling', 'persoonlijke ontwikkeling training',
    'trainingen persoonlijke ontwikkeling', 'persoonlijke groei vader',
    'zelfontwikkeling vader', 'persoonlijke ontwikkeling ouderschap',
  ],
  metadataBase: new URL('https://devadercoach.nl'),
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    siteName: 'De Vadercoach',
    url: 'https://devadercoach.nl',
    title: 'De Vadercoach | Word elke dag een betere vader',
    description:
      'Persoonlijke ontwikkeling training voor vaders. Opvoedcursussen, een 22-daagse Experience en een app. Wetenschappelijk onderbouwd, door vaders, voor vaders.',
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
      { url: '/favicon.ico', sizes: '32x32' },
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
    <html lang="nl" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('theme')!=='dark')document.documentElement.classList.add('light')}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'De Vadercoach',
              url: 'https://devadercoach.nl',
              logo: 'https://devadercoach.nl/logo.png',
              description:
                'Trainingen persoonlijke ontwikkeling voor vaders. Opvoedcursussen, een 22-daagse Vader Experience en een app. Leer grenzen stellen, emotiecoaching, zelfregulatie en meer. Wetenschappelijk onderbouwd door Gottman, Bowlby en Fonagy.',
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
