import Link from "next/link";
import type { Chapter } from "@/types";

export function ChapterCard({ ch }: { ch: Chapter }) {
  return (
    <Link
      href={`/surah/${ch.id}`}
      className="group flex items-center gap-4 px-5 py-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-teal-500 rounded-xl transition-all duration-200"
    >
      {/* Diamond badge */}
      <div className="relative flex items-center justify-center shrink-0 w-12 h-12">
        <div className="absolute w-10 h-10 bg-zinc-700 group-hover:bg-teal-700 border border-zinc-600 group-hover:border-teal-500 rotate-45 rounded-sm transition-all duration-200" />
        <span className="relative z-10 text-sm font-bold text-zinc-300 group-hover:text-white">
          {ch.id}
        </span>
      </div>

      {/* Name + transliteration */}
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold text-white leading-tight truncate">
          {ch.name}
        </span>
        <span className="text-xs text-teal-400 mt-0.5 truncate">
          {ch.transliteration}
        </span>
      </div>

      {/* Ayah count + type */}
      <div className="ml-auto flex flex-col items-end gap-1 shrink-0">
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
            ch.type === "meccan"
              ? "bg-amber-900/40 text-amber-400"
              : "bg-emerald-900/40 text-emerald-400"
          }`}
        >
          {ch.type}
        </span>
        <span className="text-xs text-zinc-500">{ch.total_verses} Ayahs</span>
      </div>
    </Link>
  );
}