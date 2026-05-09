"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9.5V21h13V9.5" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5a2 2 0 0 1 2-2h12v17H6a2 2 0 1 0 0 4h12" />
      <path d="M8 7h6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.2 5.2-5.2 2.2 2.2-5.2 5.2-2.2z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h10v18l-5-3-5 3V3z" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <rect x="14" y="14" width="6" height="6" />
    </svg>
  );
}

const mainLinks = [
  { icon: HomeIcon, href: "/", label: "Home" },
  { icon: BookIcon, href: "/read", label: "Read" },
  { icon: SearchIcon, href: "/search", label: "Search" },
];

const toolIcons = [
  { icon: CompassIcon, label: "Explore" },
  { icon: BookmarkIcon, label: "Bookmarks" },
  { icon: GridIcon, label: "Layout" },
];

export function IconSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/read") return pathname === "/read" || pathname.startsWith("/surah/");
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden w-14 flex-col items-center justify-between border-r border-zinc-200 bg-zinc-50 py-4 dark:border-zinc-800 dark:bg-black lg:flex">
      <div className="flex flex-col items-center gap-3">
        {mainLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition ${
              isActive(item.href)
                ? "bg-primary text-white"
                : "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <item.icon />
          </Link>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        {toolIcons.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-label={item.label}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
          >
            <item.icon />
          </button>
        ))}
      </div>
    </aside>
  );
}