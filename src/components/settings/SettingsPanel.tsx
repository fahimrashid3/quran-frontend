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
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md shadow-2xl pointer-events-auto">

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚙️</span>
              <span className="text-white text-lg font-semibold">Settings</span>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-white text-xl transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6 flex flex-col gap-7">
            <div className="flex items-center justify-between">
              <label className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                Theme
              </label>
              <ThemeSwitch />
            </div>

            {/* Arabic Font */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  Arabic Font
                </label>
                <span className="text-xs text-zinc-500">{settings.arabicFont}</span>
              </div>
              <select
                value={settings.arabicFont}
                onChange={(e) => update({ arabicFont: e.target.value as Settings["arabicFont"] })}
                className="w-full bg-zinc-800 border border-zinc-700 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-teal-500 transition-colors"
              >
                <option value="Amiri">Amiri</option>
                <option value="Scheherazade New">Scheherazade New</option>
              </select>

              {/* Preview */}
              <div className="mt-1 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700">
                <p
                  className="text-right text-zinc-200 leading-loose transition-all duration-200"
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
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  Arabic Font Size
                </label>
                <span className="text-sm text-teal-400 font-medium">
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
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-xs text-zinc-600">
                <span>20px</span>
                <span>48px</span>
              </div>
            </div>

            {/* English Font Size */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                  English Font Size
                </label>
                <span className="text-sm text-teal-400 font-medium">
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
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-xs text-zinc-600">
                <span>12px</span>
                <span>24px</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-zinc-800">
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </>
  );
}