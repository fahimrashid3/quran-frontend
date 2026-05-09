"use client";

import type { Verse } from "@/types";
import { useSettings } from "@/context/SettingsContext";
import { useRef, useState } from "react";

export function VerseCard({ verse, chapterId }: { verse: Verse; chapterId: number }) {
  const { settings } = useSettings();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chapterPadded = String(chapterId).padStart(3, "0");
  const versePadded = String(verse.verse).padStart(3, "0");
  const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${chapterPadded}${versePadded}.mp3`;

  const toggleAudio = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-zinc-50 px-3 py-3 dark:bg-zinc-950/70 sm:px-5 sm:py-4">
      <div className="mb-2 flex items-center justify-between text-xs">
        <div className="text-primary">{chapterId}:{verse.verse}</div>
        <div className="flex items-center gap-3">
          <span className="text-zinc-500 dark:text-zinc-600">○</span>
          <span className="text-zinc-500 dark:text-zinc-600">⟐</span>
          <span className="text-zinc-500 dark:text-zinc-600">⌂</span>
          <span className="text-zinc-500 dark:text-zinc-600">⋯</span>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wide text-zinc-500 dark:text-zinc-500">Saheeh International</span>
        <button
          type="button"
          onClick={toggleAudio}
          className="rounded-md border border-zinc-300 px-2 py-1 text-[10px] text-zinc-700 hover:border-primary hover:text-primary dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-primary"
          aria-label={`Play ayah ${chapterId}:${verse.verse}`}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <div className="mb-2 flex items-center justify-end">
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-300 text-[10px] text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
          {verse.verse}
        </div>
      </div>
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="none"
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
      />

      <p
        className="py-2 text-right leading-loose text-zinc-900 dark:text-zinc-100 sm:px-2"
        dir="rtl"
        style={{
          fontFamily: settings.arabicFont,
          fontSize: `${settings.arabicFontSize}px`,
        }}
      >
        {verse.arabic}
      </p>

      <p
        className="pt-2 leading-relaxed text-zinc-700 dark:text-zinc-300 sm:px-2"
        style={{ fontSize: `${settings.englishFontSize}px` }}
      >
        {verse.english}
      </p>
    </div>
  );
}