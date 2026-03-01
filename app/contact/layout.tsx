import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Heb je een vraag of opmerking? Neem contact op met De Vadercoach. We reageren zo snel mogelijk.',
  openGraph: {
    title: 'Contact - De Vadercoach',
    description:
      'Heb je een vraag of opmerking? Neem contact op met De Vadercoach. We reageren zo snel mogelijk.',
    url: 'https://devadercoach.nl/contact',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
