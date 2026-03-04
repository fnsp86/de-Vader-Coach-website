import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vadervaardigheden Quiz - Test jezelf',
  description:
    'Doe de gratis vadervaardigheden quiz en ontdek waar jouw sterke punten liggen. Persoonlijk resultaat met tips om te groeien als vader.',
  openGraph: {
    title: 'Vadervaardigheden Quiz - De Vadercoach',
    description:
      'Doe de gratis vadervaardigheden quiz en ontdek waar jouw sterke punten liggen als vader.',
    url: 'https://devadercoach.nl/quiz',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/quiz',
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
