import type { Metadata } from "next";
import { Amiri, Scheherazade_New, Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { getChapters } from "@/lib/api";
import { ReadingLayoutShell } from "@/components/reading/ReadingLayoutShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quran Mazid | Reading",
  description: "Focused Quran reading layout",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chapters = await getChapters();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} font-[var(--font-inter)] bg-zinc-950 text-white min-h-screen flex flex-col`}
      >
        <Providers>
          <ReadingLayoutShell chapters={chapters}>
            {children}
          </ReadingLayoutShell>
        </Providers>
      </body>
    </html>
  );
}