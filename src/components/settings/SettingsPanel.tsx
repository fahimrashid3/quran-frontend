"use client";

import type { Settings } from "@/types";
import { useSettings } from "@/context/SettingsContext";
import { useEffect } from "react";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";

export function SettingsPanel({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { settings, update } = useSettings();

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-sm text-primary">⚙️</span>
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">Settings</span>
            </div>
            <button
              onClick={onClose}
              className="text-xl text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 flex flex-col gap-7">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Theme
              </label>
              <ThemeSwitch />
            </div>

            {/* Arabic Font */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Arabic Font
                </label>
                <span className="text-xs text-zinc-500">{settings.arabicFont}</span>
              </div>
              <select
                value={settings.arabicFont}
                onChange={(e) => update({ arabicFont: e.target.value as Settings["arabicFont"] })}
                className="w-full rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-2 text-sm text-zinc-900 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              >
                <option value="Amiri">Amiri</option>
                <option value="Scheherazade New">Scheherazade New</option>
              </select>

              {/* Preview */}
              <div className="mt-1 rounded-xl border border-zinc-200 bg-zinc-100 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                <p
                  className="text-right leading-loose text-zinc-800 transition-all duration-200 dark:text-zinc-200"
                  style={{
                    fontFamily: settings.arabicFont,
                    fontSize: `${settings.arabicFontSize}px`,
                  }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            </div>

            {/* Arabic Font Size */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Arabic Font Size
                </label>
                <span className="text-primary text-sm font-medium">
                  {settings.arabicFontSize}px
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={48}
                step={1}
                value={settings.arabicFontSize}
                onChange={(e) => update({ arabicFontSize: Number(e.target.value) })}
                className="w-full accent-(--primary)"
              />
              <div className="flex justify-between text-xs text-zinc-600">
                <span>20px</span>
                <span>48px</span>
              </div>
            </div>

            {/* English Font Size */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  English Font Size
                </label>
                <span className="text-primary text-sm font-medium">
                  {settings.englishFontSize}px
                </span>
              </div>
              <input
                type="range"
                min={12}
                max={24}
                step={1}
                value={settings.englishFontSize}
                onChange={(e) => update({ englishFontSize: Number(e.target.value) })}
                className="w-full accent-(--primary)"
              />
              <div className="flex justify-between text-xs text-zinc-600">
                <span>12px</span>
                <span>24px</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-800">
            <button
              onClick={onClose}
              className="rounded-lg border border-zinc-300 px-5 py-2 text-sm text-zinc-600 transition-colors hover:border-primary hover:text-primary dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-primary"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  );
}