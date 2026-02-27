import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Heb je een vraag of opmerking? Neem contact op met De Vadercoach. We reageren zo snel mogelijk.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
