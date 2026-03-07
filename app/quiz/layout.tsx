import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaderschap Quiz - Ontdek jouw sterke en zwakke opvoedvaardigheden',
  description:
    'Doe de gratis vaderschap quiz en ontdek welke van de 8 opvoedvaardigheden jouw sterkste kant is en waar je kunt groeien. Duurt maar 3 minuten.',
  keywords: [
    'vaderschap quiz', 'opvoedtest', 'opvoedvaardigheden test',
    'vader test', 'opvoeding quiz', 'ben ik een goede vader',
  ],
  openGraph: {
    title: 'Vaderschap Quiz - Test je opvoedvaardigheden',
    description:
      'Doe de gratis quiz en ontdek welke van de 8 opvoedvaardigheden jouw sterkste kant is. Duurt maar 3 minuten.',
    type: 'website',
    url: 'https://devadercoach.nl/quiz',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/quiz',
  },
};

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
