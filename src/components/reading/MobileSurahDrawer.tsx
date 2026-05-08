"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import type { Chapter } from "@/types";

export function MobileSurahDrawer({
  chapters,
  isOpen,
  onClose,
}: {
  chapters: Chapter[];
  isOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const activeId = useMemo(() => {
    const match = pathname.match(/\/surah\/(\d+)/);
    return match ? Number(match[1]) : null;
  }, [pathname]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm border-r border-zinc-800 bg-zinc-900 flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-100">All 114 Surahs</h3>
          <button
            onClick={onClose}
            className="text-sm text-zinc-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/surah/${chapter.id}`}
              onClick={onClose}
              className={`block rounded-lg px-3 py-2 transition ${
                activeId === chapter.id
                  ? "bg-emerald-900/40 text-emerald-300"
                  : "hover:bg-zinc-800 text-zinc-300"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">
                  {chapter.id}. {chapter.transliteration}
                </p>
                <p className="text-xs text-zinc-500" style={{ fontFamily: "Amiri" }}>
                  {chapter.name}
                </p>
              </div>
              <p className="text-xs text-zinc-500">
                {chapter.translation || chapter.transliteration}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}