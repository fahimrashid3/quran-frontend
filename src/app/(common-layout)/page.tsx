"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Cinzel_Decorative } from "next/font/google";
import HomeTopOrnament from "@/components/icon/HomeTopOrnament";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Page() {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-white dark:bg-zinc-950">
      <HomeTopOrnament className="pointer-events-none absolute left-[8%] top-0 hidden md:block w-16 h-46 text-zinc-400 dark:text-zinc-600 opacity-80" />
      <HomeTopOrnament className="pointer-events-none absolute right-[8%] top-0 hidden md:block w-16 h-46 scale-x-[-1] text-zinc-400 dark:text-zinc-600 opacity-80" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Arabic bismillah */}
        <p
          className="text-4xl text-zinc-900 dark:text-white mb-6"
          style={{ fontFamily: "Amiri" }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* Title */}
        <h1
          className={`${cinzel.className} text-[52px] font-bold text-zinc-900 dark:text-white mb-4 tracking-tight`}
        >
          Quran Mazid
        </h1>

        {/* Description */}
        <p className="text-zinc-700 dark:text-zinc-400 text-lg max-w-xl mb-10 leading-relaxed">
          Explore all 114 Surahs with Arabic text and English translation.
          Clean, fast, and distraction-free.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap justify-center">
          <Button
            as={Link}
            href="/read"
            size="lg"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-full flex items-center justify-center"
          >
            Start Reading
          </Button>

          <Button
            as={Link}
            href="/search"
            size="lg"
            className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full flex items-center justify-center"
          >
            Search Ayahs
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-sm w-full">
          {[
            { label: "Surahs", value: "114" },
            { label: "Ayahs", value: "6236" },
            { label: "Languages", value: "2" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-bold text-primary">
                {s.value}
              </p>
              <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}