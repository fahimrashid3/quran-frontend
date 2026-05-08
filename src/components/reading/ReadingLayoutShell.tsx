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
    <main className="h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="flex h-full">
        <IconSidebar />
        <SurahSidebar chapters={chapters} />

        {/* Main */}
        <section className="flex-1 h-full overflow-y-auto">
          {/* Mobile Topbar */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/95 px-4 py-3 backdrop-blur lg:hidden">
            <button
              onClick={() => setDrawerOpen(true)}
              className="rounded-md border border-zinc-700 px-3 py-1 text-sm"
            >
              ☰ Surahs
            </button>

            <span className="text-sm font-semibold">📖 Quran</span>

            <button
              onClick={() => setSettingsOpen(true)}
              className="rounded-md border border-zinc-700 px-3 py-1 text-sm"
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

          <div className="absolute right-0 top-0 h-full w-[320px] bg-zinc-950 shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-800 p-4">
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