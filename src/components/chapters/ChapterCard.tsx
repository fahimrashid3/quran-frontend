import Link from "next/link";
import type { Chapter } from "@/types";

export function ChapterCard({ ch }: { ch: Chapter }) {
  return (
    <Link
      href={`/surah/${ch.id}`}
      className="group flex items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-4 transition-all duration-200 hover:border-emerald-500 hover:bg-zinc-800"
    >
      <div className="relative flex items-center justify-center shrink-0 w-12 h-12">
        <div className="absolute w-10 h-10 rotate-45 rounded-sm border border-zinc-700 bg-zinc-800 transition-all duration-200 group-hover:border-emerald-500 group-hover:bg-emerald-900/30" />
        <span className="relative z-10 text-sm font-bold text-zinc-200 group-hover:text-emerald-300">
          {ch.id}
        </span>
      </div>

      <div className="flex flex-col min-w-0">
        <span className="text-sm font-semibold leading-tight text-zinc-100 truncate">
          {ch.name}
        </span>
        <span className="mt-0.5 truncate text-xs text-zinc-400">
          {ch.translation || ch.transliteration}
        </span>
      </div>

      <div className="ml-auto flex flex-col items-end gap-1 shrink-0">
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${
            ch.type === "meccan"
              ? "bg-amber-900/40 text-amber-300"
              : "bg-emerald-900/40 text-emerald-300"
          }`}
        >
          {ch.type}
        </span>
        <span className="text-xs text-zinc-500">{ch.total_verses} Ayahs</span>
      </div>
    </Link>
  );
}