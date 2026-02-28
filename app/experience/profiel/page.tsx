'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  Heart, Eye, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
  ArrowRight, Star, Trophy, Share2,
} from 'lucide-react';
import { EXPERIENCE_DAYS } from '@/lib/experience';
import { SKILL_COLORS } from '@/lib/courses';

const RATINGS_KEY = 'vader-experience-ratings';
const STORAGE_KEY = 'vader-experience';

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Aanwezigheid: Eye, Emotiecoaching: Heart, Zelfregulatie: Waves, Grenzen: Shield,
  Autonomie: Sprout, Herstel: RefreshCw, Verbinding: Handshake, Reflectie: Brain,
};

const SKILL_TIPS: Record<string, string> = {
  Aanwezigheid: 'Je bent er echt als het ertoe doet. Blijf die momenten pakken.',
  Emotiecoaching: 'Je ziet wat je kind voelt. Dat is de basis van alles.',
  Zelfregulatie: 'Je kunt de storm opvangen. Die kalmte is besmettelijk.',
  Grenzen: 'Je grenzen zijn helder en warm. Dat geeft veiligheid.',
  Autonomie: 'Je geeft ruimte om te groeien. Dat is moed.',
  Herstel: 'Je kunt terugkomen na een fout. Dat leert je kind veerkracht.',
  Verbinding: 'Je zoekt contact, ook als het moeilijk is. Dat is liefde.',
  Reflectie: 'Je begrijpt waarom je doet wat je doet. Dat verandert alles.',
};

const SKILL_COURSE_SLUGS: Record<string, string> = {
  Aanwezigheid: 'aanwezig-vaderschap',
  Emotiecoaching: 'emotiecoaching-voor-vaders',
  Zelfregulatie: 'zelfregulatie-als-vader',
  Grenzen: 'grenzen-stellen-met-liefde',
  Autonomie: 'autonomie-en-loslaten',
  Herstel: 'herstel-na-conflict',
  Verbinding: 'verbinding-met-je-tiener',
  Reflectie: 'reflectief-vaderschap',
};

interface SkillScore {
  skill: string;
  avg: number;
  days: number;
  color: string;
}

function computeScores(): SkillScore[] {
  const ratings: Record<number, number> = (() => {
    try {
      const raw = localStorage.getItem(RATINGS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  })();

  const skillMap: Record<string, { total: number; count: number }> = {};

  for (const day of EXPERIENCE_DAYS) {
    const skill = day.skill;
    if (skill === 'Integratie') continue;
    if (!skillMap[skill]) skillMap[skill] = { total: 0, count: 0 };

    const rating = ratings[day.dag];
    if (rating) {
      skillMap[skill].total += rating;
      skillMap[skill].count += 1;
    }
  }

  return Object.entries(skillMap).map(([skill, { total, count }]) => ({
    skill,
    avg: count > 0 ? total / count : 0,
    days: count,
    color: SKILL_COLORS[skill] || '#F59E0B',
  }));
}

export default function ProfielPage() {
  const [scores, setScores] = useState<SkillScore[]>([]);
  const [completedDays, setCompletedDays] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setScores(computeScores());
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const state = JSON.parse(raw);
        setCompletedDays(state.completedDays?.length || 0);
      }
    } catch {}
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  const rated = scores.filter(s => s.days > 0);
  const strongest = rated.length > 0
    ? rated.reduce((a, b) => a.avg > b.avg ? a : b)
    : null;
  const growthArea = rated.length > 0
    ? rated.reduce((a, b) => a.avg < b.avg ? a : b)
    : null;
  const overallAvg = rated.length > 0
    ? rated.reduce((sum, s) => sum + s.avg, 0) / rated.length
    : 0;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* ── Header ─────────────────────────── */}
      <div className="text-center mb-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-4" style={{ backgroundColor: '#F59E0B' }}>
          <Trophy className="h-7 w-7 text-black" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: 'var(--text)' }}>
          Jouw Vader-profiel
        </h1>
        <p className="text-sm" style={{ color: 'var(--text2)' }}>
          {completedDays} van 22 dagen afgerond
        </p>
      </div>

      {/* ── Overall score ───────────────────── */}
      {rated.length > 0 && (
        <div className="rounded-2xl border p-6 mb-6 text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <div className="text-4xl font-extrabold mb-1" style={{ color: 'var(--amber-text)' }}>
            {overallAvg.toFixed(1)}
          </div>
          <p className="text-[12px] font-semibold" style={{ color: 'var(--text3)' }}>
            Gemiddelde bewustzijn-score
          </p>
        </div>
      )}

      {/* ── Skill bars ──────────────────────── */}
      <div className="space-y-2 mb-8">
        {scores.map((s) => {
          const Icon = SKILL_ICONS[s.skill] || Star;
          const pct = (s.avg / 5) * 100;

          return (
            <div
              key={s.skill}
              className="rounded-xl px-4 py-3"
              style={{ backgroundColor: s.color + '06' }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: s.color + '18' }}>
                  <Icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                </div>
                <span className="text-[13px] font-bold flex-1" style={{ color: 'var(--text)' }}>{s.skill}</span>
                <span className="text-[13px] font-extrabold" style={{ color: s.color }}>
                  {s.days > 0 ? s.avg.toFixed(1) : '-'}
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: s.color + '15' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: s.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Highlights ──────────────────────── */}
      {strongest && growthArea && strongest.skill !== growthArea.skill && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--surface)', borderColor: strongest.color + '30' }}>
            <span className="text-[10px] font-extrabold" style={{ color: strongest.color }}>STERKSTE</span>
            <div className="flex items-center gap-2 mt-1">
              {(() => { const Icon = SKILL_ICONS[strongest.skill] || Star; return <Icon className="h-4 w-4" style={{ color: strongest.color }} />; })()}
              <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{strongest.skill}</span>
            </div>
            <p className="text-[12px] mt-2 leading-relaxed" style={{ color: 'var(--text3)' }}>
              {SKILL_TIPS[strongest.skill]}
            </p>
          </div>

          <div className="rounded-xl border p-4" style={{ backgroundColor: 'var(--surface)', borderColor: growthArea.color + '30' }}>
            <span className="text-[10px] font-extrabold" style={{ color: growthArea.color }}>MEESTE GROEI MOGELIJK</span>
            <div className="flex items-center gap-2 mt-1">
              {(() => { const Icon = SKILL_ICONS[growthArea.skill] || Star; return <Icon className="h-4 w-4" style={{ color: growthArea.color }} />; })()}
              <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{growthArea.skill}</span>
            </div>
            <p className="text-[12px] mt-2 leading-relaxed" style={{ color: 'var(--text3)' }}>
              {SKILL_TIPS[growthArea.skill]}
            </p>
            <Link
              href={`/cursussen/${SKILL_COURSE_SLUGS[growthArea.skill]}`}
              className="inline-flex items-center gap-1 text-[11px] font-bold mt-2 hover:gap-1.5 transition-all"
              style={{ color: growthArea.color }}
            >
              Bekijk cursus <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}

      {/* ── No ratings message ──────────────── */}
      {rated.length === 0 && (
        <div className="rounded-xl border p-6 mb-8 text-center" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
          <p className="text-sm" style={{ color: 'var(--text2)' }}>
            Je hebt nog geen bewustzijn-scores ingevuld. Rond een dag af en geef aan hoe bewust je was van die vaardigheid.
          </p>
          <Link
            href="/experience"
            className="inline-flex items-center gap-1 text-[13px] font-bold mt-3"
            style={{ color: 'var(--amber-text)' }}
          >
            Ga naar de Experience <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* ── CTA ─────────────────────────────── */}
      <div className="text-center pt-4">
        <Link
          href="/experience"
          className="inline-flex items-center gap-2 text-[13px] font-semibold"
          style={{ color: 'var(--text3)' }}
        >
          Terug naar Experience
        </Link>
      </div>
    </div>
  );
}
