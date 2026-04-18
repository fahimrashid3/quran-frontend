"use client";

import type { Verse } from "@/types";
import { useSettings } from "@/context/SettingsContext";

export function VerseCard({ verse, chapterId }: { verse: Verse; chapterId: number }) {
  const { settings } = useSettings();

  return (
    <div className="border border-zinc-800 rounded-xl bg-zinc-900 hover:border-zinc-700 transition-colors">
      {/* Verse number header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-900/40 border border-teal-800">
          <span className="text-xs font-bold text-teal-400">{verse.verse}</span>
        </div>
        <span className="text-xs text-zinc-600">{chapterId}:{verse.verse}</span>
      </div>

      {/* Arabic */}
      <p
        className="text-right px-6 py-5 text-zinc-100 leading-loose"
        dir="rtl"
        style={{
          fontFamily: settings.arabicFont,
          fontSize: `${settings.arabicFontSize}px`,
        }}
      >
        {verse.arabic}
      </p>

      {/* Divider */}
      <div className="mx-5 border-t border-zinc-800" />

      {/* English */}
      <p
        className="px-6 py-4 text-zinc-400 leading-relaxed"
        style={{ fontSize: `${settings.englishFontSize}px` }}
      >
        {verse.english}
      </p>
    </div>
  );
}