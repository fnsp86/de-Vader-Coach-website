'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { EXPERIENCE_DAYS, EXPERIENCE_WEEKS, getDay } from '@/lib/experience';
import { SKILL_COLORS } from '@/lib/courses';

interface ExperienceState {
  completedDays: number[];
  currentDay: number;
}

const STORAGE_KEY = 'vader-experience';
const TOKEN_KEY = 'vader-experience-token';

function loadState(): ExperienceState {
  if (typeof window === 'undefined') return { completedDays: [], currentDay: 1 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedDays: [], currentDay: 1 };
}

function saveState(state: ExperienceState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function hasAccess(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(TOKEN_KEY);
}

export function useExperienceState() {
  const [state, setState] = useState<ExperienceState>({ completedDays: [], currentDay: 1 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(loadState());
    setLoaded(true);
  }, []);

  const completeDay = useCallback((dag: number) => {
    setState(prev => {
      const next = {
        completedDays: prev.completedDays.includes(dag) ? prev.completedDays : [...prev.completedDays, dag],
        currentDay: Math.max(prev.currentDay, dag + 1),
      };
      saveState(next);
      return next;
    });
  }, []);

  const uncompleteDay = useCallback((dag: number) => {
    setState(prev => {
      const next = {
        ...prev,
        completedDays: prev.completedDays.filter(d => d !== dag),
      };
      saveState(next);
      return next;
    });
  }, []);

  return { ...state, loaded, completeDay, uncompleteDay };
}

/* ── Progress dots bar ─────────────────────────── */

export function ProgressDots({ currentDag }: { currentDag?: number }) {
  const { completedDays, loaded } = useExperienceState();

  if (!loaded) return <div className="h-8" />;

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {EXPERIENCE_DAYS.map((day) => {
        const color = SKILL_COLORS[day.skill] || '#F59E0B';
        const done = completedDays.includes(day.dag);
        const active = day.dag === currentDag;

        return (
          <Link
            key={day.dag}
            href={`/experience/dag/${day.dag}`}
            className="relative group"
            title={`Dag ${day.dag}: ${day.title}`}
          >
            <div
              className={`h-3 w-3 rounded-full transition-all ${
                active ? 'ring-2 ring-offset-2 scale-125' : ''
              } ${done ? '' : 'opacity-30'}`}
              style={{
                backgroundColor: color,
                ringColor: color,
                ringOffsetColor: 'var(--bg)',
              } as React.CSSProperties}
            />
            {active && (
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ backgroundColor: color, opacity: 0.3 }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}

/* ── Progress bar for day pages ───────────────── */

export function ProgressBar({ currentDag }: { currentDag: number }) {
  const { completedDays, loaded } = useExperienceState();

  if (!loaded) return <div className="h-10" />;

  const total = 22;
  const done = completedDays.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div
      className="rounded-xl border px-4 py-3"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[12px] font-bold" style={{ color: 'var(--text)' }}>
          Dag {currentDag} van {total}
        </span>
        <span className="text-[11px] font-semibold" style={{ color: '#F59E0B' }}>
          {done} afgerond ({pct}%)
        </span>
      </div>
      <div className="flex gap-0.5">
        {EXPERIENCE_DAYS.map((day) => {
          const color = SKILL_COLORS[day.skill] || '#F59E0B';
          const isDone = completedDays.includes(day.dag);
          const isCurrent = day.dag === currentDag;
          return (
            <Link
              key={day.dag}
              href={`/experience/dag/${day.dag}`}
              className="flex-1 relative"
              title={`Dag ${day.dag}: ${day.title}`}
            >
              <div
                className={`h-2 rounded-full transition-all ${isCurrent ? 'scale-y-150' : 'hover:scale-y-125'}`}
                style={{ backgroundColor: isDone || isCurrent ? color : color + '20' }}
              />
              {isCurrent && (
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ backgroundColor: color }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ── Complete day button ──────────────────────── */

export function CompleteDayButton({ dag }: { dag: number }) {
  const { completedDays, loaded, completeDay, uncompleteDay } = useExperienceState();

  if (!loaded) return null;

  const done = completedDays.includes(dag);

  return (
    <button
      onClick={() => (done ? uncompleteDay(dag) : completeDay(dag))}
      className={`flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-bold transition-all ${
        done
          ? 'border'
          : 'text-black'
      }`}
      style={
        done
          ? { borderColor: 'var(--border)', color: 'var(--text2)' }
          : { backgroundColor: '#F59E0B' }
      }
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-md border-2 text-[11px] transition-all ${
          done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-black/30'
        }`}
      >
        {done && '✓'}
      </span>
      {done ? 'Dag afgerond!' : 'Dag afronden'}
    </button>
  );
}

/* ── Week overview for landing page ──────────── */

export function WeekOverview() {
  const { completedDays, loaded } = useExperienceState();

  if (!loaded) return <div className="h-40" />;

  const totalCompleted = completedDays.length;

  return (
    <div className="space-y-4">
      {/* Overall progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>
          {totalCompleted} van 22 dagen afgerond
        </span>
        <span className="text-[12px] font-semibold" style={{ color: '#F59E0B' }}>
          {Math.round((totalCompleted / 22) * 100)}%
        </span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--surface2)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(totalCompleted / 22) * 100}%`, backgroundColor: '#F59E0B' }}
        />
      </div>

      {/* Per week */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {EXPERIENCE_WEEKS.map((week) => {
          const weekDays = EXPERIENCE_DAYS.filter(d => d.week === week.week);
          const weekCompleted = weekDays.filter(d => completedDays.includes(d.dag)).length;
          const weekTotal = weekDays.length;
          const intDays = week.week === 4
            ? EXPERIENCE_DAYS.filter(d => d.week === 5)
            : [];
          const allDays = [...weekDays, ...intDays];

          return (
            <div
              key={week.week}
              className="rounded-xl border p-4"
              style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-extrabold px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: week.colors[0] + '20', color: week.colors[0] }}
                  >
                    WEEK {week.week}
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>
                    {week.name}
                  </span>
                </div>
                <span className="text-[11px] font-semibold" style={{ color: 'var(--text3)' }}>
                  {weekCompleted}/{weekTotal}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                {week.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: week.colors[i] + '15', color: week.colors[i] }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-1 mt-3">
                {weekDays.map((day) => {
                  const done = completedDays.includes(day.dag);
                  const color = SKILL_COLORS[day.skill] || '#F59E0B';
                  return (
                    <Link
                      key={day.dag}
                      href={`/experience/dag/${day.dag}`}
                      className="flex-1 h-2 rounded-full transition-all hover:scale-y-150"
                      style={{ backgroundColor: done ? color : color + '25' }}
                      title={`Dag ${day.dag}: ${day.title}`}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
