"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const icons = [
  { icon: "📖", href: "/", label: "Home" },
  { icon: "☰", href: "/read", label: "Read" },
  { icon: "🔍", href: "/search", label: "Search" },
];

export function IconSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex flex-col items-center gap-5 border-r border-zinc-800 bg-black py-4 w-[52px]">
      {icons.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-label={item.label}
          className={`rounded-md p-1.5 text-sm transition ${
            pathname === item.href
              ? "bg-emerald-600/90 text-white"
              : "text-zinc-500 hover:text-zinc-200"
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </aside>
  );
}