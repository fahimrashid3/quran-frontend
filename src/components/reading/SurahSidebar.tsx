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
    <aside className="scrollbar-hide hidden h-full w-[300px] flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:flex">
      {/* Header */}
      <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        {/* Tabs */}
        <div className="mb-3 flex gap-1 rounded-xl bg-zinc-100 p-1 text-xs dark:bg-zinc-900">
          {["Surah", "Juz", "Page"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 rounded-lg py-1 transition ${
                tab === "Surah"
                  ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-200"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
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
          className="w-full rounded-xl border border-zinc-300 bg-zinc-100 px-3 py-2 text-xs text-zinc-700 placeholder:text-zinc-400 focus:border-emerald-700 focus:outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:placeholder:text-zinc-600"
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
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950 dark:hover:border-zinc-800 dark:hover:bg-zinc-900"
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