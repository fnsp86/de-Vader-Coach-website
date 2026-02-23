import type { Metadata } from 'next';
import CourseCard from '@/components/CourseCard';

export const metadata: Metadata = {
  title: 'Cursussen',
  description: 'Praktische PDF-cursussen voor vaders. Gebaseerd op wetenschap en psychologie. Direct toepasbaar.',
};

const SKILL_COLORS: Record<string, string> = {
  Emotiecoaching: '#EF4444',
  Grenzen: '#FBBF24',
  Aanwezigheid: '#667eea',
  Zelfregulatie: '#34D399',
  Verbinding: '#60A5FA',
  Herstel: '#FB923C',
  Autonomie: '#A78BFA',
  Reflectie: '#C084FC',
};

const COURSES = [
  {
    title: 'Emotiecoaching voor Vaders',
    description: 'Leer hoe je je kind helpt omgaan met emoties. Van driftbuien tot verdriet — praktische handvatten voor elke dag.',
    price: 14.95,
    slug: 'emotiecoaching-vaders',
    category: 'Emotiecoaching',
    color: SKILL_COLORS.Emotiecoaching,
    status: 'coming-soon' as const,
    features: ['40+ pagina\'s praktische oefeningen', 'Gebaseerd op de Gottman-methode', 'Werkbladen en reflectieopdrachten'],
  },
  {
    title: 'Grenzen Stellen met Liefde',
    description: 'Hoe stel je gezonde grenzen zonder de band met je kind te beschadigen? Concrete scripts en voorbeelden.',
    price: 12.95,
    slug: 'grenzen-stellen',
    category: 'Grenzen',
    color: SKILL_COLORS.Grenzen,
    status: 'coming-soon' as const,
    features: ['Concrete scripts en zinnen', 'Leeftijdsspecifieke tips (0-18)', 'Inclusief werkbladen'],
  },
  {
    title: 'Aanwezig Vaderschap',
    description: 'Kwaliteitstijd in een druk leven. Leer hoe je echt aanwezig bent, ook in korte momenten.',
    price: 9.95,
    slug: 'aanwezig-vaderschap',
    category: 'Aanwezigheid',
    color: SKILL_COLORS.Aanwezigheid,
    status: 'coming-soon' as const,
    features: ['Dagelijkse micro-oefeningen', '20+ bewezen technieken', 'Reflectie-opdrachten'],
  },
  {
    title: 'Zelfregulatie als Vader',
    description: 'Hoe blijf je kalm als je kind je tot het uiterste drijft? Leer je eigen emoties reguleren.',
    price: 11.95,
    slug: 'zelfregulatie-vader',
    category: 'Zelfregulatie',
    color: SKILL_COLORS.Zelfregulatie,
    status: 'coming-soon' as const,
    features: ['Ademhalingstechnieken', 'Cognitieve herkadering', 'Noodplan voor moeilijke momenten'],
  },
  {
    title: 'Verbinding met je Tiener',
    description: 'De puberteit hoeft geen slagveld te zijn. Bouw een sterke band met je tiener.',
    price: 14.95,
    slug: 'verbinding-tiener',
    category: 'Verbinding',
    color: SKILL_COLORS.Verbinding,
    status: 'coming-soon' as const,
    features: ['Communicatietechnieken', 'Omgaan met terugtrekking', 'Vertrouwen opbouwen'],
  },
  {
    title: 'Herstel na Conflict',
    description: 'Iedereen maakt fouten. Leer hoe je herstelt na een ruzie of een moment waar je spijt van hebt.',
    price: 9.95,
    slug: 'herstel-na-conflict',
    category: 'Herstel',
    color: SKILL_COLORS.Herstel,
    status: 'coming-soon' as const,
    features: ['Hersteltechnieken', 'Verontschuldigingsgids', 'Preventie-strategieën'],
  },
];

export default function CursussenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          Cursussen
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
          Praktische PDF-cursussen waarmee je direct aan de slag kunt. Geen coaching nodig —
          jij bepaalt het tempo.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {COURSES.map((course) => (
          <CourseCard key={course.slug} {...course} />
        ))}
      </div>
    </div>
  );
}
