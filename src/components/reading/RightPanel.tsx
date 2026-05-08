"use client";

import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { useSettings } from "@/context/SettingsContext";
import type { Settings } from "@/types";

export function RightPanel({ mobile = false }: { mobile?: boolean }) {
  const { settings, update } = useSettings();

  return (
    <aside
      className={`
        border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950
        ${mobile
          ? "w-full h-full overflow-y-auto flex flex-col"
          : "hidden lg:flex lg:flex-col lg:w-sm lg:h-full lg:overflow-hidden border-l"
        }
      `}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          Settings
        </p>
        <ThemeSwitch />
      </div>

      {/* Content wrapper ensures scroll works properly */}
      <div className="flex-1 space-y-6 text-xs overflow-y-auto pr-1">
        
        {/* Arabic Font */}
        <div>
          <p className="mb-2 font-medium text-zinc-600 dark:text-zinc-400">Arabic Font</p>

          <select
            value={settings.arabicFont}
            onChange={(e) =>
              update({
                arabicFont: e.target.value as Settings["arabicFont"],
              })
            }
            className="w-full rounded-md border border-zinc-200 bg-zinc-100 px-3 py-2 text-xs text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          >
            <option value="Amiri">Amiri</option>
            <option value="Scheherazade New">Scheherazade New</option>
          </select>

          <p
            dir="rtl"
            className="mt-3 rounded-lg border border-zinc-200 bg-zinc-100 p-3 text-right text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            style={{
              fontFamily: settings.arabicFont,
              fontSize: `${settings.arabicFontSize}px`,
            }}
          >
            بِسْمِ اللَّهِ
          </p>
        </div>

        {/* Font Size */}
        <div>
          <div className="mb-2 flex justify-between text-zinc-600 dark:text-zinc-400">
            <span>Arabic Font Size</span>
            <span className="text-emerald-400 font-semibold">
              {settings.arabicFontSize}px
            </span>
          </div>

          <input
            type="range"
            min={20}
            max={48}
            value={settings.arabicFontSize}
            onChange={(e) =>
              update({ arabicFontSize: Number(e.target.value) })
            }
            className="w-full accent-emerald-500"
          />
        </div>

        <div>
          <div className="mb-2 flex justify-between text-zinc-600 dark:text-zinc-400">
            <span>Translation Font Size</span>
            <span className="text-emerald-400 font-semibold">
              {settings.englishFontSize}px
            </span>
          </div>

          <input
            type="range"
            min={12}
            max={24}
            value={settings.englishFontSize}
            onChange={(e) =>
              update({ englishFontSize: Number(e.target.value) })
            }
            className="w-full accent-emerald-500"
          />
        </div>

        {/* Support */}
        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-3 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="font-medium text-zinc-700 dark:text-zinc-300">
            Help spread the knowledge of Islam
          </p>

          <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-500">
            Support this mission and be part of the change.
          </p>

          <button className="mt-3 w-full rounded-md bg-emerald-600 py-2 text-xs font-semibold text-white">
            Support Us
          </button>
        </div>
      </div>
    </aside>
  );
}