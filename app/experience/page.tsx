'use client';

import Link from 'next/link';
import {
  Heart, Eye, Waves, Shield, Sprout, RefreshCw, Handshake, Brain,
  ArrowRight, Calendar, Clock, Zap, Star, Check, Play, Lock, Trophy, Volume2,
} from 'lucide-react';
import { EXPERIENCE_WEEKS, EXPERIENCE_DAYS } from '@/lib/experience';
import { SKILL_COLORS } from '@/lib/courses';
import { hasAccess, useExperienceState } from '@/components/ExperienceProgress';
import { useEffect, useState, useCallback } from 'react';

const TOKEN_KEY = 'vader-experience-token';

const SKILL_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Aanwezigheid: Eye,
  Emotiecoaching: Heart,
  Zelfregulatie: Waves,
  Grenzen: Shield,
  Autonomie: Sprout,
  Herstel: RefreshCw,
  Verbinding: Handshake,
  Reflectie: Brain,
};

export default function ExperiencePage() {
  // Betaling nog niet actief — altijd salespagina tonen
  return <ExperienceSalesPage />;
}

/* ═══════════════════════════════════════════════════
   DASHBOARD
   ═══════════════════════════════════════════════════ */

function ExperienceDashboard() {
  const { completedDays, loaded } = useExperienceState();
  if (!loaded) return null;

  const total = EXPERIENCE_DAYS.length;
  const done = completedDays.length;
  const pct = Math.round((done / total) * 100);

  // Find next uncompleted day
  const nextDay = EXPERIENCE_DAYS.find(d => !completedDays.includes(d.dag));

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

      {/* ── Header + progress ring ─────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg" style={{ backgroundColor: '#F59E0B20', color: '#F59E0B' }}>
            DE VADER EXPERIENCE
          </span>
          <h1 className="text-2xl font-extrabold mt-2" style={{ color: 'var(--text)' }}>
            Jouw reis
          </h1>
        </div>

        {/* Progress circle */}
        <div className="relative flex items-center justify-center h-16 w-16">
          <svg className="h-16 w-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="var(--surface2)" strokeWidth="4" />
            <circle cx="32" cy="32" r="28" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - pct / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <span className="absolute text-sm font-extrabold" style={{ color: '#F59E0B' }}>{pct}%</span>
        </div>
      </div>

      {/* ── Continue card ──────────────────────── */}
      {nextDay && (
        <Link
          href={`/experience/dag/${nextDay.dag}`}
          className="group flex items-center gap-4 rounded-2xl p-5 mb-8 transition-all hover:scale-[0.99]"
          style={{ backgroundColor: (SKILL_COLORS[nextDay.skill] || '#F59E0B') + '10', border: `1px solid ${(SKILL_COLORS[nextDay.skill] || '#F59E0B')}25` }}
        >
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: (SKILL_COLORS[nextDay.skill] || '#F59E0B') + '20' }}
          >
            <Play className="h-5 w-5" style={{ color: SKILL_COLORS[nextDay.skill] || '#F59E0B' }} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold" style={{ color: SKILL_COLORS[nextDay.skill] || '#F59E0B' }}>
              {done === 0 ? 'BEGIN HIER' : 'GA VERDER'}
            </span>
            <div className="text-base font-bold truncate" style={{ color: 'var(--text)' }}>
              Dag {nextDay.dag}: {nextDay.title}
            </div>
            <span className="text-[11px]" style={{ color: 'var(--text3)' }}>{nextDay.readTime} min &middot; {nextDay.skill}</span>
          </div>
          <ArrowRight className="h-5 w-5 opacity-50 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text2)' }} />
        </Link>
      )}

      {done === total && (
        <div className="rounded-2xl p-6 mb-8 text-center" style={{ backgroundColor: '#F59E0B10', border: '1px solid #F59E0B25' }}>
          <Trophy className="h-8 w-8 mx-auto mb-2" style={{ color: '#F59E0B' }} />
          <h2 className="text-lg font-extrabold mb-1" style={{ color: 'var(--text)' }}>Experience voltooid!</h2>
          <p className="text-sm mb-4" style={{ color: 'var(--text2)' }}>Je hebt alle 22 dagen afgerond. Knap gedaan.</p>
          <Link
            href="/experience/profiel"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97]"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <Trophy className="h-4 w-4" />
            Bekijk je Vader-profiel
          </Link>
        </div>
      )}

      {/* Profiel link (always visible) */}
      {done > 0 && done < total && (
        <Link
          href="/experience/profiel"
          className="flex items-center gap-3 rounded-xl px-4 py-3 mb-8 transition-all hover:scale-[0.99]"
          style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <Trophy className="h-4 w-4" style={{ color: '#F59E0B' }} />
          <span className="text-[13px] font-semibold flex-1" style={{ color: 'var(--text2)' }}>
            Bekijk je Vader-profiel
          </span>
          <ArrowRight className="h-3.5 w-3.5" style={{ color: 'var(--text3)' }} />
        </Link>
      )}

      {/* ── Progress bar ──────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-semibold" style={{ color: 'var(--text3)' }}>
            {done} van {total} dagen
          </span>
        </div>
        <div className="flex gap-[3px]">
          {EXPERIENCE_DAYS.map((day) => {
            const c = SKILL_COLORS[day.skill] || '#F59E0B';
            const isDone = completedDays.includes(day.dag);
            return (
              <Link
                key={day.dag}
                href={`/experience/dag/${day.dag}`}
                className="flex-1 h-2.5 rounded-full transition-all hover:scale-y-[1.5]"
                style={{ backgroundColor: isDone ? c : c + '18' }}
                title={`Dag ${day.dag}: ${day.title}`}
              />
            );
          })}
        </div>
      </div>

      {/* ── Weeks ─────────────────────────────── */}
      <div className="space-y-3">
        {EXPERIENCE_WEEKS.map((week) => {
          const weekDays = EXPERIENCE_DAYS.filter(d => d.week === week.week);
          const weekDone = weekDays.filter(d => completedDays.includes(d.dag)).length;
          const weekTotal = weekDays.length;
          const allDone = weekDone === weekTotal;

          return (
            <div key={week.week} className="rounded-2xl border overflow-hidden" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
              {/* Week header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md" style={{ backgroundColor: week.colors[0] + '20', color: week.colors[0] }}>
                    WEEK {week.week}
                  </span>
                  <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{week.name}</span>
                  <div className="flex gap-1 ml-1">
                    {week.skills.map((skill, i) => {
                      const Icon = SKILL_ICONS[skill] || Star;
                      return <Icon key={skill} className="h-3.5 w-3.5" style={{ color: week.colors[i] }} />;
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {allDone && <Check className="h-3.5 w-3.5" style={{ color: '#34D399' }} />}
                  <span className="text-[11px] font-semibold" style={{ color: allDone ? '#34D399' : 'var(--text3)' }}>
                    {weekDone}/{weekTotal}
                  </span>
                </div>
              </div>

              {/* Days */}
              <div className="border-t" style={{ borderColor: 'var(--border)' }}>
                {weekDays.map((day, i) => {
                  const Icon = SKILL_ICONS[day.skill] || Star;
                  const c = SKILL_COLORS[day.skill] || '#F59E0B';
                  const isDone = completedDays.includes(day.dag);
                  const isNext = nextDay?.dag === day.dag;

                  return (
                    <Link
                      key={day.dag}
                      href={`/experience/dag/${day.dag}`}
                      className={`flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-[var(--surface2)] ${i < weekDays.length - 1 ? 'border-b' : ''}`}
                      style={{ borderColor: 'var(--border)' }}
                    >
                      {/* Icon */}
                      <div className="relative shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: c + '12' }}>
                          <Icon className="h-3.5 w-3.5" style={{ color: c }} />
                        </div>
                        {isDone && (
                          <div className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full" style={{ backgroundColor: '#34D399' }}>
                            <Check className="h-2 w-2 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold truncate" style={{ color: isDone ? 'var(--text3)' : 'var(--text)' }}>
                          {day.title}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-medium" style={{ color: c }}>Dag {day.dag}</span>
                          <span className="text-[10px]" style={{ color: 'var(--text3)' }}>&middot;</span>
                          <span className="text-[10px]" style={{ color: 'var(--text3)' }}>{day.readTime} min</span>
                          <span className="text-[10px]" style={{ color: 'var(--text3)' }}>&middot;</span>
                          <span className="text-[10px] capitalize" style={{ color: 'var(--text3)' }}>{day.type}</span>
                        </div>
                      </div>

                      {/* Status */}
                      {isNext && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-md shrink-0" style={{ backgroundColor: c + '18', color: c }}>
                          VOLGENDE
                        </span>
                      )}
                      {isDone && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-md shrink-0" style={{ backgroundColor: '#34D39918', color: '#34D399' }}>
                          KLAAR
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Integratie (dag 21-22 zitten in week 4 data) */}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SALES PAGE
   ═══════════════════════════════════════════════════ */

function ExperienceSalesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            {[Eye, Heart, Waves, Shield].map((Icon, i) => {
              const colors = ['#667eea', '#EF4444', '#34D399', '#FBBF24'];
              return (
                <div key={i} className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: colors[i] + '15' }}>
                  <Icon className="h-4 w-4" style={{ color: colors[i] }} />
                </div>
              );
            })}
            <span className="text-[11px] font-bold" style={{ color: 'var(--text3)' }}>+4 meer</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4" style={{ color: 'var(--text)' }}>
            De Vader Experience
          </h1>

          <p className="text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-8" style={{ color: 'var(--text2)' }}>
            22 dagen. 8 vaardigheden. Elke dag een herkenbaar scenario met een concrete actie.
          </p>

          <div
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold"
            style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}
          >
            Binnenkort beschikbaar
          </div>

          <p className="text-[12px] mt-3" style={{ color: 'var(--text3)' }}>Eenmalig. Geen abonnement.</p>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 h-full w-full max-w-lg opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #F59E0B, transparent 70%)' }} />
      </section>

      {/* Hoe werkt het */}
      <section style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: BookOpen, title: 'Herken', desc: 'Een vader-scenario', color: '#667eea' },
              { icon: Zap, title: 'Doe', desc: 'Een concrete actie', color: '#34D399' },
              { icon: Brain, title: 'Reflecteer', desc: 'Eén vraag', color: '#C084FC' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl p-4 text-center" style={{ backgroundColor: item.color + '08' }}>
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl mb-2" style={{ backgroundColor: item.color + '18' }}>
                  <item.icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>{item.title}</div>
                <div className="text-[11px]" style={{ color: 'var(--text3)' }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wat maakt het uniek */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="h-4 w-4" style={{ color: '#F59E0B' }} />
                <span className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>Dagelijkse audio-intro</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text3)' }}>
                Elke dag begint met een kort motiverend fragment dat je in de juiste mindset zet. Als een coach in je oortje.
              </p>
            </div>
            <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--surface)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-4 w-4" style={{ color: '#F59E0B' }} />
                <span className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>Jouw Vader-profiel</span>
              </div>
              <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text3)' }}>
                Na 22 dagen krijg je een persoonlijk profiel: je sterkste vaardigheden, waar je de meeste groei hebt, en een aanbeveling voor verdieping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekoverzicht - compact */}
      <section className="border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-xl font-extrabold mb-6 text-center" style={{ color: 'var(--text)' }}>
            4 weken, 8 vaardigheden
          </h2>

          <div className="space-y-3">
            {EXPERIENCE_WEEKS.map((week) => {
              const weekDays = EXPERIENCE_DAYS.filter(d => d.week === week.week);
              return (
                <div key={week.week} className="rounded-xl border p-4" style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md" style={{ backgroundColor: week.colors[0] + '20', color: week.colors[0] }}>
                      WEEK {week.week}
                    </span>
                    <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{week.name}</span>
                    <div className="flex-1" />
                    {week.skills.map((skill, i) => {
                      const Icon = SKILL_ICONS[skill] || Star;
                      return (
                        <span key={skill} className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: week.colors[i] }}>
                          <Icon className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">{skill}</span>
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex gap-1">
                    {weekDays.map((day) => {
                      const c = SKILL_COLORS[day.skill] || '#F59E0B';
                      return (
                        <div key={day.dag} className="flex-1 group relative">
                          <div className="h-2 rounded-full" style={{ backgroundColor: c + '30' }} />
                          <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text2)' }}>
                            {day.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ backgroundColor: 'var(--surface)' }}>
        <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="text-xl font-extrabold mb-6" style={{ color: 'var(--text)' }}>
            Begin vandaag
          </h2>

          <div className="rounded-2xl border p-6 mb-5" style={{ backgroundColor: 'var(--bg)', borderColor: '#F59E0B30' }}>
            <span className="text-3xl font-extrabold" style={{ color: '#F59E0B' }}>&euro;19,99</span>
            <span className="text-sm ml-1" style={{ color: 'var(--text3)' }}>eenmalig</span>

            <div className="grid grid-cols-2 gap-2 mt-5 mb-5">
              {[
                { icon: Calendar, text: '22 dagen' },
                { icon: Clock, text: '10 min/dag' },
                { icon: Zap, text: '8 vaardigheden' },
                { icon: Volume2, text: 'Audio-intro' },
                { icon: Trophy, text: 'Vader-profiel' },
                { icon: Lock, text: 'Levenslang' },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2 text-[12px] rounded-lg px-3 py-2" style={{ backgroundColor: 'var(--surface)', color: 'var(--text2)' }}>
                  <f.icon className="h-3.5 w-3.5 shrink-0" style={{ color: '#F59E0B' }} />
                  {f.text}
                </div>
              ))}
            </div>

            <div
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-bold"
              style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}
            >
              Binnenkort beschikbaar
            </div>
          </div>

          <div className="space-y-1 text-[11px]" style={{ color: 'var(--text3)' }}>
            <p>De betaalpagina wordt binnenkort geactiveerd</p>
            <p>Eenmalige betaling &middot; Levenslang toegang &middot; Eigen tempo</p>
          </div>
        </div>
      </section>
    </div>
  );
}

const BookOpen = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);
