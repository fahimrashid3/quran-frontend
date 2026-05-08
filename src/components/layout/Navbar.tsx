"use client";

import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
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

function GearIcon() {
  return (
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
      <circle cx="12" cy="12" r="3.5" />
      <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1 1 0 0 1 0 1.4l-1.4 1.4a1 1 0 0 1-1.4 0l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V20a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1 1 0 0 1-1.4 0l-1.4-1.4a1 1 0 0 1 0-1.4l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1 1 0 0 1 0-1.4l1.4-1.4a1 1 0 0 1 1.4 0l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1 1 0 0 1 1.4 0l1.4 1.4a1 1 0 0 1 0 1.4l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6H20a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-.2a1 1 0 0 0-.9.6Z" />
    </svg>
  );
}

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
        className="h-16 border-zinc-800 bg-zinc-950 px-4"
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
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-600 text-xs font-bold text-white">
                Q
              </div>
              <div>
                <p className="text-base font-semibold text-zinc-100">Quran Mazid</p>
                <p className="text-[10px] text-zinc-500">Read, study, and learn the Quran</p>
              </div>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop links */}
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {links.map((l) => {
            const isActive = pathname === l.href;

            return (
              <NavbarItem key={l.href} isActive={isActive}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition ${
                    isActive
                      ? "text-emerald-400"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {l.label}
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
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              aria-label="Settings"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 transition hover:text-zinc-200"
            >
              <GearIcon />
            </button>
          </NavbarItem>
          <NavbarItem className="hidden sm:block">
            <button
              type="button"
              className="rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-600"
            >
              Support Us
            </button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile menu */}
        <NavbarMenu className="gap-5 bg-zinc-950 pt-6">
          {links.map((l) => (
            <NavbarMenuItem key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`text-lg font-medium transition ${
                  pathname === l.href
                    ? "text-emerald-400 underline"
                    : "text-zinc-300 hover:text-white"
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