import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aanbevolen voor Vaders - Boeken, Tools & Cursussen',
  description:
    'Onze favoriete opvoedboeken, tools en cursussen per vaardigheid. Alles wat we zelf gebruiken of aanraden aan vaders die willen groeien.',
  openGraph: {
    title: 'Aanbevolen voor Vaders - Boeken, Tools & Cursussen',
    description:
      'Onze favoriete opvoedboeken, tools en cursussen per vaardigheid. Voor vaders die willen groeien.',
  },
};

export default function AanbevolenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
