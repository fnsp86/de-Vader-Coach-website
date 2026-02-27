'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Play, Pause } from 'lucide-react';

interface DayAudioPlayerProps {
  dag: number;
  script: string;
  color: string;
}

export default function DayAudioPlayer({ dag, script, color }: DayAudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const audioSrc = `/experience/audio/dag-${dag}.mp3`;

  // Check if audio file exists
  useEffect(() => {
    fetch(audioSrc, { method: 'HEAD' })
      .then(res => setHasAudio(res.ok))
      .catch(() => setHasAudio(false));
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setPlaying(false));
    }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    if (duration) setProgress((currentTime / duration) * 100);
  };

  const onEnded = () => {
    setPlaying(false);
    setProgress(0);
  };

  return (
    <div
      className="rounded-xl overflow-hidden mb-6"
      style={{ backgroundColor: color + '08', border: `1px solid ${color}15` }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Play button */}
        {hasAudio ? (
          <button
            onClick={togglePlay}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform hover:scale-95 cursor-pointer"
            style={{ backgroundColor: color + '20' }}
          >
            {playing
              ? <Pause className="h-4 w-4" style={{ color }} />
              : <Play className="h-4 w-4 ml-0.5" style={{ color }} />
            }
          </button>
        ) : (
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: color + '15' }}
          >
            <Volume2 className="h-4 w-4" style={{ color }} />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold" style={{ color }}>
              DAGSTART
            </span>
            {!hasAudio && (
              <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--surface2)', color: 'var(--text3)' }}>
                TEKST
              </span>
            )}
          </div>
          <p className="text-[12px] truncate" style={{ color: 'var(--text3)' }}>
            Luister of lees de intro van vandaag
          </p>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
          style={{ backgroundColor: color + '12', color }}
        >
          {expanded ? 'Inklappen' : 'Lees mee'}
        </button>
      </div>

      {/* Progress bar (only when audio is playing) */}
      {hasAudio && playing && (
        <div className="h-0.5 mx-4 mb-2 rounded-full overflow-hidden" style={{ backgroundColor: color + '15' }}>
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      )}

      {/* Expanded script text */}
      {expanded && (
        <div className="px-4 pb-4 pt-1 border-t" style={{ borderColor: color + '10' }}>
          <p className="text-[14px] leading-[1.8] whitespace-pre-line" style={{ color: 'var(--text2)' }}>
            {script}
          </p>
        </div>
      )}

      {/* Hidden audio element */}
      {hasAudio && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={onTimeUpdate}
          onEnded={onEnded}
          preload="none"
        />
      )}
    </div>
  );
}
