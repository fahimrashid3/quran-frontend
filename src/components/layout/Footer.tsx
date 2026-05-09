import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">📖</span>
            <span className="font-bold text-zinc-900 dark:text-white">Quran App</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Read, explore, and reflect on the Holy Quran with clean translations and beautiful typography.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
            Navigate
          </p>
          <ul className="space-y-2">
            {[
              { label: "Home", href: "/" },
              { label: "Read Quran", href: "/read" },
              { label: "Search", href: "/search" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-zinc-600 transition-colors hover:text-primary dark:text-zinc-400">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Note */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
            About
          </p>
          <p className="text-xs text-zinc-500 leading-relaxed">
            This app provides access to the Quran text with English translations for educational and spiritual purposes.
          </p>
        </div>
      </div>

      <div className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-600 dark:border-zinc-800">
        © {new Date().getFullYear()} Quran App. Built with Next.js & HeroUI.
      </div>
    </footer>
  );
}