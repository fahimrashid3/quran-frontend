"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import type { Settings } from "@/types";

const defaults: Settings = {
  arabicFont: "Amiri",
  arabicFontSize: 28,
  englishFontSize: 15,
  theme: "dark",
};
const SETTINGS_KEY = "quran-settings";
const SETTINGS_EVENT = "quran-settings-change";
let cachedRaw: string | null = null;
let cachedSettings: Settings = defaults;

function readSettings(): Settings {
  if (typeof window === "undefined") return defaults;

  try {
    const saved = localStorage.getItem(SETTINGS_KEY);

    if (saved === cachedRaw) return cachedSettings;

    cachedRaw = saved;
    cachedSettings = saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    return cachedSettings;
  } catch {
    return defaults;
  }
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => {};

  const onStorage = (event: StorageEvent) => {
    if (event.key === SETTINGS_KEY) onStoreChange();
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(SETTINGS_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(SETTINGS_EVENT, onStoreChange);
  };
}

const SettingsContext = createContext<{
  settings: Settings;
  update: (s: Partial<Settings>) => void;
}>({ settings: defaults, update: () => {} });

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(readSettings());

    const onStoreChange = () => setSettings(readSettings());

    window.addEventListener("storage", onStoreChange);
    window.addEventListener(SETTINGS_EVENT, onStoreChange);

    return () => {
      window.removeEventListener("storage", onStoreChange);
      window.removeEventListener(SETTINGS_EVENT, onStoreChange);
    };
  }, []);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", settings.theme === "dark");
  }, [settings.theme]);

  const update = (partial: Partial<Settings>) => {
    const next = { ...readSettings(), ...partial };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
    setSettings(next);
    window.dispatchEvent(new Event(SETTINGS_EVENT));
  };

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);