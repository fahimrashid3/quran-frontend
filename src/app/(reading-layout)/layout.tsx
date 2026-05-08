import type { Metadata } from "next";
import { Amiri, Scheherazade_New } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { getChapters } from "@/lib/api";
import { ReadingLayoutShell } from "@/components/reading/ReadingLayoutShell";


const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
});

export const metadata: Metadata = {
  title: "Quran Mazid | Reading",
  description: "Focused Quran reading layout",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const chapters = await getChapters();

  return (
    <html lang="en">
      <body className={`${amiri.variable} ${scheherazade.variable} min-h-screen bg-zinc-950 text-zinc-100`}>
        <Providers>
          <ReadingLayoutShell chapters={chapters}>{children}</ReadingLayoutShell>
        </Providers>
      </body>
    </html>
  );
}