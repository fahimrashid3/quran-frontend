import { getSurah } from "@/lib/api";
import { VerseCard } from "@/components/surah/VerseCard";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function SurahPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surah = await getSurah(id);

  if (!surah) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Back */}
      <Link
        href="/read"
        className="inline-block mb-8 px-4 py-2 bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-sm transition-colors"
      >
        ← Back to Surahs
      </Link>

      {/* Header */}
      <div className="text-center mb-10 p-8 border border-zinc-800 rounded-2xl bg-zinc-900">
        <p
          className="text-5xl text-white mb-3 leading-loose"
          style={{ fontFamily: "Amiri" }}
        >
          {surah.name}
        </p>
        <h1 className="text-xl font-bold text-zinc-200">{surah.transliteration}</h1>
        <p className="text-sm text-zinc-500 mt-1">Surah {surah.chapter}</p>
        <div className="flex justify-center gap-6 mt-4">
          <span className="text-xs text-zinc-500">{surah.verses.length} Verses</span>
        </div>
      </div>

      {/* Verses */}
      <div className="flex flex-col gap-4">
        {surah.verses.map((v) => (
          <VerseCard key={v.verse} verse={v} chapterId={surah.chapter} />
        ))}
      </div>
    </div>
  );
}