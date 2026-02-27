import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Heart, Eye, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
  ArrowLeft, ArrowRight, Star, Clock, BookOpen, MessageCircle,
} from 'lucide-react';
import { EXPERIENCE_DAYS, getDay, getWeek } from '@/lib/experience';
import { AUDIO_SCRIPTS } from '@/lib/experience-audio';
import { SKILL_COLORS } from '@/lib/courses';
import { ProgressBar, CompleteDayButton } from '@/components/ExperienceProgress';
import ExperienceGate from '@/components/ExperienceGate';
import DayAudioPlayer from '@/components/DayAudioPlayer';
import SkillRating from '@/components/SkillRating';

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Aanwezigheid: Eye, Emotiecoaching: Heart, Zelfregulatie: Waves, Grenzen: Shield,
  Autonomie: Sprout, Herstel: RefreshCw, Verbinding: Handshake, Reflectie: Brain, Integratie: Star,
};

export function generateStaticParams() {
  return EXPERIENCE_DAYS.map((day) => ({ nummer: String(day.dag) }));
}

export function generateMetadata({ params }: { params: Promise<{ nummer: string }> }) {
  return params.then(({ nummer }) => {
    const day = getDay(Number(nummer));
    if (!day) return { title: 'Dag niet gevonden' };
    return {
      title: `Dag ${day.dag}: ${day.title} - De Vader Experience`,
      description: day.subtitle,
    };
  });
}

export default async function ExperienceDayPage({ params }: { params: Promise<{ nummer: string }> }) {
  const { nummer } = await params;
  const dayNumber = Number(nummer);
  const day = getDay(dayNumber);
  if (!day) notFound();

  const week = getWeek(day.week);
  const color = SKILL_COLORS[day.skill] || '#F59E0B';
  const Icon = SKILL_ICONS[day.skill] || Star;
  const prevDay = dayNumber > 1 ? getDay(dayNumber - 1) : null;
  const nextDay = dayNumber < 22 ? getDay(dayNumber + 1) : null;
  const typeLabel = day.type === 'inzicht' ? 'Inzicht' : day.type === 'opdracht' ? 'Opdracht' : day.type === 'samen' ? 'Samen' : 'Integratie';

  const contentHtml = renderMarkdown(day.content);

  return (
    <ExperienceGate>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* ── Progress ─────────────────────────── */}
        <ProgressBar currentDag={dayNumber} />

        {/* ── Colored skill bar ────────────────── */}
        <div className="h-1 rounded-full mt-6 mb-6" style={{ backgroundColor: color }} />

        {/* ── Header ───────────────────────────── */}
        <div className="flex items-start gap-3 mb-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: color + '15' }}>
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold" style={{ color }}>DAG {day.dag}</span>
              <span className="w-px h-3" style={{ backgroundColor: 'var(--border)' }} />
              <span className="text-[11px] font-semibold" style={{ color: 'var(--text3)' }}>{typeLabel}</span>
              <span className="w-px h-3" style={{ backgroundColor: 'var(--border)' }} />
              <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{day.skill}</span>
              {week && (
                <>
                  <span className="w-px h-3" style={{ backgroundColor: 'var(--border)' }} />
                  <span className="text-[11px]" style={{ color: 'var(--text3)' }}>Week {week.week}</span>
                </>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold leading-tight mt-1" style={{ color: 'var(--text)' }}>
              {day.title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="h-3 w-3" style={{ color: 'var(--text3)' }} />
              <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{day.readTime} min leestijd</span>
            </div>
          </div>
        </div>

        {/* ── Audio intro ─────────────────────── */}
        {AUDIO_SCRIPTS[dayNumber] && (
          <DayAudioPlayer dag={dayNumber} script={AUDIO_SCRIPTS[dayNumber]} color={color} />
        )}

        {/* ── Content ──────────────────────────── */}
        <article className="mb-8" dangerouslySetInnerHTML={{ __html: contentHtml }} />

        {/* ── Exercise (opdracht dagen) ────────── */}
        {day.exercise && (
          <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: color + '08', border: `1px solid ${color}15` }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: color + '20' }}>
                <Sprout className="h-3.5 w-3.5" style={{ color }} />
              </div>
              <span className="text-sm font-bold" style={{ color }}>Oefening van vandaag</span>
            </div>
            <p className="text-[14px] leading-relaxed" style={{ color: 'var(--text2)' }}>
              {day.exercise}
            </p>
          </div>
        )}

        {/* ── Reflection ──────────────────────── */}
        <div className="rounded-2xl p-5 mb-8" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: color + '15' }}>
              <MessageCircle className="h-3.5 w-3.5" style={{ color }} />
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>Reflectievraag</span>
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: 'var(--text)' }}>
            {day.reflection}
          </p>
        </div>

        {/* ── Skill rating ────────────────────── */}
        {day.skill !== 'Integratie' && (
          <div className="mb-6">
            <SkillRating dag={dayNumber} skill={day.skill} color={color} />
          </div>
        )}

        {/* ── Complete ─────────────────────────── */}
        <div className="flex justify-center mb-8">
          <CompleteDayButton dag={dayNumber} />
        </div>

        {/* ── Course upsell ────────────────────── */}
        {day.courseSlug && (
          <Link
            href={`/cursussen/${day.courseSlug}`}
            className="flex items-center gap-3 rounded-xl px-4 py-3 mb-8 transition-all hover:scale-[0.99]"
            style={{ backgroundColor: color + '08', border: `1px solid ${color}12` }}
          >
            <BookOpen className="h-4 w-4 shrink-0" style={{ color }} />
            <span className="text-[12px]" style={{ color: 'var(--text3)' }}>
              Meer over {day.skill.toLowerCase()}?
            </span>
            <span className="text-[12px] font-bold ml-auto" style={{ color }}>
              Bekijk cursus &rarr;
            </span>
          </Link>
        )}

        {/* ── Navigation ──────────────────────── */}
        <nav className="flex items-center justify-between pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
          {prevDay ? (
            <Link href={`/experience/dag/${prevDay.dag}`} className="flex items-center gap-2 text-[13px] font-semibold hover:opacity-80" style={{ color: 'var(--text2)' }}>
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Dag {prevDay.dag}</span>
            </Link>
          ) : (
            <Link href="/experience" className="flex items-center gap-2 text-[13px] font-semibold hover:opacity-80" style={{ color: 'var(--text2)' }}>
              <ArrowLeft className="h-4 w-4" />Overzicht
            </Link>
          )}

          <Link href="/experience" className="text-[11px] font-semibold px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--surface)', color: 'var(--text3)' }}>
            Overzicht
          </Link>

          {nextDay ? (
            <Link href={`/experience/dag/${nextDay.dag}`} className="flex items-center gap-2 text-[13px] font-semibold hover:opacity-80" style={{ color: 'var(--text2)' }}>
              <span className="hidden sm:inline">Dag {nextDay.dag}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : <div />}
        </nav>
      </div>
    </ExperienceGate>
  );
}

/* ── Markdown rendering ────────────────────── */

function renderMarkdown(content: string): string {
  return content
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('### '))
        return `<h3 class="text-base font-bold mt-8 mb-2" style="color: var(--text)">${block.slice(4)}</h3>`;
      if (block.startsWith('## '))
        return `<h2 class="text-lg font-bold mt-10 mb-3" style="color: var(--text)">${block.slice(3)}</h2>`;
      if (block.startsWith('---'))
        return `<hr class="my-8 border-t" style="border-color: var(--border)" />`;
      if (block.startsWith('*') && block.endsWith('*') && !block.startsWith('**'))
        return `<p class="text-[13px] italic leading-relaxed mt-6" style="color: var(--text3)">${block.slice(1, -1)}</p>`;
      if (block.startsWith('- ') || block.startsWith('* ')) {
        const items = block.split('\n').map(line =>
          `<li class="text-[15px] leading-relaxed" style="color: var(--text2)">${inlineMd(line.replace(/^[-*]\s+/, ''))}</li>`
        ).join('');
        return `<ul class="space-y-1 ml-4 list-disc my-3">${items}</ul>`;
      }
      if (/^\d+\.\s/.test(block)) {
        const items = block.split('\n').map(line =>
          `<li class="text-[15px] leading-relaxed" style="color: var(--text2)">${inlineMd(line.replace(/^\d+\.\s+/, ''))}</li>`
        ).join('');
        return `<ol class="space-y-1 ml-4 list-decimal my-3">${items}</ol>`;
      }
      return `<p class="text-[15px] leading-[1.8] my-3" style="color: var(--text2)">${inlineMd(block)}</p>`;
    })
    .join('');
}

function inlineMd(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color: var(--text); font-weight: 700">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
