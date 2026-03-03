'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Loader2, Play, RotateCcw } from 'lucide-react';
import type { SlideConfig } from '@/lib/instagram-captions';

interface ReelGeneratorProps {
  slides: SlideConfig[];
  getImageUrl: (slide: SlideConfig) => string;
  audioSrc?: string;
  audioVolume?: number;
  onComplete: (blob: Blob) => void;
}

const SLIDE_DURATION = 3.5; // seconds per slide
const TRANSITION_DURATION = 0.5; // seconds crossfade
const FPS = 30;

export default function ReelGenerator({
  slides,
  getImageUrl,
  audioSrc,
  audioVolume = 0.3,
  onComplete,
}: ReelGeneratorProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'recording' | 'done' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const abortRef = useRef(false);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const generate = useCallback(async () => {
    if (!canvasRef.current || slides.length === 0) return;

    // Check MP4 MediaRecorder support
    if (!MediaRecorder.isTypeSupported('video/mp4')) {
      setStatus('error');
      setErrorMsg('Je browser ondersteunt geen MP4 opname. Gebruik Chrome 124+ voor het genereren van Reels.');
      return;
    }

    abortRef.current = false;
    setStatus('loading');
    setProgress(0);
    setErrorMsg('');

    try {
      // 1. Load all slide images
      const images: HTMLImageElement[] = [];
      for (let i = 0; i < slides.length; i++) {
        if (abortRef.current) return;
        setProgress(Math.round((i / slides.length) * 20)); // 0-20% for loading

        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Kon slide ${i + 1} niet laden`));
          img.src = getImageUrl(slides[i]);
        });
        images.push(img);
      }

      // 2. Setup canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context niet beschikbaar');

      canvas.width = 1080;
      canvas.height = 1080;

      // 3. Setup audio (if provided)
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
        gainNode.connect(audioCtx.destination); // Monitor audio
      }

      // 4. Setup MediaRecorder
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
        mimeType: 'video/mp4',
        videoBitsPerSecond: 2_000_000,
      });

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const recordingDone = new Promise<Blob>((resolve) => {
        recorder.onstop = () => {
          resolve(new Blob(chunks, { type: 'video/mp4' }));
        };
      });

      // 5. Start recording
      setStatus('recording');
      recorder.start();
      if (audioElement) audioElement.play();

      const totalDuration = slides.length * SLIDE_DURATION;
      const totalFrames = Math.ceil(totalDuration * FPS);
      const framesPerSlide = Math.ceil(SLIDE_DURATION * FPS);
      const transitionFrames = Math.ceil(TRANSITION_DURATION * FPS);

      // 6. Render frames
      for (let frame = 0; frame < totalFrames; frame++) {
        if (abortRef.current) {
          recorder.stop();
          if (audioElement) audioElement.pause();
          return;
        }

        const time = frame / FPS;
        const slideIndex = Math.min(Math.floor(time / SLIDE_DURATION), slides.length - 1);
        const slideTime = time - slideIndex * SLIDE_DURATION;

        // Draw current slide
        ctx.globalAlpha = 1;
        ctx.drawImage(images[slideIndex], 0, 0, 1080, 1080);

        // Crossfade transition to next slide
        if (slideIndex < slides.length - 1) {
          const transitionStart = SLIDE_DURATION - TRANSITION_DURATION;
          if (slideTime > transitionStart) {
            const t = (slideTime - transitionStart) / TRANSITION_DURATION;
            ctx.globalAlpha = t;
            ctx.drawImage(images[slideIndex + 1], 0, 0, 1080, 1080);
          }
        }

        // Audio fade-out in last 2 seconds
        if (gainNode && totalDuration - time < 2) {
          gainNode.gain.value = audioVolume * ((totalDuration - time) / 2);
        }

        // Update progress (20-95% for recording)
        setProgress(20 + Math.round((frame / totalFrames) * 75));

        // Wait for next frame
        await new Promise((resolve) => setTimeout(resolve, 1000 / FPS));
      }

      // 7. Stop recording
      ctx.globalAlpha = 1;
      recorder.stop();
      if (audioElement) audioElement.pause();
      if (audioCtx) audioCtx.close();

      const blob = await recordingDone;
      setProgress(100);
      setStatus('done');

      // Create preview URL
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      onComplete(blob);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : 'Er ging iets mis bij het genereren');
    }
  }, [slides, getImageUrl, audioSrc, audioVolume, onComplete, previewUrl]);

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

  const totalSeconds = Math.round(slides.length * SLIDE_DURATION);

  return (
    <div className="space-y-3">
      {/* Hidden canvas for rendering */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Preview */}
      {previewUrl && status === 'done' && (
        <video
          src={previewUrl}
          controls
          className="w-full rounded-xl"
          style={{ maxHeight: 400 }}
        />
      )}

      {/* Progress bar */}
      {(status === 'loading' || status === 'recording') && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text2)' }}>
            <Loader2 className="h-4 w-4 animate-spin" />
            {status === 'loading' ? 'Slides laden...' : `Reel opnemen (${totalSeconds}s)...`}
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
            disabled={slides.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-black transition-transform hover:scale-[0.97] disabled:opacity-50"
            style={{ backgroundColor: '#F59E0B' }}
          >
            <Play className="h-4 w-4" />
            Maak Reel ({totalSeconds}s, {slides.length} slides)
          </button>
        )}
        {status === 'done' && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors hover:bg-zinc-700"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text2)' }}
          >
            <RotateCcw className="h-4 w-4" />
            Opnieuw
          </button>
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
