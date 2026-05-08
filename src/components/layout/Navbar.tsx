"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SettingsPanel } from "@/components/settings/SettingsPanel";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";

const links = [
  { label: "Home", href: "/" },
  { label: "Read Quran", href: "/read" },
  { label: "Search", href: "/search" },
];

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <HeroNavbar
        isBordered
        isMenuOpen={menuOpen}
        onMenuOpenChange={setMenuOpen}
        className="h-20 border-zinc-200 bg-white px-4 dark:border-zinc-800 dark:bg-zinc-900"
        maxWidth="xl"
      >
        {/* Mobile toggle */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle className="text-zinc-600 dark:text-zinc-300" />
        </NavbarContent>

        {/* Brand */}
        <NavbarContent className="sm:flex-none" justify="start">
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
                Quran App
              </span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop links */}
        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          {links.map((l) => {
            const isActive = pathname === l.href;

            return (
              <NavbarItem key={l.href} isActive={isActive}>
                <Link
                  href={l.href}
                  className={`relative text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "text-teal-500"
                      : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                  }`}
                >
                  {l.label}

                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 w-full bg-teal-400 transition-transform duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        {/* Settings button */}
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:block">
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem>
           <Button
            size="sm"
            className="flex items-center justify-center rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-2 text-center text-zinc-700 transition hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:text-white"
            onPress={() => setSettingsOpen(true)}
          >
            ⚙️ Settings
          </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile menu */}
        <NavbarMenu className="gap-5 bg-white pt-6 dark:bg-zinc-900">
          {links.map((l) => (
            <NavbarMenuItem key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium transition ${
                  pathname === l.href
                    ? "text-teal-500 underline"
                    : "text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem>
            <ThemeSwitch />
          </NavbarMenuItem>
        </NavbarMenu>
      </HeroNavbar>

      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}