import type { Chapter } from "@/types";

export function SurahHeader({ chapter }: { chapter: Chapter }) {
  return (
    <div className="grid grid-cols-1 items-center gap-y-4 border-b border-zinc-200 px-6 py-5 dark:border-zinc-800 tablet:grid-cols-3">
      {/* Left image - Makkah/Madinah */}
      <div className="hidden lg:block w-[140px]">
        {chapter.type === "meccan" ? (
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="text-xs">makkah</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-zinc-500">
            <span className="text-xs">madinah</span>
          </div>
        )}
      </div>

      {/* Center - Surah info */}
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 lg:text-2xl">
          Surah {chapter.transliteration}
        </h1>
        <p
          className="text-2xl text-zinc-700 dark:text-zinc-300"
          style={{ fontFamily: "Amiri" }}
        >
          {chapter.name}
        </p>
        <p className="text-sm capitalize text-zinc-500">
          Ayah-{chapter.total_verses},{" "}
          {chapter.type === "meccan" ? "makkah" : "madinah"}
        </p>
      </div>

      {/* Right - empty for balance */}
      <div className="hidden lg:block" />
    </div>
  );
}