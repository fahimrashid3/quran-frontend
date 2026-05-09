import { getChapters } from "@/lib/api";
import { ChapterCard } from "@/components/chapters/ChapterCard";

export default async function ReadPage() {
  const chapters = await getChapters();

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8 text-center">
        <span className="text-primary text-[11px] font-bold tracking-[2px] uppercase">
          114 Surahs
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Read the Quran
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Choose a Surah from the left sidebar or the quick grid below.
        </p>
        <div className="bg-primary mx-auto mt-4 h-0.5 w-10 rounded-full" />
      </div>

      {chapters.length === 0 ? (
        <p className="py-20 text-center text-zinc-500">
          Could not load chapters. Make sure the backend is running.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch) => (
            <ChapterCard key={ch.id} ch={ch} />
          ))}
        </div>
      )}
    </div>
  );
}