"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import type { Chapter } from "@/types";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";

export function ReadingLayoutShell({
  chapters,
  children,
}: {
  chapters: Chapter[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const activeId = useMemo(() => {
    const match = pathname.match(/\/surah\/(\d+)/);
    return match ? Number(match[1]) : null;
  }, [pathname]);

  return (
    <main className="h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="grid h-full grid-cols-1 lg:grid-cols-[56px_280px_minmax(0,1fr)_300px]">
        <aside className="hidden lg:flex flex-col items-center gap-4 border-r border-zinc-800 bg-zinc-900 py-4">
          <Link href="/" className="text-xl" aria-label="Home">🟢</Link>
          <Link href="/read" className="text-zinc-400 hover:text-white" aria-label="Read">📖</Link>
          <Link href="/search" className="text-zinc-400 hover:text-white" aria-label="Search">🔎</Link>
          <button className="text-zinc-400 hover:text-white" type="button" aria-label="Bookmarks">🔖</button>
          <button className="text-zinc-400 hover:text-white" type="button" aria-label="Settings">⚙️</button>
        </aside>

        <aside className="hidden lg:flex h-full flex-col border-r border-zinc-800 bg-zinc-900">
          <div className="border-b border-zinc-800 px-5 py-4">
            <p className="text-xs uppercase tracking-wide text-zinc-500">Surah</p>
            <h2 className="mt-1 text-sm font-semibold text-zinc-100">All 114 Surahs</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="space-y-1">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/surah/${chapter.id}`}
                  className={`block rounded-lg px-3 py-2 transition ${
                    activeId === chapter.id
                      ? "bg-emerald-900/40 text-emerald-300"
                      : "hover:bg-zinc-800"
                  }`}
                >
                  <p className="text-sm font-medium">{chapter.id}. {chapter.name}</p>
                  <p className="text-xs text-zinc-400">{chapter.translation || chapter.transliteration}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <section className="h-full overflow-y-auto">
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur lg:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="rounded-md border border-zinc-700 px-3 py-1 text-sm text-zinc-200"
            >
              Surahs
            </button>
            <ThemeSwitch />
          </div>
          {children}
        </section>

        <aside className="hidden h-full border-l border-zinc-800 bg-zinc-900 p-5 lg:block">
          <h3 className="text-sm font-semibold text-zinc-100">Reading Settings</h3>
          <p className="mt-2 text-xs leading-relaxed text-zinc-400">
            Adjust theme and typography from settings panel.
          </p>
          <div className="mt-4">
            <ThemeSwitch />
          </div>
        </aside>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[86%] max-w-sm border-r border-zinc-800 bg-zinc-900 p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-100">All 114 Surahs</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-sm text-zinc-400"
              >
                Close
              </button>
            </div>
            <div className="h-[calc(100%-40px)] overflow-y-auto space-y-1">
              {chapters.map((chapter) => (
                <Link
                  key={chapter.id}
                  href={`/surah/${chapter.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block rounded-lg px-3 py-2 transition ${
                    activeId === chapter.id
                      ? "bg-emerald-900/40 text-emerald-300"
                      : "hover:bg-zinc-800"
                  }`}
                >
                  <p className="text-sm font-medium">{chapter.id}. {chapter.name}</p>
                  <p className="text-xs text-zinc-400">{chapter.translation || chapter.transliteration}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
