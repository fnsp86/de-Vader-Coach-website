import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vader Experience - 22-Daagse Persoonlijke Ontwikkeling Training',
  description:
    'Persoonlijke ontwikkeling training voor vaders in 22 dagen. Oefen met grenzen stellen, emotiecoaching, zelfregulatie en 5 andere opvoedvaardigheden. Herkenbare situaties, audio-intro en een persoonlijk vaderprofiel. €19,99 eenmalig.',
  openGraph: {
    title: 'Vader Experience - 22-Daagse Persoonlijke Ontwikkeling Training',
    description:
      'Persoonlijke ontwikkeling training voor vaders in 22 dagen. Oefen met 8 opvoedvaardigheden via herkenbare situaties, audio en reflectie. €19,99 eenmalig.',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/experience',
  },
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
