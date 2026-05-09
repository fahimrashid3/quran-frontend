"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";

function SearchIcon() {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export function ReadingNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const scrollHost = document.getElementById("reading-scroll-area");

    const getScrollTop = () => {
      const hostTop = scrollHost?.scrollTop ?? 0;
      const windowTop = window.scrollY || document.documentElement.scrollTop || 0;
      return Math.max(hostTop, windowTop);
    };

    lastScrollTopRef.current = getScrollTop();

    const onScroll = () => {
      const currentScrollTop = getScrollTop();
      const delta = currentScrollTop - lastScrollTopRef.current;

      if (currentScrollTop <= 8) {
        setIsVisible(true);
      } else if (delta > 2) {
        setIsVisible(false);
      } else if (delta < -2) {
        setIsVisible(true);
      }

      lastScrollTopRef.current = currentScrollTop;
    };

    scrollHost?.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });

    return () => {
      scrollHost?.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-zinc-200 bg-white/95 px-5 backdrop-blur transition-transform duration-300 ease-out dark:border-zinc-800 dark:bg-zinc-950/95 lg:flex ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-white">
          Q
        </div>
        <div>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">Quran Mazid</p>
          <p className="text-[10px] text-zinc-500">Read, study, and listen</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-100 text-zinc-600 transition hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <SearchIcon />
        </button>
        <ThemeSwitch />
        <button
          type="button"
          className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-primary-dark"
        >
          Support Us
        </button>
      </div>
    </header>
  );
}
