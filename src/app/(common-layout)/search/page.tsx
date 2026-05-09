"use client";

import { useState, useTransition, useCallback } from "react";
import { Spinner } from "@heroui/react";
import { searchAyahs, getChapters } from "@/lib/api";
import type { SearchResult, Chapter } from "@/types";
import Link from "next/link";
import { useEffect } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const [searched, setSearched] = useState(false);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    getChapters().then(setChapters);
  }, []);

  const getSurahName = (id: number) => {
    const ch = chapters.find((c) => c.id === id);
    return ch ? `${ch.transliteration} — ${ch.name}` : `Surah ${id}`;
  };

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    if (q.trim().length < 3) {
      setResults([]);
      setSearched(false);
      return;
    }
    startTransition(async () => {
      const data = await searchAyahs(q);
      setResults(data);
      setSearched(true);
    });
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">Search Ayahs</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Search by Arabic or English words</p>
      </div>

      {/* Search input */}
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
          🔍
        </span>
        <input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="e.g. رحمة, mercy, patience..."
          className="w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 pl-10 pr-10 text-sm text-zinc-900 placeholder:text-zinc-500 transition-colors hover:border-primary focus:border-primary focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <Spinner size="sm" />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mt-8 flex flex-col gap-3">
        {results.map((r) => (
          <Link
            key={`${r.chapter}-${r.verse}`}
            href={`/surah/${r.chapter}`}
            className="block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-primary dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Surah name header */}
            <div className="mb-3 flex items-center justify-between border-b border-zinc-200 pb-2 dark:border-zinc-800">
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {getSurahName(r.chapter)}
              </span>
              <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                {r.chapter}:{r.verse}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{r.text}</p>
          </Link>
        ))}

        {searched && results.length === 0 && (
          <p className="text-center text-zinc-500 py-12">
            No results found for &quot;{query}&quot;
          </p>
        )}

        {!searched && (
          <p className="text-center text-zinc-600 py-12 text-sm">
            Type at least 3 characters to search
          </p>
        )}
      </div>
    </div>
  );
}