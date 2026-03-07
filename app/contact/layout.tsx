import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Neem contact op met De Vadercoach',
  description:
    'Heb je een vraag over onze cursussen, de Vader Experience of het vaderschap? Neem contact op via het formulier of mail naar info@devadercoach.nl.',
  openGraph: {
    title: 'Contact - De Vadercoach',
    description:
      'Heb je een vraag? Neem contact op via het formulier of mail naar info@devadercoach.nl.',
    type: 'website',
    url: 'https://devadercoach.nl/contact',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
