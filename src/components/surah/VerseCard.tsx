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
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 transition-colors hover:border-zinc-700">
      <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-700/60 bg-emerald-900/40">
          <span className="text-xs font-bold text-emerald-300">{verse.verse}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleAudio}
            className="rounded-md border border-zinc-700 px-2 py-1 text-xs text-zinc-200 hover:border-emerald-500 hover:text-emerald-300"
            aria-label={`Play ayah ${chapterId}:${verse.verse}`}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <span className="text-xs text-zinc-500">{chapterId}:{verse.verse}</span>
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
        className="px-6 py-5 text-right leading-loose text-zinc-100"
        dir="rtl"
        style={{
          fontFamily: settings.arabicFont,
          fontSize: `${settings.arabicFontSize}px`,
        }}
      >
        {verse.arabic}
      </p>

      <div className="mx-5 border-t border-zinc-800" />

      <p
        className="px-6 py-4 leading-relaxed text-zinc-300"
        style={{ fontSize: `${settings.englishFontSize}px` }}
      >
        {verse.english}
      </p>
    </div>
  );
}