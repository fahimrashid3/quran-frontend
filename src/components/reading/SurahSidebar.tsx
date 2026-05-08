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
    <aside className="hidden lg:flex h-full w-[300px] flex-col border-r border-zinc-800 bg-zinc-950 scrollbar-hide">
      {/* Header */}
      <div className="border-b border-zinc-800 px-4 py-3">
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
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-emerald-700 focus:outline-none"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
        <div className="space-y-1">
          {filtered.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/surah/${chapter.id}`}
              className={`block rounded-xl border px-3 py-2 transition ${
                activeId === chapter.id
                  ? "border-emerald-700/60 bg-emerald-900/25 text-emerald-200"
                  : "border-zinc-900 bg-zinc-950 hover:border-zinc-800 hover:bg-zinc-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {chapter.id}. {chapter.transliteration}
                </p>

                <p
                  className="text-xs text-zinc-400"
                  style={{ fontFamily: "Amiri" }}
                >
                  {chapter.name}
                </p>
              </div>

              <p className="mt-0.5 text-xs text-zinc-500">
                {chapter.translation || chapter.transliteration}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}