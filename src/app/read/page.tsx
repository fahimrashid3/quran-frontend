import { getChapters } from "@/lib/api";
import { ChapterCard } from "@/components/chapters/ChapterCard";

export default async function ReadPage() {
  const chapters = await getChapters();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <span className="text-[11px] font-bold tracking-[2px] uppercase text-teal-400">
          114 Surahs
        </span>
        <h1 className="mt-3 text-3xl font-bold text-white tracking-tight">
          Read the Quran
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Select a Surah to begin reading
        </p>
        <div className="mx-auto mt-4 w-10 h-0.5 rounded-full bg-teal-500" />
      </div>

      {chapters.length === 0 ? (
        <p className="text-center text-zinc-500 py-20">
          Could not load chapters. Make sure the backend is running.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {chapters.map((ch) => (
            <ChapterCard key={ch.id} ch={ch} />
          ))}
        </div>
      )}
    </div>
  );
}