import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'De Vader Experience - 22-daagse reis door 8 vaardigheden',
  description:
    'In 22 scenario-dagen oefen je met alle 8 opvoedvaardigheden. Herkenbare situaties, dagelijkse audio-intro en een persoonlijk vader-profiel. €19,99 eenmalig.',
  openGraph: {
    title: 'De Vader Experience - 22-daagse reis door 8 vaardigheden',
    description:
      'In 22 scenario-dagen oefen je met alle 8 opvoedvaardigheden. Herkenbare situaties, dagelijkse audio-intro en een persoonlijk vader-profiel.',
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
