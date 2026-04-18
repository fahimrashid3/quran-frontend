"use client";

import { HeroUIProvider } from "@heroui/react";
import { SettingsProvider } from "@/context/SettingsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <SettingsProvider>
        {children}
      </SettingsProvider>
    </HeroUIProvider>
  );
}