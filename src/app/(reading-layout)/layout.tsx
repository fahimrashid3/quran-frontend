import type { Metadata } from "next";
import { Amiri, Scheherazade_New, Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { getChapters } from "@/lib/api";
import { ReadingLayoutShell } from "@/components/reading/ReadingLayoutShell";
import { ReadingNavbar } from "@/components/reading/ReadingNavbar";

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
        className={`${inter.variable} ${amiri.variable} ${scheherazade.variable} flex min-h-screen flex-col bg-white font-(--font-inter) text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <Providers>
          <ReadingNavbar />
          <ReadingLayoutShell chapters={chapters}>
            {children}
          </ReadingLayoutShell>
        </Providers>
      </body>
    </html>
  );
}