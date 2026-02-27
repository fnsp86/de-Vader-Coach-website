'use client';

import { useState, useEffect } from 'react';

const RATINGS_KEY = 'vader-experience-ratings';

export interface SkillRatings {
  [dag: number]: number; // 1-5 rating per day
}

function loadRatings(): SkillRatings {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(RATINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function saveRatings(ratings: SkillRatings) {
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

export function useSkillRatings() {
  const [ratings, setRatings] = useState<SkillRatings>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setRatings(loadRatings());
    setLoaded(true);
  }, []);

  const setRating = (dag: number, value: number) => {
    setRatings(prev => {
      const next = { ...prev, [dag]: value };
      saveRatings(next);
      return next;
    });
  };

  return { ratings, loaded, setRating };
}

interface SkillRatingProps {
  dag: number;
  skill: string;
  color: string;
}

export default function SkillRating({ dag, skill, color }: SkillRatingProps) {
  const { ratings, loaded, setRating } = useSkillRatings();

  if (!loaded) return null;

  const current = ratings[dag] || 0;

  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)' }}>
      <p className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text)' }}>
        Hoe bewust was je vandaag van <span style={{ color }}>{skill.toLowerCase()}</span>?
      </p>
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            onClick={() => setRating(dag, val)}
            className="flex-1 py-2 rounded-lg text-[13px] font-bold transition-all cursor-pointer"
            style={
              current === val
                ? { backgroundColor: color, color: '#000' }
                : current > 0 && val <= current
                  ? { backgroundColor: color + '25', color }
                  : { backgroundColor: 'var(--surface2)', color: 'var(--text3)' }
            }
          >
            {val}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px]" style={{ color: 'var(--text3)' }}>Niet bewust</span>
        <span className="text-[10px]" style={{ color: 'var(--text3)' }}>Heel bewust</span>
      </div>
    </div>
  );
}
