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
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center sm:p-8">
        <p
          className="mb-3 text-4xl leading-loose text-zinc-100 sm:text-5xl"
          style={{ fontFamily: "Amiri" }}
        >
          {surah.name}
        </p>
        <h1 className="text-xl font-bold text-zinc-100">{surah.transliteration}</h1>
        <p className="mt-1 text-sm text-zinc-400">Surah {surah.chapter}</p>
        <div className="mt-4 flex justify-center gap-6">
          <span className="text-xs text-zinc-400">{surah.verses.length} Ayahs</span>
          <span className="text-xs text-zinc-400 capitalize">
            {chapter?.type === "meccan" ? "Makkah" : chapter?.type === "medinan" ? "Madinah" : "Unknown"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {surah.verses.map((v) => (
          <VerseCard key={v.verse} verse={v} chapterId={surah.chapter} />
        ))}
      </div>
    </div>
  );
}