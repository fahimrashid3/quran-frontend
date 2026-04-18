"use client";

import { useState, useTransition, useCallback } from "react";
import { Spinner } from "@heroui/react";
import { searchAyahs } from "@/lib/api";
import type { SearchResult } from "@/types";
import Link from "next/link";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isPending, startTransition] = useTransition();
  const [searched, setSearched] = useState(false);

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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Search Ayahs</h1>
        <p className="text-sm text-zinc-400">Search by English keyword or phrase</p>
      </div>

      {/* Search input */}
<div className="relative">
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none">
    🔍
  </span>
  <input
    value={query}
    onChange={(e) => handleSearch(e.target.value)}
    placeholder="e.g. mercy, patience, light..."
    className="w-full bg-zinc-800 text-white placeholder:text-zinc-500 border border-zinc-700 hover:border-teal-600 focus:border-teal-500 focus:outline-none rounded-xl px-4 py-3 pl-10 pr-10 text-sm transition-colors"
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
            className="block p-5 border border-zinc-800 rounded-xl bg-zinc-900 hover:border-teal-600 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold bg-teal-900/50 text-teal-400 px-2 py-0.5 rounded-full">
                {r.chapter}:{r.verse}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {r.text}
            </p>
          </Link>
        ))}

        {searched && results.length === 0 && (
          <p className="text-center text-zinc-500 py-12">
            No results found for &quot;{query}&quot;
          </p>
        )}

        {!searched && query.length === 0 && (
          <p className="text-center text-zinc-600 py-12 text-sm">
            Type at least 3 characters to search
          </p>
        )}
      </div>
    </div>
  );
}