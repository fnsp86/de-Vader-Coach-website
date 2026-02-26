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
