"use client";

import dynamic from "next/dynamic";
import { useSettings } from "@/context/SettingsContext";

function ThemeSwitchComponent() {
  const { settings, update } = useSettings();

  const isDark = settings.theme === "dark";

  return (
    <button
      type="button"
      onClick={() =>
        update({
          theme: isDark ? "light" : "dark",
        })
      }
      className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
      aria-label="Toggle theme"
    >
      {isDark ? "Light Mode" : "Dark Mode"}
    </button>
  );
}

export const ThemeSwitch = dynamic(
  async () => ThemeSwitchComponent,
  {
    ssr: false,
  }
);