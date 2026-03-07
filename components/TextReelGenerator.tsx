'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Loader2, Play, RotateCcw, Download } from 'lucide-react';

interface TextReelGeneratorProps {
  /** Array of text lines to show sequentially */
  textSlides: string[];
  /** Optional audio source URL */
  audioSrc?: string;
  audioVolume?: number;
  /** Callback with the finished video blob */
  onComplete: (blob: Blob) => void;
}

type AnimationStyle = 'fade' | 'typewriter' | 'slideUp';
type BackgroundStyle = 'dark' | 'warm' | 'gradient' | 'minimal';

const BACKGROUNDS: Record<BackgroundStyle, { bg: string | CanvasGradient; text: string; accent: string; label: string }> = {
  dark: { bg: '#0C0C0E', text: '#F5F5F5', accent: '#F59E0B', label: 'Donker' },
  warm: { bg: '#1A1512', text: '#F5E6D3', accent: '#F59E0B', label: 'Warm' },
  gradient: { bg: '#0F172A', text: '#F1F5F9', accent: '#F59E0B', label: 'Blauw' },
  minimal: { bg: '#FAFAF9', text: '#1C1917', accent: '#B45309', label: 'Licht' },
};

const FPS = 30;

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, lineHeight: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function TextReelGenerator({
  textSlides,
  audioSrc,
  audioVolume = 0.3,
  onComplete,
}: TextReelGeneratorProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'recording' | 'done' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [animation, setAnimation] = useState<AnimationStyle>('fade');
  const [background, setBackground] = useState<BackgroundStyle>('dark');
  const [slideDuration, setSlideDuration] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const abortRef = useRef(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const totalSeconds = textSlides.length * slideDuration;

  const drawSlide = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      text: string,
      slideProgress: number,
      isLast: boolean,
      slideIndex: number,
    ) => {
      const theme = BACKGROUNDS[background];

      // Background
      if (background === 'gradient') {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#0F172A');
        grad.addColorStop(1, '#1E293B');
        ctx.fillStyle = grad;
      } else if (background === 'warm') {
        const grad = ctx.createLinearGradient(0, 0, 0, height);
        grad.addColorStop(0, '#1A1512');
        grad.addColorStop(1, '#231C17');
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = theme.bg as string;
      }
      ctx.fillRect(0, 0, width, height);

      // Subtle accent line at top
      ctx.fillStyle = theme.accent;
      ctx.fillRect(0, 0, width, 6);

      // Determine text animation
      let textAlpha = 1;
      let textOffsetY = 0;
      const fadeIn = 0.15; // 15% of slide for fade in
      const fadeOut = 0.1; // 10% for fade out

      if (animation === 'fade') {
        if (slideProgress < fadeIn) {
          textAlpha = slideProgress / fadeIn;
        } else if (slideProgress > 1 - fadeOut && !isLast) {
          textAlpha = (1 - slideProgress) / fadeOut;
        }
      } else if (animation === 'slideUp') {
        if (slideProgress < fadeIn) {
          const t = slideProgress / fadeIn;
          textAlpha = t;
          textOffsetY = (1 - t) * 80;
        } else if (slideProgress > 1 - fadeOut && !isLast) {
          const t = (1 - slideProgress) / fadeOut;
          textAlpha = t;
          textOffsetY = (1 - t) * -40;
        }
      } else if (animation === 'typewriter') {
        // For typewriter, we reveal characters progressively
        textAlpha = 1;
      }

      ctx.save();
      ctx.globalAlpha = textAlpha;

      // Main text
      const isQuote = text.startsWith('"') || text.startsWith('\u201C');
      const fontSize = text.length > 100 ? 52 : text.length > 60 ? 58 : 64;
      ctx.font = `700 ${fontSize}px -apple-system, "Segoe UI", sans-serif`;
      ctx.fillStyle = theme.text;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const maxWidth = width - 160;
      const lineHeight = fontSize * 1.45;

      let displayText = text;
      if (animation === 'typewriter') {
        const revealProgress = Math.min(slideProgress / 0.7, 1); // reveal over 70% of slide
        const charCount = Math.floor(displayText.length * revealProgress);
        displayText = displayText.slice(0, charCount);
      }

      const lines = wrapText(ctx, displayText, maxWidth, lineHeight);
      const totalTextHeight = lines.length * lineHeight;
      const startY = (height / 2) - (totalTextHeight / 2) + (lineHeight / 2) + textOffsetY;

      // Quote decoration
      if (isQuote && animation !== 'typewriter') {
        ctx.font = `700 120px Georgia, serif`;
        ctx.fillStyle = theme.accent;
        ctx.globalAlpha = textAlpha * 0.3;
        ctx.fillText('\u201C', width / 2, startY - totalTextHeight / 2 - 40);
        ctx.globalAlpha = textAlpha;
      }

      // Draw text lines
      ctx.font = `700 ${fontSize}px -apple-system, "Segoe UI", sans-serif`;
      ctx.fillStyle = theme.text;
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], width / 2, startY + i * lineHeight);
      }

      // Slide counter (bottom left)
      ctx.font = '600 28px -apple-system, "Segoe UI", sans-serif';
      ctx.fillStyle = theme.accent;
      ctx.globalAlpha = textAlpha * 0.5;
      ctx.textAlign = 'left';
      ctx.fillText(`${slideIndex + 1}/${textSlides.length}`, 60, height - 160);

      // Branding (bottom)
      ctx.font = '600 32px -apple-system, "Segoe UI", sans-serif';
      ctx.fillStyle = theme.accent;
      ctx.globalAlpha = textAlpha * 0.7;
      ctx.textAlign = 'center';
      ctx.fillText('@devadercoach', width / 2, height - 80);

      ctx.restore();
    },
    [animation, background, textSlides.length],
  );

  const generate = useCallback(async () => {
    if (!canvasRef.current || textSlides.length === 0) return;

    // Check browser support
    const supportsMp4 = MediaRecorder.isTypeSupported('video/mp4');
    const supportsWebm = MediaRecorder.isTypeSupported('video/webm;codecs=vp9');
    if (!supportsMp4 && !supportsWebm) {
      setStatus('error');
      setErrorMsg('Je browser ondersteunt geen video-opname. Gebruik Chrome 124+ of Firefox.');
      return;
    }
    const mimeType = supportsMp4 ? 'video/mp4' : 'video/webm;codecs=vp9';
    const ext = supportsMp4 ? 'mp4' : 'webm';

    abortRef.current = false;
    setStatus('loading');
    setProgress(0);
    setErrorMsg('');

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context niet beschikbaar');

      // 9:16 aspect ratio for Reels
      canvas.width = 1080;
      canvas.height = 1920;

      // Setup audio
      let audioCtx: AudioContext | null = null;
      let audioDest: MediaStreamAudioDestinationNode | null = null;
      let audioElement: HTMLAudioElement | null = null;
      let gainNode: GainNode | null = null;

      if (audioSrc) {
        audioCtx = new AudioContext();
        audioDest = audioCtx.createMediaStreamDestination();
        gainNode = audioCtx.createGain();
        gainNode.gain.value = audioVolume;

        audioElement = new Audio();
        audioElement.crossOrigin = 'anonymous';
        audioElement.src = audioSrc;
        audioElement.loop = true;

        await new Promise<void>((resolve, reject) => {
          audioElement!.oncanplaythrough = () => resolve();
          audioElement!.onerror = () => reject(new Error('Kon muziekbestand niet laden'));
          audioElement!.load();
        });

        const source = audioCtx.createMediaElementSource(audioElement);
        source.connect(gainNode);
        gainNode.connect(audioDest);
      }

      // Setup MediaRecorder
      const canvasStream = canvas.captureStream(FPS);
      let combinedStream: MediaStream;
      if (audioDest) {
        combinedStream = new MediaStream([
          ...canvasStream.getVideoTracks(),
          ...audioDest.stream.getAudioTracks(),
        ]);
      } else {
        combinedStream = canvasStream;
      }

      const recorder = new MediaRecorder(combinedStream, {
        mimeType,
        videoBitsPerSecond: 4_000_000,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const recordingDone = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          resolve(new Blob(chunks, { type: mimeType }));
        };
      });

      setStatus('recording');
      recorder.start();
      if (audioElement) audioElement.play();

      const totalDur = textSlides.length * slideDuration;
      const totalFrames = Math.ceil(totalDur * FPS);

      for (let frame = 0; frame < totalFrames; frame++) {
        if (abortRef.current) {
          recorder.stop();
          if (audioElement) audioElement.pause();
          return;
        }

        const time = frame / FPS;
        const slideIndex = Math.min(Math.floor(time / slideDuration), textSlides.length - 1);
        const slideTime = time - slideIndex * slideDuration;
        const slideProgress = slideTime / slideDuration;
        const isLast = slideIndex === textSlides.length - 1;

        drawSlide(ctx, canvas.width, canvas.height, textSlides[slideIndex], slideProgress, isLast, slideIndex);

        // Audio fade-out in last 2 seconds
        if (gainNode && totalDur - time < 2) {
          gainNode.gain.value = audioVolume * ((totalDur - time) / 2);
        }

        setProgress(Math.round((frame / totalFrames) * 100));
        await new Promise((resolve) => setTimeout(resolve, 1000 / FPS));
      }

      ctx.globalAlpha = 1;
      recorder.stop();
      if (audioElement) audioElement.pause();
      if (audioCtx) audioCtx.close();

      const blob = await recordingDone;
      setProgress(100);
      setStatus('done');

      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      onComplete(blob);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : 'Er ging iets mis bij het genereren');
    }
  }, [textSlides, slideDuration, audioSrc, audioVolume, onComplete, previewUrl, drawSlide]);

  // Live preview rendering
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const [previewSlide, setPreviewSlide] = useState(0);

  useEffect(() => {
    if (!previewCanvasRef.current || textSlides.length === 0 || status !== 'idle') return;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1920;
    drawSlide(ctx, 1080, 1920, textSlides[previewSlide] || textSlides[0], 0.5, false, previewSlide);
  }, [previewSlide, textSlides, background, animation, drawSlide, status]);

  function reset() {
    abortRef.current = true;
    setStatus('idle');
    setProgress(0);
    setErrorMsg('');
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }

  function downloadVideo() {
    if (!previewUrl) return;
    const a = document.createElement('a');
    a.href = previewUrl;
    a.download = `reel-${Date.now()}.mp4`;
    a.click();
  }

  if (textSlides.length === 0) return null;

  return (
    <div className="space-y-3">
      {/* Hidden render canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Settings */}
      {status === 'idle' && (
        <>
          {/* Style options */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold mb-1 block" style={{ color: 'var(--text3)' }}>
                Achtergrond
              </label>
              <div className="flex gap-1">
                {(Object.keys(BACKGROUNDS) as BackgroundStyle[]).map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBackground(bg)}
                    className="text-[10px] font-bold px-2 py-1.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: background === bg ? '#F59E0B' : 'var(--bg)',
                      color: background === bg ? '#000' : 'var(--text3)',
                    }}
                  >
                    {BACKGROUNDS[bg].label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-[11px] font-bold mb-1 block" style={{ color: 'var(--text3)' }}>
                Animatie
              </label>
              <div className="flex gap-1">
                {([
                  { id: 'fade' as const, label: 'Fade' },
                  { id: 'slideUp' as const, label: 'Slide' },
                  { id: 'typewriter' as const, label: 'Typen' },
                ]).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setAnimation(a.id)}
                    className="text-[10px] font-bold px-2 py-1.5 rounded-lg transition-colors"
                    style={{
                      backgroundColor: animation === a.id ? '#F59E0B' : 'var(--bg)',
                      color: animation === a.id ? '#000' : 'var(--text3)',
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-bold" style={{ color: 'var(--text3)' }}>
              Sec/slide:
            </label>
            {[2, 3, 4, 5].map((d) => (
              <button
                key={d}
                onClick={() => setSlideDuration(d)}
                className="text-[10px] font-bold px-2 py-1 rounded-lg transition-colors"
                style={{
                  backgroundColor: slideDuration === d ? '#F59E0B' : 'var(--bg)',
                  color: slideDuration === d ? '#000' : 'var(--text3)',
                }}
              >
                {d}s
              </button>
            ))}
            <span className="text-[10px] ml-auto" style={{ color: 'var(--text3)' }}>
              Totaal: {totalSeconds}s ({textSlides.length} slides)
            </span>
          </div>

          {/* Live preview */}
          <div className="relative">
            <canvas
              ref={previewCanvasRef}
              className="w-full rounded-xl"
              style={{ maxHeight: 400, aspectRatio: '9/16', backgroundColor: '#0C0C0E' }}
            />
            {/* Slide selector overlay */}
            {textSlides.length > 1 && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {textSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPreviewSlide(i)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor: i === previewSlide ? '#F59E0B' : 'rgba(255,255,255,0.3)',
                      transform: i === previewSlide ? 'scale(1.3)' : 'scale(1)',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Video preview when done */}
      {previewUrl && status === 'done' && (
        <video
          src={previewUrl}
          controls
          className="w-full rounded-xl"
          style={{ maxHeight: 400 }}
        />
      )}

      {/* Progress */}
      {(status === 'loading' || status === 'recording') && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text2)' }}>
            <Loader2 className="h-4 w-4 animate-spin" />
            Video genereren ({totalSeconds}s)...
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--border)' }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, backgroundColor: '#F59E0B' }}
            />
          </div>
          <p className="text-xs" style={{ color: 'var(--text3)' }}>{progress}%</p>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        {status === 'idle' && (
          <button
            onClick={generate}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97]"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <Play className="h-4 w-4" />
            Genereer Reel ({totalSeconds}s)
          </button>
        )}
        {status === 'done' && (
          <div className="flex gap-2">
            <button
              onClick={downloadVideo}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97]"
              style={{ backgroundColor: '#F59E0B' }}
            >
              <Download className="h-4 w-4" />
              Download
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-zinc-700"
              style={{ backgroundColor: 'var(--surface)', color: 'var(--text2)' }}
            >
              <RotateCcw className="h-4 w-4" />
              Opnieuw
            </button>
          </div>
        )}
        {(status === 'loading' || status === 'recording') && (
          <button
            onClick={reset}
            className="text-xs hover:underline"
            style={{ color: 'var(--text3)' }}
          >
            Annuleren
          </button>
        )}
      </div>
    </div>
  );
}
