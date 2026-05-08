"use client";

import { useState } from "react";
import type { Chapter } from "@/types";
import { IconSidebar } from "./IconSidebar";
import { SurahSidebar } from "./SurahSidebar";
import { RightPanel } from "./RightPanel";
import { MobileSurahDrawer } from "./MobileSurahDrawer";

export function ReadingLayoutShell({
  chapters,
  children,
}: {
  chapters: Chapter[];
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <main className="h-screen overflow-hidden bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex h-full">
        <IconSidebar />
        <SurahSidebar chapters={chapters} />

        {/* Main */}
        <section className="flex-1 h-full overflow-y-auto">
          {/* Mobile Topbar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95 lg:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
            >
              ☰ Surahs
            </button>

            <span className="text-sm font-semibold">📖 Quran</span>

            <button
              onClick={() => setSettingsOpen(true)}
              className="rounded-md border border-zinc-300 px-3 py-1 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
            >
              ⚙️
            </button>
          </div>

          {children}
        </section>

        {/* Desktop only */}
        <RightPanel />
      </div>

      {/* Mobile Surah Drawer */}
      <MobileSurahDrawer
        chapters={chapters}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Mobile Settings Drawer */}
      {settingsOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSettingsOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[320px] bg-white shadow-xl dark:bg-zinc-950">
            <div className="flex items-center justify-between border-b border-zinc-200 p-4 dark:border-zinc-800">
              <p className="font-semibold">Settings</p>
              <button onClick={() => setSettingsOpen(false)}>✕</button>
            </div>

            <RightPanel />
          </div>
        </div>
      )}
    </main>
  );
}