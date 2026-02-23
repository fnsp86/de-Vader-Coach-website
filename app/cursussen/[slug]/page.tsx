import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Check, ArrowLeft } from 'lucide-react';

// Placeholder course data — later replaced by MDX/CMS
const COURSES: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  status: 'available' | 'coming-soon';
  features: string[];
  learnPoints: string[];
  forWho: string[];
}> = {
  'emotiecoaching-vaders': {
    title: 'Emotiecoaching voor Vaders',
    description: 'Leer hoe je je kind helpt omgaan met emoties.',
    longDescription: 'Deze cursus leert je de basisprincipes van emotiecoaching: hoe je de emoties van je kind erkent, benoemt en begeleidt. Gebaseerd op de Gottman-methode en moderne ontwikkelingspsychologie.',
    price: 14.95,
    category: 'Emotiecoaching',
    status: 'coming-soon',
    features: ['40+ pagina\'s', 'Werkbladen', 'Voorbeelddialogen', 'Reflectieopdrachten'],
    learnPoints: [
      'Emoties herkennen en benoemen bij je kind',
      'Empathisch reageren op driftbuien',
      'Je kind leren omgaan met frustratie',
      'De emotionele band versterken',
    ],
    forWho: [
      'Vaders van kinderen 0-12 jaar',
      'Vaders die moeite hebben met driftbuien',
      'Vaders die hun kind beter willen begrijpen',
    ],
  },
  'grenzen-stellen': {
    title: 'Grenzen Stellen met Liefde',
    description: 'Gezonde grenzen zonder de band te beschadigen.',
    longDescription: 'Leer hoe je duidelijke, liefdevolle grenzen stelt die je kind helpen groeien. Met concrete scripts, voorbeeldgesprekken en werkbladen voor elke leeftijd.',
    price: 12.95,
    category: 'Grenzen',
    status: 'coming-soon',
    features: ['35+ pagina\'s', 'Scripts per leeftijd', 'Werkbladen', 'Checklists'],
    learnPoints: [
      'Grenzen stellen zonder schreeuwen',
      'Consequenties die werken',
      'Nee zeggen met empathie',
      'Leeftijdsgeschikte verwachtingen',
    ],
    forWho: [
      'Vaders van kinderen 2-18 jaar',
      'Vaders die worstelen met consequent zijn',
      'Vaders die een betere balans zoeken',
    ],
  },
};

// Fallback for unknown slugs
const DEFAULT_COURSE = {
  title: 'Cursus niet gevonden',
  description: '',
  longDescription: 'Deze cursus is nog niet beschikbaar.',
  price: 0,
  category: '',
  status: 'coming-soon' as const,
  features: [],
  learnPoints: [],
  forWho: [],
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = COURSES[slug] ?? DEFAULT_COURSE;
  return { title: course.title, description: course.description };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = COURSES[slug] ?? DEFAULT_COURSE;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <Link
        href="/cursussen"
        className="inline-flex items-center gap-1.5 text-sm font-semibold mb-8 hover:gap-2.5 transition-all"
        style={{ color: 'var(--text3)' }}
      >
        <ArrowLeft className="h-4 w-4" />
        Alle cursussen
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10">
          <BookOpen className="h-7 w-7 text-amber-400" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text2)' }}>
              {course.category}
            </span>
            {course.status === 'coming-soon' && (
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400">
                Binnenkort beschikbaar
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: 'var(--text)' }}>
            {course.title}
          </h1>
        </div>
      </div>

      <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text2)' }}>
        {course.longDescription}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wat je leert */}
          <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Wat je leert</h2>
            <ul className="space-y-3">
              {course.learnPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-sm" style={{ color: 'var(--text2)' }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Voor wie */}
          <div className="rounded-2xl border p-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Voor wie is deze cursus?</h2>
            <ul className="space-y-2">
              {course.forWho.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text2)' }}>
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: '#F59E0B' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar — koop card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border p-6" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
            <div className="text-3xl font-extrabold mb-1" style={{ color: '#F59E0B' }}>
              &euro;{course.price.toFixed(2).replace('.', ',')}
            </div>
            <p className="text-xs mb-4" style={{ color: 'var(--text3)' }}>
              Eenmalige betaling · PDF download
            </p>

            {course.status === 'coming-soon' ? (
              <div className="px-5 py-3 rounded-xl text-center text-sm font-bold" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                Binnenkort beschikbaar
              </div>
            ) : (
              <button className="w-full px-5 py-3.5 rounded-xl text-base font-bold text-black transition-transform hover:scale-[0.97]" style={{ backgroundColor: '#F59E0B' }}>
                Kopen
              </button>
            )}

            {/* Features */}
            <ul className="mt-5 space-y-2">
              {course.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text3)' }}>
                  <Check className="h-3.5 w-3.5 text-amber-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
