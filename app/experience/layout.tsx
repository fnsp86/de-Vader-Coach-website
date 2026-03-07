import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'De Vader Experience - 22 dagen programma voor betere vaders',
  description:
    'In 22 dagen word je een bewustere, aanwezigere vader. Elke dag een korte oefening gebaseerd op de 8 vadervaardigheden. Wetenschappelijk onderbouwd en direct toepasbaar.',
  keywords: [
    'vader experience', 'vaderschapsprogramma', 'beter worden als vader',
    'opvoedprogramma', '22 dagen challenge', 'vaderschap verbeteren',
  ],
  openGraph: {
    title: 'De Vader Experience - 22 dagen programma',
    description:
      'In 22 dagen word je een bewustere, aanwezigere vader. Elke dag een korte oefening gebaseerd op de 8 vadervaardigheden.',
    type: 'website',
    url: 'https://devadercoach.nl/experience',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/experience',
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
