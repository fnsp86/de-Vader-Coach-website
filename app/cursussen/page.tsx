import type { Metadata } from 'next';
import { Download, Check, BookOpen } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { getAllCourses, BUNDLE, SNELGIDS } from '@/lib/courses';

export const metadata: Metadata = {
  title: 'Cursussen',
  description: 'Praktische PDF-cursussen voor vaders. Gebaseerd op wetenschap en psychologie. Direct toepasbaar.',
};

export default function CursussenPage() {
  const courses = getAllCourses();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-3" style={{ color: 'var(--text)' }}>
          Cursussen
        </h1>
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text2)' }}>
          8 verdiepende PDF-cursussen waarmee je direct aan de slag kunt. Wetenschappelijk onderbouwd,
          praktisch toepasbaar. Jij bepaalt het tempo.
        </p>
      </div>

      {/* Gratis snelgids */}
      <div
        className="rounded-2xl border p-6 sm:p-8 mb-8"
        style={{ borderColor: '#F59E0B40', backgroundColor: 'var(--surface)' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <BookOpen className="h-7 w-7 text-black" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: '#F59E0B30', color: '#F59E0B' }}>
                GRATIS
              </span>
            </div>
            <h2 className="text-xl font-extrabold mb-1" style={{ color: 'var(--text)' }}>
              {SNELGIDS.title}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text2)' }}>
              {SNELGIDS.description}
            </p>
          </div>
          <a
            href="/api/free-download"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97]"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </a>
        </div>
      </div>

      {/* Alle 8 cursussen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {courses.map((course) => (
          <CourseCard key={course.slug} {...course} />
        ))}
      </div>

      {/* Bundel */}
      <div
        className="mt-8 rounded-2xl border p-6 sm:p-8"
        style={{ backgroundColor: 'var(--surface)', borderColor: '#F59E0B40' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: '#F59E0B15', color: '#F59E0B' }}>
                Bundel
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                Binnenkort
              </span>
            </div>
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
              {BUNDLE.title}
            </h2>
            <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>
              {BUNDLE.description}
            </p>
            <ul className="space-y-1.5">
              {[
                'Alle 8 cursussen in een download',
                '451 pagina\'s, 77 hoofdstukken',
                'Honderden oefeningen en werkbladen',
                `${Math.round((1 - BUNDLE.price / BUNDLE.originalPrice) * 100)}% korting ten opzichte van losse aankoop`,
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text2)' }}>
                  <Check className="h-4 w-4 shrink-0 text-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <div className="text-sm line-through" style={{ color: 'var(--text3)' }}>
              &euro;{BUNDLE.originalPrice.toFixed(2).replace('.', ',')}
            </div>
            <div className="text-4xl font-extrabold" style={{ color: '#F59E0B' }}>
              &euro;{BUNDLE.price.toFixed(2).replace('.', ',')}
            </div>
            <div className="text-xs mb-4" style={{ color: 'var(--text3)' }}>
              8 cursussen &middot; eenmalige betaling
            </div>
            <div
              className="px-6 py-3 rounded-xl text-sm font-bold text-center"
              style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}
            >
              Binnenkort beschikbaar
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
