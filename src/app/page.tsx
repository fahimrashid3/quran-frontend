"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      {/* Arabic bismillah */}
      <p className="text-4xl text-zinc-300 mb-6 font-amiri" style={{ fontFamily: "Amiri" }}>
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </p>

      <div className="w-16 h-0.5 bg-teal-500 rounded-full mb-8" />

      <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
        Read the Holy Quran
      </h1>
      <p className="text-zinc-400 text-lg max-w-xl mb-10 leading-relaxed">
        Explore all 114 Surahs with Arabic text and English translation. Clean, fast, and distraction-free.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
  <Button
    as={Link}
    href="/read"
    size="lg"
    className="bg-teal-600 hover:bg-teal-500 text-white font-semibold px-8 py-3 rounded-full flex items-center justify-center text-center"
  >
    Start Reading
  </Button>

  <Button
    as={Link}
    href="/search"
    size="lg"
    className="border border-zinc-700 text-zinc-300 hover:border-teal-500 hover:text-white px-8 py-3 rounded-full flex items-center justify-center text-center"
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
            <p className="text-2xl font-bold text-teal-400">{s.value}</p>
            <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}