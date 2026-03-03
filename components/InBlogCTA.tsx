'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight, HelpCircle } from 'lucide-react';

interface InBlogCTAProps {
  skill: string;
  color: string;
  type: 'quiz' | 'cursus';
  courseSlug?: string;
  courseTitle?: string;
}

export default function InBlogCTA({ skill, color, type, courseSlug, courseTitle }: InBlogCTAProps) {
  if (type === 'cursus' && courseSlug) {
    return (
      <div
        className="my-8 rounded-2xl p-6 border"
        style={{ backgroundColor: color + '08', borderColor: color + '25' }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ backgroundColor: color + '18' }}
          >
            <BookOpen className="h-5 w-5" style={{ color }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
              Meer leren over {skill}?
            </p>
            <p className="text-[13px] mb-3" style={{ color: 'var(--text2)' }}>
              In de cursus <strong>{courseTitle}</strong> leer je stap voor stap hoe je dit in de praktijk brengt.
            </p>
            <Link
              href={`/cursussen/${courseSlug}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ color }}
            >
              Bekijk de cursus <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="my-8 rounded-2xl p-6 border"
      style={{ backgroundColor: '#F59E0B08', borderColor: '#F59E0B25' }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: '#F59E0B18' }}
        >
          <HelpCircle className="h-5 w-5" style={{ color: '#F59E0B' }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold mb-1" style={{ color: 'var(--text)' }}>
            Benieuwd welke vader jij bent?
          </p>
          <p className="text-[13px] mb-3" style={{ color: 'var(--text2)' }}>
            Doe de gratis quiz en ontdek je sterkste opvoedvaardigheid in 2 minuten.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-1.5 text-sm font-bold transition-opacity hover:opacity-80"
            style={{ color: '#F59E0B' }}
          >
            Start de quiz <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
