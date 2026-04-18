"use client";

import { createContext, useContext, useState } from "react";
import type { Settings } from "@/types";

const defaults: Settings = {
  arabicFont: "Amiri",
  arabicFontSize: 28,
  englishFontSize: 15,
};

const SettingsContext = createContext<{
  settings: Settings;
  update: (s: Partial<Settings>) => void;
}>({ settings: defaults, update: () => {} });

export function SettingsProvider({ children }: { children: React.ReactNode }) {

  const [settings, setSettings] = useState<Settings>(() => {
    if (typeof window === "undefined") return defaults;

    try {
      const saved = localStorage.getItem("quran-settings");
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch {
      return defaults;
    }
  });

  const update = (partial: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...partial };
      localStorage.setItem("quran-settings", JSON.stringify(next));
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);