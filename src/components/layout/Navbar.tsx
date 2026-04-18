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
        className="bg-zinc-900 border-zinc-800"
        maxWidth="xl"
      >
        {/* Mobile toggle */}
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle className="text-zinc-300" />
        </NavbarContent>

        {/* Brand */}
        <NavbarContent className="sm:flex-none" justify="start">
          <NavbarBrand>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <span className="font-bold text-white text-lg tracking-tight">
                Quran App
              </span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        {/* Desktop links */}
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          {links.map((l) => (
            <NavbarItem key={l.href} isActive={pathname === l.href}>
              <Link
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === l.href
                    ? "text-teal-400"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        {/* Settings button */}
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              size="sm"
              className="bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700"
              onPress={() => setSettingsOpen(true)}
            >
              ⚙️ Settings
            </Button>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile menu */}
        <NavbarMenu className="bg-zinc-900 pt-6 gap-4">
          {links.map((l) => (
            <NavbarMenuItem key={l.href}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium ${
                  pathname === l.href ? "text-teal-400" : "text-zinc-300"
                }`}
              >
                {l.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </HeroNavbar>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </>
  );
}