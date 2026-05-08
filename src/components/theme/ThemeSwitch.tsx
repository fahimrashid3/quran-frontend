"use client";

import dynamic from "next/dynamic";
import { useSettings } from "@/context/SettingsContext";

function ThemeSwitchComponent() {
  const { settings, update } = useSettings();

  const isDark = settings.theme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() =>
        update({
          theme: nextTheme,
        })
      }
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-white text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
      aria-label={label}
      title={label}
    >
      {isDark ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2.5" />
          <path d="M12 19.5V22" />
          <path d="M4.93 4.93l1.77 1.77" />
          <path d="M17.3 17.3l1.77 1.77" />
          <path d="M2 12h2.5" />
          <path d="M19.5 12H22" />
          <path d="M4.93 19.07l1.77-1.77" />
          <path d="M17.3 6.7l1.77-1.77" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="currentColor"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3a1 1 0 0 1 1.05 1.35 7 7 0 0 0 7.39 9.39A1 1 0 0 1 21 12.79Z" />
        </svg>
      )}
    </button>
  );
}

export const ThemeSwitch = dynamic(
  async () => ThemeSwitchComponent,
  {
    ssr: false,
  }
);