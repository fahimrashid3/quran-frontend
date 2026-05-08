export interface Chapter {
  id: number;
  name: string;
  transliteration: string;
  translation?: string;
  type: "meccan" | "medinan";
  total_verses: number;
}

export interface Verse {
  verse: number;
  arabic: string;
  english: string;
}

export interface Surah {
  chapter: number;
  name: string;
  transliteration: string;
  verses: Verse[];
}

export interface SearchResult {
  chapter: number;
  verse: number;
  text: string;
}

export interface Settings {
  arabicFont: "Amiri" | "Scheherazade New";
  arabicFontSize: number;
  englishFontSize: number;
  theme: "light" | "dark";
}