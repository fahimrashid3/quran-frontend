import type { Chapter, Surah, SearchResult } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/quran";

export async function getChapters(): Promise<Chapter[]> {
  try {
    const res = await fetch(`${BASE_URL}/chapters`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function getSurah(id: string | number): Promise<Surah | null> {
  try {
    const res = await fetch(`${BASE_URL}/surah/${id}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function searchAyahs(query: string): Promise<SearchResult[]> {
  if (!query.trim()) return [];
  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}