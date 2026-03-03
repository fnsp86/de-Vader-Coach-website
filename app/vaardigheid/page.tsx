import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Eye, Heart, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
  BookOpen, ArrowRight,
} from 'lucide-react';
import { getAllSkills } from '@/lib/skills';

const ICON_MAP: Record<string, typeof Eye> = {
  Eye, Heart, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
};

export const metadata: Metadata = {
  title: 'De 8 Vadervaardigheden - Overzicht',
  description:
    'Ontdek de 8 vaardigheden die elke vader nodig heeft: aanwezigheid, emotiecoaching, zelfregulatie, grenzen, autonomie, herstel, verbinding en reflectie.',
  openGraph: {
    title: 'De 8 Vadervaardigheden',
    description:
      'Ontdek de 8 vaardigheden die elke vader nodig heeft. Bij elke vaardigheid vind je artikelen, gidsen en een cursus.',
  },
  alternates: {
    canonical: 'https://devadercoach.nl/vaardigheid',
  },
};

export default function SkillsOverviewPage() {
  const skills = getAllSkills();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          De 8 Vadervaardigheden
        </h1>
        <p className="text-base leading-relaxed max-w-xl mx-auto" style={{ color: 'var(--text2)' }}>
          Elk onderdeel van het vaderschap vraagt iets anders van je. Hieronder vind je bij elke vaardigheid
          alle artikelen, gidsen en de bijbehorende cursus.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {skills.map((skill) => {
          const Icon = ICON_MAP[skill.icon] || BookOpen;
          return (
            <Link
              key={skill.slug}
              href={`/vaardigheid/${skill.slug}`}
              className="group rounded-2xl border p-6 transition-colors hover:border-opacity-60"
              style={{ borderColor: 'var(--border)' }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                style={{ backgroundColor: skill.color + '15' }}
              >
                <Icon className="h-6 w-6" style={{ color: skill.color }} />
              </div>
              <h2 className="text-lg font-extrabold mb-1" style={{ color: 'var(--text)' }}>
                {skill.name}
              </h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text2)' }}>
                {skill.tagline}
              </p>
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2"
                style={{ color: skill.color }}
              >
                Bekijk alles <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
