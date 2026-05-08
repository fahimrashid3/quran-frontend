import { getSurah } from "@/lib/api";
import { VerseCard } from "@/components/surah/VerseCard";
import { notFound } from "next/navigation";
import { getChapters } from "@/lib/api";

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [surah, chapters] = await Promise.all([getSurah(id), getChapters()]);

  if (!surah) return notFound();
  const chapter = chapters.find((c) => c.id === surah.chapter);

  return (
    <div className="mx-auto max-w-4xl px-3 py-4 sm:px-6">
      <div className="mb-5 py-4 text-center">
        <p
          className="mb-1 text-3xl leading-loose text-zinc-900 dark:text-zinc-100 sm:text-4xl"
        >
          Surah {chapter?.transliteration}
        </p>
        <p className="text-xs text-zinc-500">Ayah-{surah.verses.length}, {chapter?.type === "meccan" ? "Makkah" : chapter?.type === "medinan" ? "Madinah" : "Unknown"}</p>
      </div>

      <div className="flex flex-col divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-900 dark:border-zinc-800">
        {surah.verses.map((v) => (
          <VerseCard key={v.verse} verse={v} chapterId={surah.chapter} />
        ))}
      </div>
    </div>
  );
}