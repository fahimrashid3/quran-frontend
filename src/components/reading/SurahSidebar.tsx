"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { Chapter } from "@/types";

export function SurahSidebar({ chapters }: { chapters: Chapter[] }) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  const activeId = useMemo(() => {
    const match = pathname.match(/\/surah\/(\d+)/);
    return match ? Number(match[1]) : null;
  }, [pathname]);

  const filtered = chapters.filter(
    (ch) =>
      ch.transliteration.toLowerCase().includes(search.toLowerCase()) ||
      ch.name.includes(search) ||
      String(ch.id).includes(search)
  );

  return (
    <aside className="scrollbar-hide hidden h-full min-h-0 w-sm flex-col overflow-hidden border-r border-zinc-800 bg-zinc-950 lg:flex">
      {/* Header */}
      <div className="shrink-0 border-b border-zinc-800 px-4 py-3">
        {/* Tabs */}
        <div className="mb-3 flex gap-1 rounded-xl bg-zinc-900 p-1 text-xs">
          {["Surah", "Juz", "Page"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 rounded-lg py-1 transition ${
                tab === "Surah"
                  ? "bg-zinc-800 text-zinc-200"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Surah..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-primary focus:outline-none"
        />
      </div>

      {/* List */}
      <div className="scrollbar-hide min-h-0 flex-1 overflow-y-auto p-2">
        <div className="space-y-2">
          {filtered.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/surah/${chapter.id}`}
              className={`group flex items-center gap-3 rounded-xl border px-3 py-3 transition-all duration-200 ${
                activeId === chapter.id
                  ? "border-primary/60 bg-primary/20"
                  : "border-zinc-900 bg-zinc-950 hover:border-zinc-800 hover:bg-zinc-900"
              }`}
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                <div
                  className={`absolute h-8 w-8 rotate-45 rounded-sm border transition-all duration-200 ${
                    activeId === chapter.id
                      ? "border-primary bg-primary/20"
                      : "border-zinc-800 bg-zinc-900 group-hover:border-primary group-hover:bg-primary/20"
                  }`}
                />
                <span
                  className={`relative z-10 text-xs font-bold ${
                    activeId === chapter.id
                      ? "text-primary"
                      : "text-zinc-400 group-hover:text-primary"
                  }`}
                >
                  {chapter.id}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-zinc-100">
                  {chapter.transliteration}
                </p>
                <p className="mt-0.5 truncate text-xs text-zinc-500">
                  {chapter.translation || chapter.transliteration}
                </p>
              </div>

              <p
                className="shrink-0 text-xs text-zinc-500"
                style={{ fontFamily: "Amiri" }}
              >
                {chapter.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}